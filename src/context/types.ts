
export interface AppContextData {
    initialLoad: boolean;
    open: boolean;
}

export interface AppContextType extends AppContextData {
}

export enum AppActionTypes {
    SET_INITIAL_LOAD = 'setInitialLoad',
    SET_SNACKBAR = 'setSnackbar',

}

export interface AppAction {
    type: AppActionTypes;
    data?: boolean | null;
    allData?: AppContextData;
}

export type AppDispatch = (action: AppAction) => void;
