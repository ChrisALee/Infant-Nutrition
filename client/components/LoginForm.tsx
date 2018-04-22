import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import React from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';

const StyledForm = styled.form`
    && {
    }
`;

const ContainerGrid = styled(Grid)`
    && {
        padding: 10px 15px;
    }
`;

const StyledPaper = styled(Paper)`
    && {
    }
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
                <StyledForm
                    noValidate
                    autoComplete="on"
                    onSubmit={this.handleSubmit}
                >
                    <ContainerGrid
                        container
                        spacing={24}
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={12}>
                            <TextField
                                id="username"
                                label="Username"
                                value={this.state.username}
                                onChange={this.handleChange('username')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="password"
                                label="Password"
                                value={this.state.password}
                                type="password"
                                autoComplete="current-password"
                                onChange={this.handleChange('password')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid>
                            <Button
                                type="submit"
                                color="primary"
                                variant="raised"
                            >
                                Click
                            </Button>
                        </Grid>
                    </ContainerGrid>
                </StyledForm>
            </StyledPaper>
        );
    }
}

export default LoginForm;
