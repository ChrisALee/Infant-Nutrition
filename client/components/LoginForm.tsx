import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
    && {
    }
`;

const Divider = styled.div`
    width: 50%;
    height: 1px;
    background-color: rgb(218, 225, 233);
    align-self: center;
`;

const ContainerGrid = styled(Grid)`
    && {
    }
`;

const StyledPaper = styled(Paper)`
    && {
        display: flex;
        flex-direction: column;
        margin-top: 50px;
        padding: 0 40px;
    }
`;

const StyledTypography = styled(Typography)`
    && {
        padding-top: 20px;
        padding-bottom: 10px;
        align-self: center;
    }
`;

const StyledTextField = styled(TextField)`
    && {
        align-self: center;
    }
`;

const StyledGridButton = styled(Grid)`
    && {
        margin-top: 20px;
        margin-bottom: 20px;
    }
`;

const StyledA = styled.a`
    text-decoration: none;
`;

export interface LoginFormState {
    username: string;
    password: string;
    errorMessage: string;
}

export interface LoginFormProps {
    handleLoginSubmit: (_e: any, state: any) => void;
}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
    state = {
        username: '',
        password: '',
        errorMessage: '',
    };

    handleChange = name => e => {
        this.setState({
            [name]: e.target.value,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleLoginSubmit(e, this.state);
    };

    render() {
        return (
            <StyledPaper>
                <StyledTypography variant="subheading">
                    Welcome back!
                </StyledTypography>

                <Divider />

                <StyledForm
                    noValidate
                    autoComplete="on"
                    onSubmit={this.handleSubmit}
                >
                    <ContainerGrid
                        container
                        direction="column"
                        spacing={24}
                        justify="center"
                        alignItems="center"
                    >
                        <Grid md item>
                            <StyledTextField
                                id="username"
                                label="Username"
                                value={this.state.username}
                                onChange={this.handleChange('username')}
                            />
                        </Grid>
                        <Grid md item>
                            <StyledTextField
                                id="password"
                                label="Password"
                                value={this.state.password}
                                type="password"
                                autoComplete="current-password"
                                onChange={this.handleChange('password')}
                            />
                        </Grid>
                        <Grid md item>
                            <Link prefetch href="#">
                                <StyledA>
                                    <Typography
                                        variant="caption"
                                        color="primary"
                                    >
                                        Forgot your password?
                                    </Typography>
                                </StyledA>
                            </Link>
                        </Grid>
                        <StyledGridButton item md>
                            <Button
                                type="submit"
                                color="primary"
                                variant="raised"
                            >
                                Login to your account
                            </Button>
                        </StyledGridButton>
                    </ContainerGrid>
                </StyledForm>
            </StyledPaper>
        );
    }
}

export default LoginForm;
