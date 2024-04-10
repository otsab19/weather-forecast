import * as React from 'react';
import Container from '@mui/material/Container';
import {useApi} from '../hooks/useApi.tsx';
import {useGeoLocation} from '../hooks';
import {ILocationResponse} from './types.ts';
import {useEffect, useMemo} from 'react';
import {Grid, Skeleton} from '@mui/material';
import Box from '@mui/material/Box';
import {getAPIType, kelvinToCelsius, timeformat} from '../utils.ts';
import {LocationOnOutlined, WbSunny, WbTwilight} from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import {useStyles} from './styles.tsx';

export const Home: React.FC = () => {
    const classes = useStyles();
    const geoLocation = useGeoLocation();
    const {response: data, error, loading} = useApi<ILocationResponse>(
        {
            url: `${getAPIType()}weather?lat=${geoLocation.latitude}&lon=${geoLocation.longitude}`,
            skip: !geoLocation.longitude
        });
    const {response: hourlyData, error: hourlyError, loading:hourlyLoading} = useApi<ILocationResponse>(
        {
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=-41.211128&lon=174.908081&exclude=daily,minutely,current,alerts&units=metric&appid=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`,
            skip: !geoLocation.longitude
        });
    useEffect(() => {

    }, [error]);

    const sunTimes = useMemo(() => {
        if (loading || !data) return;
        const rise = new Date(data.sys.sunrise * 1000);
        const set = new Date(data.sys.sunset * 1000);
        return {rise: timeformat(rise), set: timeformat(set)};
    }, [data]);
    return <>
        <Container className={classes.weatherContainer}>
            {loading && <>
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
            {!loading && <Grid container spacing={2}>
                <Grid xs={4}>
                    <Box display='flex' alignItems='center'>
                        <img src={`http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`}/>
                        <div>
                            {data?.main.temp ? kelvinToCelsius(data?.main.temp) : 'N/A'} &deg;
                        </div>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'}>
                        <Typography>
                            Humidity: {data?.main.humidity}%
                        </Typography>
                        <Typography>
                            Wind: {data?.wind?.speed} mph
                        </Typography>
                    </Box>

                </Grid>
                <Grid xs={4}>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <WbSunny></WbSunny>
                        Sunrise: {sunTimes?.rise}
                    </Box>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <WbTwilight></WbTwilight>
                        Sunset: {sunTimes?.set}
                    </Box>
                </Grid>
                <Grid xs={4} display='flex' flexDirection='column' alignItems='flex-end'>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <LocationOnOutlined></LocationOnOutlined>
                        {data?.name}
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
