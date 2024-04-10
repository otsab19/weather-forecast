import {AppContext, appInitialState, appReducer, AppContextDispatch} from './context';
import {useReducer} from 'react';
import {NavHeader} from './components/NavHeader.tsx';
import Container from '@mui/material/Container';
import {Outlet} from 'react-router-dom';

const App: () => JSX.Element = () => {


    const [state, dispatch] = useReducer(appReducer, appInitialState);

    return (
        <Container>
            <AppContext.Provider value={state}>
                <AppContextDispatch.Provider value={dispatch}>
                    <NavHeader></NavHeader>
                    <Container style={{marginTop: '20px'}}>
                        <Outlet></Outlet>
                    </Container>
                </AppContextDispatch.Provider>
            </AppContext.Provider>
        </Container>
    );
};

export default App;
