import Button from 'material-ui/Button';
import withRedux from 'next-redux-wrapper';
import Link from 'next/link';
import React, { Component } from 'react';
import { compose } from 'redux';
import styled from 'styled-components';

import Layout from '../components/Layout';
import RegisterForm from '../components/RegisterForm';
import { initStore, register } from '../store';
import withAuth, { PUBLIC } from '../utils/auth/withAuth';
import withRoot from '../utils/material-ui/withRoot';

export interface RegisterProps {
    user: { isLoggedIn: string; groups: string[] };
}

const Container = styled.div`
    margin: 0 auto 30vh auto;
    padding-top: 50px;
    max-width: 1180px;
`;

const StyledButton = styled(Button)`
    && {
        margin-top: 10px;
        width: 100%;
        border: 1px white solid;
    }
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
            <Layout primary={true} title="Register">
                <Container>
                    <RegisterForm
                        handleRegisterSubmit={this.handleRegisterSubmit}
                    />
                    <Link prefetch href="/login">
                        <StyledButton color="secondary">
                            Already have an account?
                        </StyledButton>
                    </Link>
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
