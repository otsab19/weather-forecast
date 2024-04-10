import {createHashRouter} from 'react-router-dom';

import App from '../App.tsx';
import {Home} from '../pages/Home.tsx';
import {SearchPage} from '../pages/SearchPage.tsx';
// @ts-ignore
import React from 'react';


export const ROUTE_PATH = {
    HOME: '/',
    SEARCH: '/search',

};

const {HOME, SEARCH} = ROUTE_PATH;
export const ROUTE_TITLES: Record<string, string> = {
    [SEARCH]: 'SEARCH',
    [HOME]: 'HOME',
};

const routes = [
    {
        element: <App/>,
        children: [
            {
                path: HOME,
                element: <Home/>,
            },
            {
                path: SEARCH,
                element: <SearchPage/>,
            },
        ],
    },
];
export const RoutesConfig = createHashRouter(routes);
