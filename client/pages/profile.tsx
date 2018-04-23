import Save from '@material-ui/icons/Save';
import fetch from 'isomorphic-unfetch';
import Button from 'material-ui/Button';
import Card from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import Slide from 'material-ui/transitions/Slide';
import Typography from 'material-ui/Typography';
import withRedux from 'next-redux-wrapper';
import getConfig from 'next/config';
import * as React from 'react';
import { compose } from 'redux';
import styled from 'styled-components';

import Layout from '../components/Layout';
import { initStore } from '../store';
import withAuth from '../utils/auth/withAuth';
import withRoot from '../utils/material-ui/withRoot';

const { publicRuntimeConfig } = getConfig();

const Container = styled(Card)`
    && {
        flex: 1 0 100%;
        max-width: 800px;
        width: 100%;
        margin: 5vh auto;
        padding: 30px;
    }
`;

const Divider = styled.div`
    width: 100%;
    margin: 20px 0;
    height: 1px;
    background-color: rgb(218, 225, 233);
`;

const StyledButton = styled(Button)`
    && {
        align-self: right;
        margin-right: 12px;
    }
`;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 60%;
`;

const ProfileLabels = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledTypography = styled(Typography)`
    && {
        margin-top: 3px;
        margin-bottom: 26px;
    }
`;

const StyledFormControlLabel = styled(FormControlLabel)`
    && {
        margin-bottom: 18px;
    }
`;

export interface ProfileState {
    profileSettings: object;
}

export interface ProfileProps {
    profileSettings: any;
}

class Profile extends React.Component<ProfileProps, ProfileState> {
    static async getInitialProps({ req }): Promise<object> {
        try {
            const response = await fetch(
                `${publicRuntimeConfig.API_HOST}/users/current/profile`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Cookie: req ? req.headers.cookie : undefined,
                    },
                    credentials: 'include',
                },
            );

            const body: object[] = await response.json();
            const profileSettings = body[0];

            return { profileSettings };
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.log(err);
        }
    }

    state = {
        open: false,
        ...this.props.profileSettings,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleNameChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSave = async () => {
        const payload = {
            profile: {
                name: this.state.name,
                should_email: this.state.should_email,
            },
        };

        try {
            const response = await fetch(
                `${publicRuntimeConfig.API_HOST}/users/current/profile`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(payload),
                },
            );

            if (response.status === 200) {
                this.setState({ ...this.state, open: true });
            }
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.log('Failed to save profile settings: ', err);
        }
    };

    handleClose = () => {
        this.setState({ ...this.state, open: false });
    };

    render() {
        return (
            <Layout title="Profile">
                <Container>
                    <Typography variant="display1" component="h2">
                        User Profile
                    </Typography>
                    <Divider />
                    <ProfileContainer>
                        <ProfileLabels>
                            <StyledTypography gutterBottom variant="title">
                                Name:
                            </StyledTypography>
                            <Typography variant="title">Email:</Typography>
                        </ProfileLabels>
                        <FormGroup>
                            <StyledFormControlLabel
                                control={
                                    <TextField
                                        onChange={this.handleNameChange('name')}
                                        value={this.state.name}
                                        color="primary"
                                    />
                                }
                                label=""
                            />
                            <FormControlLabel
                                control={
                                    <TextField
                                        onChange={this.handleNameChange(
                                            'email',
                                        )}
                                        value={this.state.email}
                                        color="primary"
                                    />
                                }
                                label=""
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.should_email}
                                        onChange={this.handleChange(
                                            'should_email',
                                        )}
                                        value="should_email"
                                        color="primary"
                                    />
                                }
                                label="Keep me notified"
                            />
                            <StyledButton
                                onClick={this.handleSave}
                                variant="raised"
                            >
                                <Save />Save
                            </StyledButton>
                        </FormGroup>
                    </ProfileContainer>

                    <Divider />

                    <Snackbar
                        open={this.state.open}
                        autoHideDuration={3000}
                        onClose={this.handleClose}
                        transition={Slide}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Settings saved</span>}
                    />
                </Container>
            </Layout>
        );
    }
}

export default compose<any>(withRoot(), withRedux(initStore), withAuth([]))(
    Profile,
);
