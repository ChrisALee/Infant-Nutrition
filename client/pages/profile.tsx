import * as React from 'react';
import fetch from 'isomorphic-unfetch';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import withRedux from 'next-redux-wrapper';
import getConfig from 'next/config';
import { compose } from 'redux';
import styled from 'styled-components';

import BabyInfo from '../components/BabyInfo';
import BabySummary from '../components/BabySummary';
import Head from '../components/Head';
import Nav from '../components/Nav';
import { initStore } from '../store';
import theme from '../utils//styles/mui-theme';
import withAuth, { PUBLIC } from '../utils/auth/withAuth';
import withRoot from '../utils/material-ui/withRoot';
import Checkbox from 'material-ui/Checkbox';


const IndexContainer = styled.div`
    flex: 1 0 100%;
`;
const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
};
class Profile extends React.Component<{}, {}>
{
    state = {
        checked: false,
    }

    updateCheck() {
        this.setState((oldState) => {
            return {
                checked: !oldState.checked,
            };
        });
    }
    render() {
        return (
            <IndexContainer>
                <Head title="Profile" />
                <Nav />
                <div style={styles.block}>
                    <Checkbox
                        label="Keep me notified"
                        labelPosition="right"
                        style={styles.checkbox}
                    />
                </div>
            </IndexContainer>


        );
    }

}
export default compose<any>(
    withRoot(),
    withRedux(initStore),
    withAuth([PUBLIC]),
)(Profile);