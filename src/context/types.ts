import {TGeoLocation} from "../hooks/types.ts";

export interface AppContextData {
  initialLoad: boolean;
  geoLocation: TGeoLocation;
}

export interface AppContextType extends AppContextData {}

export enum AppActionTypes {
  SET_INITIAL_LOAD = 'setInitialLoad',
  SET_GEO_LOCATION = 'setLoggedIn',

}

export interface AppAction {
  type: AppActionTypes;
  data?: TGeoLocation | boolean | null;
  allData?: AppContextData;
}

export type AppDispatch = (action: AppAction) => void;
