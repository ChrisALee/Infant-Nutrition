import fetch from 'isomorphic-unfetch';
import * as jwtDecode from 'jwt-decode';
import getConfig from 'next/config';
import Router from 'next/router';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import {
    actionStorageMiddleware,
    createStorageListener,
} from 'redux-state-sync';

const { publicRuntimeConfig } = getConfig();

const exampleInitialState = {
    user: { isLoggedIn: false },
};

export const actionTypes = {
    SET_USER: 'SET_USER',
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER: {
            return { ...state, user: action.user };
        }

        default:
            return state;
    }
};

// ACTIONS
export const login = payload => {
    return async dispatch => {
        try {
            const response = await fetch(
                `${publicRuntimeConfig.API_HOST}/session`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(payload),
                },
            );

            if (response.status === 200) {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: { isLoggedIn: true },
                });
                Router.push('/');
            }
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.log('err from store.ts login: ', err);
        }
    };
};

export const logout = () => {
    return async dispatch => {
        try {
            const response = await fetch(
                `${publicRuntimeConfig.API_HOST}/session`,
                {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                    },
                    credentials: 'include',
                },
            );

            if (response.status === 200) {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: { isLoggedIn: false },
                });
            }
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.log(err);
        }
    };
};

// This is used server side on the first page render.
// Decoded the JWT in the cookies to see if user is logged in
// If session is active it saves the user log in status to redux store
export const whoAmI = cookie => {
    return async dispatch => {
        if (!cookie) {
            dispatch({
                type: actionTypes.SET_USER,
                user: { isLoggedIn: false },
            });

            return { isLoggedIn: false };
        }

        try {
            const decoded = jwtDecode(cookie);

            if (decoded) {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: { isLoggedIn: true },
                });
            }

            return { isLoggedIn: true };
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.log('whoAmI: ', err);
        }
    };
};

export const register = payload => {
    return async dispatch => {
        try {
            const response = await fetch(
                `${publicRuntimeConfig.API_HOST}/users`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(payload),
                },
            );

            if (response.status === 200) {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: { isLoggedIn: true },
                });
                Router.push('/');
            }
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.log('err from store.ts register: ', err);
        }
    };
};

export const initStore = (initialState = exampleInitialState) => {
    if (typeof window === 'undefined') {
        // Server render so we cannot use Window to sync tabs
        // Shouldn't matter since the client does a request to cookies on server render
        return createStore(
            reducer,
            initialState,
            composeWithDevTools(applyMiddleware(thunkMiddleware)),
        );
    } else {
        // Client render so we can sync the store between tabs using Window
        const store = createStore(
            reducer,
            initialState,
            composeWithDevTools(
                applyMiddleware(thunkMiddleware, actionStorageMiddleware),
            ),
        );
        createStorageListener(store);
        return store;
    }
};
