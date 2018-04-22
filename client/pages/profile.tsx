import fetch from 'isomorphic-unfetch';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';
import withRedux from 'next-redux-wrapper';
import getConfig from 'next/config';
import * as React from 'react';
import { compose } from 'redux';
import styled from 'styled-components';

import Table from '../components/EnhancedTable/EnhancedTable';
import Layout from '../components/Layout';
import { initStore } from '../store';
import withAuth from '../utils/auth/withAuth';
import withRoot from '../utils/material-ui/withRoot';

const { publicRuntimeConfig } = getConfig();

const Container = styled.div`
    flex: 1 0 100%;
    max-width: 1180px;
    width: 100%;
    margin: 0px auto;
    padding: 30px;
`;

export interface ProfileState {
    profileSettings: object;
}

export interface ProfileProps {
    profileSettings: any;
    onRequestSort: any;
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

    handleSave = async () => {
        const payload = {
            profile: {
                // TODO: Have the ability to change names dynamically
                name: 'test',
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

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        return (
            <Layout title="Profile">
                <Container>
                    <Table />
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.should_email}
                                    onChange={this.handleChange('should_email')}
                                    value="should_email"
                                    color="primary"
                                />
                            }
                            label="Keep me notified"
                        />
                    </FormGroup>

                    <p>Real Name: {this.state.name}</p>
                    <Button onClick={this.handleSave}>Save</Button>

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
