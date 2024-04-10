import * as React from 'react';
import Container from '@mui/material/Container';
import {TextField} from '@mui/material';
import {useContext, useEffect, useRef, useState} from 'react';
import {useApi} from '../hooks/useApi.tsx';
import {IOneCall} from './types.ts';
import {Form} from 'react-router-dom';
import {getAPIType} from '../utils.ts';
import {ObjectLiteral, TGeoLocation} from '../hooks';
import {BasicInfo} from '../components/BasicInfo.tsx';
import Box from '@mui/material/Box';
import {DailyForecast} from '../components/DailyForecast.tsx';
import Button from '@mui/material/Button';
import {AppActionTypes, AppContextDispatch} from '../context';

export const SearchPage: React.FC = () => {
    const dispatch = useContext(AppContextDispatch);
    const [value, setValue] = useState<string>('');
    const [searching, setSearching] = useState<boolean>(true);
    const loc = useRef<TGeoLocation | null>(null);
    const {
        callApi: callGeoApi,
        error: geoError
    } = useApi<ObjectLiteral>(
        {
            url: `${getAPIType('geoLocation')}?q=${value}`,
            lazy: true,
        });

    const {response: data, loading, callApi: callOneCall, error: callError} = useApi<IOneCall>(
        {
            url: `${getAPIType('onecall')}?lat=&lon=`,
            lazy: true
        });
    useEffect(() => {
        if(!geoError && !callError) return;
        dispatch({type: AppActionTypes.SET_SNACKBAR, data: true});
    }, [callError, geoError]);

    return <>
        <Container>
            <Form style={{margin: '10px 0'}}>
                <TextField id="outlined-basic" label="Location" size={'small'} variant="outlined" value={value}
                           onChange={(e) => {
                               setValue(e.target.value);
                           }}/>
                <Button variant='outlined' size='large' disabled={!value} onClick={async () => {
                    const res = await callGeoApi();
                    loc.current = {longitude: res?.[0].lon, latitude: res?.[0].lat};
                    await callOneCall({}, `${getAPIType('onecall')}?lat=${res?.[0].lon}&lon=${res?.[0].lat}`);
                    setSearching(false);
                }}>Search</Button>
            </Form>
            {!searching && <>
                <Box style={{marginTop: '40px'}}>
                    <BasicInfo loading={loading} data={data?.current || null} geoLocation={loc.current}/>
                    <Box style={{marginTop: '40px'}}>
                        <DailyForecast loading={loading} data={data}></DailyForecast>
                    </Box>
                </Box></>
            }
        </Container>
    </>;
};
