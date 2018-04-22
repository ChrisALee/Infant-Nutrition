import withRedux from 'next-redux-wrapper';
import * as React from 'react';
import { compose } from 'redux';
import styled from 'styled-components';

import Table from '../components/EnhancedTable/EnhancedTable';
import Layout from '../components/Layout';
import { initStore } from '../store';
import withAuth from '../utils/auth/withAuth';
import withRoot from '../utils/material-ui/withRoot';

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

class Food extends React.Component<ProfileProps, ProfileState> {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        return (
            <Layout title="Profile">
                <Container>
                    <Table />
                </Container>
            </Layout>
        );
    }
}

export default compose<any>(withRoot(), withRedux(initStore), withAuth([]))(
    Food,
);
