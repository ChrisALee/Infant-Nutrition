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
        const response = await fetch('http://localhost:3001/api/session', {
            method: 'POST',
            body: payload,
        });
        if (response.status === 200) {
            dispatch({
                type: actionTypes.SET_USER,
                user: response.data,
            });
            Router.push('/');
        }
        return response;
    };
};

export const logout = () => {
    return async dispatch => {
        const response = await fetch('http://localhost:3001/api/session', {
            method: 'DELETE',
        });
        if (response.status === 200) {
            dispatch({
                type: actionTypes.SET_USER,
                user: null,
            });
        }
        return response;
    };
};

// This is used server side on the first page render.
// Sends the cookie to server to verify active session.
// If session is active it saves the user to redux store
export const whoAmI = cookie => {
    return async dispatch => {
        const response = await fetch('http://localhost:3001/api/session', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Cookie: cookie,
            },
            withCredentials: true,
        });
        if (response.status === 200) {
            dispatch({
                type: actionTypes.SET_USER,
                user: response.data,
            });
        }
        return response.data;
    };
};

export const initStore = (initialState = exampleInitialState) => {
    return createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware)),
    );
};
