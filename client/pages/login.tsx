import withRedux from 'next-redux-wrapper';
import React, { Component } from 'react';
import { compose } from 'redux';
import styled from 'styled-components';

import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';
import { initStore, login } from '../store';
import withAuth, { PUBLIC } from '../utils/auth/withAuth';
import withRoot from '../utils/material-ui/withRoot';

export interface LoginProps {
    user: { isLoggedIn: string; groups: string[] };
}

const Container = styled.div`
    margin: 0px auto;
    max-width: 1180px;
`;

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
            <Layout title="login">
                <Container>
                    <LoginForm handleLoginSubmit={this.handleLoginSubmit} />
                </Container>
            </Layout>
        );
    }
}

export default compose<any>(
    withRoot(),
    withRedux(initStore),
    withAuth([PUBLIC]),
)(Login);
