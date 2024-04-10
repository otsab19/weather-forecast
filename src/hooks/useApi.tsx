import axiosConfig from '../axios.config.ts';
import {useEffect, useRef, useState} from 'react';
import {type AxiosRequestConfig, type AxiosResponse, isAxiosError} from 'axios';
import {ObjectLiteral} from './types.ts';
import {getEnv} from '../getEnv.ts';

export interface useApiReturn<T> {
    error: ObjectLiteral | null;
    response: T | null;
    loading: boolean;
    callApi: (config?: AxiosRequestConfig, replaceUrl?: string) => Promise<T | null>;
}

export const useApi = <T, >({
                                url,
                                config,
                                lazy = false,
                                skip = false,
                            }: {
    url: string;
    config?: AxiosRequestConfig;
    lazy?: boolean;
    skip?: boolean;
}): useApiReturn<T> => {
    const [error, setError] = useState<ObjectLiteral | null>(null);
    const [loading, setLoading] = useState<boolean>(!(lazy || config?.method === 'POST'));
    const [response, setResponse] = useState<T | null>(null);

    // to track changes
    const prevState = useRef<{ skip: boolean }>({
        skip,
    });
    const callApi = async (fetchConfig = config, replaceUrl = url): Promise<T | null> => {
        let res: AxiosResponse<T>;
        try {
            setLoading(true);
            const method = config?.method ?? 'GET';
            const headers = {};
            const urlWithKey = `${replaceUrl}&appid=${getEnv('VITE_WEATHER_API_KEY')}`;
            switch (method) {
                case 'GET': {
                    res = await axiosConfig.get(urlWithKey, {...fetchConfig, headers});
                    break;
                }
                case 'POST': {
                    res = await axiosConfig.post(urlWithKey, fetchConfig?.params, {params: fetchConfig?.data, headers});
                    break;
                }
                default: {
                    res = await axiosConfig.get(urlWithKey, {...fetchConfig, headers});
                }
            }
            setResponse(res.data);
            setLoading(false);
        } catch (ex: unknown) {
            if (isAxiosError(ex)) {
                const error = (ex as ObjectLiteral)?.response?.data?.err;
                const isString = typeof error === 'string';
                const err = isString ? {message: error} : error;
                setError((err || 'Error while calling the API.') as ObjectLiteral);
            } else {
                // not sure of type.
                setError({message: ex || 'Error while calling the API.'});
            }
            setLoading(false);
            throw ex;
        }
        return res.data;
    };
    useEffect(() => {
        if (skip || lazy || config?.method === 'POST') return;
        callApi();
    }, []);

    useEffect(() => {
        if (skip || config?.method === 'POST') return;
        if (!skip && prevState.current.skip !== skip) {
            // set new ref state
            prevState.current.skip = false;
            callApi();
        }
    }, [skip]);

    return {error, callApi, response, loading};
};
