import React from 'react';

import { type AppAction, AppActionTypes, type AppContextData, type AppContextType, type AppDispatch } from './types.ts';

export const appInitialState: AppContextData = {
    initialLoad: false,
    open: false,
};
export const appReducer = (state: AppContextData, action: AppAction): AppContextType => {
    switch (action.type) {
        case AppActionTypes.SET_INITIAL_LOAD: {
            return { ...state, initialLoad: action.data as boolean };
        }
        case AppActionTypes.SET_SNACKBAR: {
            return { ...state, open: action.data as boolean };
        }

        default: {
            throw new Error(`Unhandled action: ${JSON.stringify(action)}`);
        }
    }
};
export const AppContext = React.createContext<AppContextType>(appInitialState);
export const AppContextDispatch = React.createContext<AppDispatch>(() => {});
