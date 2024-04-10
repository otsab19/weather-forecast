import * as React from 'react';
import {IOneCall} from '../pages/types.ts';
import {kelvinToCelsius, timeformat} from '../utils.ts';
import {Grid, Skeleton} from '@mui/material';
import Box from '@mui/material/Box';
import {useState} from 'react';
import {DailyForecastStyles} from './DailyForecastStyles.tsx';
import Typography from '@mui/material/Typography';
import {ArrowLeft, ArrowRight} from '@mui/icons-material';
import Button from '@mui/material/Button';

type DailyForecastProps = {
    loading: boolean;
    data: IOneCall | null
}
export const DailyForecast: React.FC<DailyForecastProps> = ({loading, data: hourlyData}) => {

    const [currentIdx, setIndexes] =
        useState<{ l: number, r: number }>({l: 0, r: 8});
    const classes = DailyForecastStyles();


    const setPage = (type = 'l'): void => {
        const total = hourlyData?.hourly?.length || 0;
        if (type === 'r') {
            setIndexes({
                l: currentIdx.l >= 0 ? currentIdx.l + 1 : currentIdx.l,
                r: currentIdx.r === total ? currentIdx.r : currentIdx.r + 1
            });
        } else {
            setIndexes({
                l: currentIdx.l >= 0 ? currentIdx.l - 1 : currentIdx.l,
                r: currentIdx.r - 1
            });
        }

    };
    return <>
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
        {!loading &&
            <>
                <Typography variant='h6' textAlign='center'><b>Hourly Forecast</b></Typography>
                <Grid display='flex'>
                    <Box className={classes.navigation} display='flex' justifyContent='center'
                         alignItems='center'>
                        <Button onClick={() => setPage('l')}
                                disabled={currentIdx.l === 0}
                                style={{pointerEvents: (currentIdx.r === 0) ? 'none' : 'all'}}>
                            <ArrowLeft fontSize='large'></ArrowLeft>
                        </Button>
                    </Box>
                    {hourlyData?.hourly?.slice(currentIdx.l, currentIdx.r).map((data, idx) => {
                        return <Grid xs={2} display='flex' flexDirection='column' spacing={2} key={idx}
                                     className={classes.weatherBox}>
                            <Box display='flex' flexDirection='column'>
                                {timeformat(new Date(data.dt * 1000))}
                            </Box>
                            <Box>
                                <img src={`http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`}/>
                                <div>
                                    {data?.temp ? kelvinToCelsius(data?.temp) : 'N/A'} &deg;
                                </div>
                                <div>
                                    {data.weather?.[0].main}
                                </div>
                            </Box>
                        </Grid>;
                    })}
                    <Box className={classes.navigation} display='flex' justifyContent='center'
                         alignItems='center'>
                        <Button onClick={() => setPage('r')}
                                disabled={currentIdx.r >= (hourlyData?.hourly?.length || 0)}
                                style={{pointerEvents: (currentIdx.r >= (hourlyData?.hourly?.length || 0) ? 'none' : 'all')}}>
                            <ArrowRight fontSize='large'></ArrowRight>
                        </Button>
                    </Box>

                </Grid>
            </>}
    </>;
};