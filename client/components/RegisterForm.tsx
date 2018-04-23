import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
    && {
    }
`;

const Divider = styled.div`
    width: 70%;
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
        padding: 0 46px;
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

export interface LoginFormState {
    username: string;
    password: string;
    email: string;
    errorMessage: string;
}

export interface LoginFormProps {
    handleRegisterSubmit: (_e: any, state: any) => void;
}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
    state = {
        username: '',
        password: '',
        email: '',
        errorMessage: '',
    };

    handleChange = name => e => {
        this.setState({
            [name]: e.target.value,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleRegisterSubmit(e, this.state);
    };

    render() {
        return (
            <StyledPaper>
                <StyledTypography variant="subheading">
                    Create your account.
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
                        <Grid item md>
                            <StyledTextField
                                id="username"
                                label="Username"
                                value={this.state.username}
                                onChange={this.handleChange('username')}
                            />
                        </Grid>
                        <Grid item md>
                            <StyledTextField
                                id="password"
                                label="Password"
                                value={this.state.password}
                                type="password"
                                onChange={this.handleChange('password')}
                            />
                        </Grid>
                        <Grid item md>
                            <StyledTextField
                                id="email"
                                label="Email"
                                value={this.state.email}
                                type="email"
                                onChange={this.handleChange('email')}
                            />
                        </Grid>
                        <StyledGridButton item md>
                            <Button
                                type="submit"
                                color="primary"
                                variant="raised"
                            >
                                Create your account
                            </Button>
                        </StyledGridButton>
                    </ContainerGrid>
                </StyledForm>
            </StyledPaper>
        );
    }
}

export default LoginForm;
