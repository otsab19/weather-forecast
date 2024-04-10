import {createStyles} from '@mui/material';
import {makeStyles} from '@mui/styles';

export const DailyForecastStyles = makeStyles(() =>
    createStyles({
        weatherBox: {
            minWidth: '90px',
            margin: '10px',
            border: '2px solid #aa2323',
            borderRadius: '5px',
            padding: '10px'
        },
        navigation:{
            padding: '10px',
            '&>button': {
                height: '100%'
            }
        }
    }),
);
