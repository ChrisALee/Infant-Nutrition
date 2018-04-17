import withRedux from 'next-redux-wrapper';
import React, { Component } from 'react';
import { compose } from 'redux';

import Head from '../components/Head';
import LoginForm from '../components/LoginForm';
import Nav from '../components/Nav';
import { initStore, login } from '../store';
import withAuth, { PUBLIC } from '../utils/auth/withAuth';
import withRoot from '../utils/material-ui/withRoot';

export interface LoginProps {
    user: { isLoggedIn: string; groups: string[] };
}

class Login extends Component<LoginProps, {}> {
    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleLoginSubmit = (_e, state) => {
        const { dispatch }: any = this.props;
        const payload = {
            user: {
                username: state.username,
                password: state.password,
            },
        };
        dispatch(login(payload)).catch(err => {
            this.setState({ errorMessage: err.response.data.message });
        });
    };

    render() {
        return (
            <div>
                <Head title="Login" />
                <Nav />
                <LoginForm handleLoginSubmit={this.handleLoginSubmit} />
            </div>
        );
    }
}

export default compose<any>(
    withRoot(),
    withRedux(initStore),
    withAuth([PUBLIC]),
)(Login);
