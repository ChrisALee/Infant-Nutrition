import Router from 'next/router';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import fetch from 'isomorphic-unfetch';

const exampleInitialState = {
    user: null,
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
        let response;
        let token;
        try {
            response = await fetch('http://localhost:3000/api/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(payload),
            });

            token = await response.text();
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.log('err from store.ts login: ', err);
        }

        if (response.status === 200) {
            dispatch({
                type: actionTypes.SET_USER,
                user: token,
            });
            Router.push('/');
        }
        return token;
    };
};

export const logout = () => {
    return async dispatch => {
        try {
            const response = await fetch('http://localhost:3000/api/logout', {
                method: 'GET',
                'Content-Type': 'application/json',
                Accept: 'application/json',
                credentials: 'include',
            });
            if (response.status === 200) {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: null,
                });
            }
            return response;
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.log(err);
        }
    };
};

// This is used server side on the first page render.
// Sends the cookie to server to verify active session.
// If session is active it saves the user to redux store
export const whoAmI = cookie => {
    return async dispatch => {
        try {
            const response = await fetch('http://localhost:3000/api/whoami', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Cookie: cookie,
                },
            });
            const json = await response.json();

            if (response.status === 200) {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: json.guid,
                });
            }
            return json.guid;
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.log('');
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
