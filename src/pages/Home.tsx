import * as React from 'react';
import {useApi} from '../hooks/useApi.tsx';
import {useGeoLocation} from '../hooks';
import {IOneCall} from './types.ts';
import {useContext, useEffect} from 'react';
import {getAPIType} from '../utils.ts';
import {BasicInfo} from '../components/BasicInfo.tsx';
import Box from '@mui/material/Box';
import {DailyForecast} from '../components/DailyForecast.tsx';
import {AppActionTypes, AppContextDispatch} from '../context';

export const Home: React.FC = () => {
    const geoLocation = useGeoLocation();
    const dispatch = useContext(AppContextDispatch);
    const {response: data, error: hourlyError, loading} = useApi<IOneCall>(
        {
            url: `${getAPIType('onecall')}?lat=${geoLocation.latitude}&lon=${geoLocation.longitude}`,
            skip: !geoLocation.longitude
        });
    useEffect(() => {
        if(!hourlyError) return;
        dispatch({type: AppActionTypes.SET_SNACKBAR, data: true});
    }, [hourlyError]);

    return <>
        <BasicInfo loading={loading} data={data?.current || null} geoLocation={geoLocation}/>
        <Box style={{marginTop: '40px'}}>
            <DailyForecast loading={loading} data={data}></DailyForecast>
        </Box>
    </>;
};
