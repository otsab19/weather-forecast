import {AppContext, appInitialState, appReducer, AppContextDispatch, AppActionTypes} from './context';
import React, {useReducer} from 'react';
import {NavHeader} from './components/NavHeader.tsx';
import Container from '@mui/material/Container';
import {Outlet} from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {createTheme, Snackbar} from '@mui/material';
import {ThemeProvider} from "@mui/styles";

const App: () => JSX.Element = () => {
    const theme = createTheme();
    const [state, dispatch] = useReducer(appReducer, appInitialState);
    const handleClose = (_: React.SyntheticEvent | Event, reason?: string): void => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({type: AppActionTypes.SET_SNACKBAR, data: false});
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <AppContext.Provider value={state}>
                    <AppContextDispatch.Provider value={dispatch}>
                        <NavHeader></NavHeader>
                        <Container style={{marginTop: '20px'}}>
                            <Outlet></Outlet>
                            <Snackbar open={state.open} autoHideDuration={6000} onClose={handleClose}
                                      message="Error in API"
                                      action={action}/>

                        </Container>
                    </AppContextDispatch.Provider>
                </AppContext.Provider>
            </Container>
        </ThemeProvider>
    );
};

export default App;
