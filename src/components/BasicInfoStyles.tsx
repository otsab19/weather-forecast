import {createStyles} from '@mui/material';
import {makeStyles} from '@mui/styles';

export const BasicInfoStyles = makeStyles(() =>
    createStyles({
        weatherContainer: {
            backgroundColor: '#b9eff0',
            padding: '40px',
            borderRadius: '5px'
        },
        innerBox:{
            padding: '15px',
            '&>div':{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
            }
        }
    }),
);