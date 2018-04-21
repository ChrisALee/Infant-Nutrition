import withRedux from 'next-redux-wrapper';
import React, { Component } from 'react';
import { compose } from 'redux';

import Layout from '../components/Layout';
import styled from 'styled-components';
import RegisterForm from '../components/RegisterForm';
import { initStore, register } from '../store';
import withAuth, { PUBLIC } from '../utils/auth/withAuth';
import withRoot from '../utils/material-ui/withRoot';

export interface RegisterProps {
    user: { isLoggedIn: string; groups: string[] };
}

const Container = styled.div`
    margin: 0px auto;
    max-width: 1180px;
    min-height: 60vh;
    width: 100%;
    heigth: 100%;
`;

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
            <Layout title="register">
                <Container>
                    <RegisterForm
                        handleRegisterSubmit={this.handleRegisterSubmit}
                    />
                </Container>
            </Layout>
        );
    }
}

export default compose<any>(
    withRoot(),
    withRedux(initStore),
    withAuth([PUBLIC]),
)(Register);
