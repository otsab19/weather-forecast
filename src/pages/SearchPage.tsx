import * as React from 'react';
import Container from '@mui/material/Container';
import {TextField} from '@mui/material';
import {useState} from 'react';
import {useApi} from '../hooks/useApi.tsx';
import {ILocationResponse} from './types.ts';
import {Form} from 'react-router-dom';
import {getAPIType} from '../utils.ts';
import {ObjectLiteral, TGeoLocation} from '../hooks';

export const SearchPage: React.FC = () => {
    const [value, setValue] = useState<string>('');
    const [loc, setLoc] = useState<TGeoLocation>({
        longitude: null, latitude: null
    });
    const {response:geoLocationResponse, error: geoError, loading: geoLoading, callApi: callGeoApi} = useApi<ObjectLiteral>(
        {
            url: `${getAPIType('geoLocation')}?q=${value}`,
            lazy: true
        });
    const {response: data, error, loading, callApi} = useApi<ILocationResponse>(
        {
            url: `${getAPIType()}forecast/hourly?lat=${loc.latitude}&lon=${loc.longitude}`,
            lazy: true
        });
    return <>
        <Container>
            <Form onSubmit={async () => {
                const res = await callGeoApi();
                console.log(res);
                setLoc({longitude: res?.[0].lon, latitude: res?.[0].lat});
                await callApi({url: `${getAPIType()}forecast/hourly?lat=${loc.latitude}&lon=${loc.longitude}`,});
            }}>
                <TextField id="outlined-basic" label="Location" variant="outlined" value={value} onChange={(e) => {
                    setValue(e.target.value);
                }}/>
            </Form>
        </Container>
    </>;
};
