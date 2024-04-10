import {Grid, Skeleton} from '@mui/material';
import Box from '@mui/material/Box';
import {getAPIType, kelvinToCelsius, timeformat} from '../utils.ts';
import Typography from '@mui/material/Typography';
import {LocationOnOutlined, WbSunny, WbTwilight} from '@mui/icons-material';
import Container from '@mui/material/Container';
import * as React from 'react';
import {useContext, useEffect, useMemo} from 'react';
import {Current} from '../pages/types.ts';
import {BasicInfoStyles} from './BasicInfoStyles.tsx';
import {useApi} from '../hooks/useApi.tsx';
import {ObjectLiteral, TGeoLocation} from '../hooks';
import {AppActionTypes, AppContextDispatch} from '../context';


type BasicInfoProps = {
    loading: boolean;
    data: Current | null;
    geoLocation: TGeoLocation | null
}
export const BasicInfo: React.FC<BasicInfoProps> = ({loading, data, geoLocation}) => {
    const classes = BasicInfoStyles();
    const sunTimes = useMemo(() => {
        if (loading || !data) return;
        if(!data.sunrise || !data.sunset) return {set: 'N/A', rise: 'N/A'};
        const rise = new Date(data.sunrise * 1000);
        const set = new Date(data.sunset * 1000);
        return {rise: timeformat(rise), set: timeformat(set)};
    }, [data]);
    const {response: locName, loading: dataLoading, callApi, error} = useApi<ObjectLiteral>(
        {
            url: `${getAPIType('reverseGeoLocation')}?lat=${geoLocation?.latitude}&lon=${geoLocation?.longitude}`,
            lazy: true
        });
    const dispatch = useContext(AppContextDispatch);

    useEffect(() => {
        if(loading) return;
        callApi();
    }, [data, loading]);

    useEffect(() => {
        if(!error) return;
        dispatch({type: AppActionTypes.SET_SNACKBAR, data: true});
    }, [error]);
    return <>
        <Container className={classes.weatherContainer}>
            {loading || dataLoading && <>
                <Skeleton variant="rounded" height={30} style={{margin: '10px 0'}}/>
                <Skeleton variant="rounded" height={30} style={{margin: '10px 0'}}/>
                <Skeleton variant="rounded" height={30} style={{margin: '10px 0'}}/>
                <Grid container>
                    <Grid xs={4} width={1}>
                        <Skeleton variant="rounded" height={30} style={{margin: '10px 10px'}}/>
                    </Grid>
                    <Grid xs={4} width={1}>
                        <Skeleton variant="rounded" height={30} style={{margin: '10px 10px'}}/>
                    </Grid>
                    <Grid xs={4} width={1}>
                        <Skeleton variant="rounded" height={30} style={{margin: '10px 10px'}}/>
                    </Grid>
                </Grid>
            </>}
            {!loading && <Grid container spacing={2} className={classes.innerBox}>
                <Grid xs={4}>
                    <Box display='flex' flexDirection='column' alignItems='flex-start'>
                        <img src={`http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`}/>
                        <div>
                            <b>{data?.temp ? kelvinToCelsius(data?.temp) : 'N/A'} &deg;</b>
                        </div>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'}>
                        <Typography>
                            Humidity: <b>{data?.humidity}%</b>
                        </Typography>
                        <Typography>
                            Wind: <b>{data?.wind_speed} mph</b>
                        </Typography>
                    </Box>

                </Grid>
                <Grid xs={4}>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <WbSunny></WbSunny>
                        Sunrise: &nbsp;<b>{sunTimes?.rise}</b>
                    </Box>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <WbTwilight></WbTwilight>
                        Sunset:&nbsp; <b>{sunTimes?.set}</b>
                    </Box>
                </Grid>
                <Grid xs={4} display='flex' flexDirection='column' alignItems='flex-end'>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <LocationOnOutlined></LocationOnOutlined>
                        <Typography>
                            <b>{locName?.[0].name}</b>
                        </Typography>
                    </Box>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'flex-end'} flexDirection='column'>
                        <Typography>
                            {data?.weather?.[0].main}
                        </Typography>
                        <small>
                            {data?.weather?.[0].description}
                        </small>
                    </Box>
                </Grid>
            </Grid>
            }

        </Container>
    </>;
};