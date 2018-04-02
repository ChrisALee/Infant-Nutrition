import withRedux from 'next-redux-wrapper';
import React, { Component } from 'react';
import { compose } from 'redux';
import RegisterForm from '../components/RegisterForm';

import Head from '../components/Head';
import Nav from '../components/Nav';
import { initStore, register } from '../store';
import withRoot from '../utils/material-ui/withRoot';

export interface Props {
    user: { isLoggedIn: string };
}

class Register extends Component<Props, {}> {
    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleRegisterSubmit = (e, state) => {
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
        const { user } = this.props;
        return (
            <div>
                <Head title="Register" />
                <Nav user={user} />
                <RegisterForm
                    handleRegisterSubmit={this.handleRegisterSubmit}
                />
            </div>
        );
    }
}

export default compose<any>(withRoot(), withRedux(initStore))(Register);
