import Router from 'next/router';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import fetch from 'isomorphic-unfetch';
import * as jwtDecode from 'jwt-decode';
import getConfig from 'next/config';

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
                    Accept: 'application/json',
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
            const response = await fetch('http://localhost:3001/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(payload),
            });

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
    return createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware)),
    );
};
