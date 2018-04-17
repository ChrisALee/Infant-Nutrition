import withRedux from 'next-redux-wrapper';
import React, { Component } from 'react';
import { compose } from 'redux';

import Head from '../components/Head';
import Nav from '../components/Nav';
import RegisterForm from '../components/RegisterForm';
import { initStore, register } from '../store';
import withAuth, { PUBLIC } from '../utils/auth/withAuth';
import withRoot from '../utils/material-ui/withRoot';

export interface RegisterProps {
    user: { isLoggedIn: string; groups: string[] };
}

class Register extends Component<RegisterProps, {}> {
    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleRegisterSubmit = (_e, state) => {
        const { dispatch }: any = this.props;
        const payload = {
            user: {
                username: state.username,
                password: state.password,
                email: state.email,
            },
        };
        dispatch(register(payload)).catch(err => {
            this.setState({ errorMessage: err.response.data.message });
        });
    };

    render() {
        return (
            <div>
                <Head title="Register" />
                <Nav />
                <RegisterForm
                    handleRegisterSubmit={this.handleRegisterSubmit}
                />
            </div>
        );
    }
}

export default compose<any>(
    withRoot(),
    withRedux(initStore),
    withAuth([PUBLIC]),
)(Register);
