import withRedux from 'next-redux-wrapper';
import React from 'react';
import { compose } from 'redux';

import Head from '../components/Head';
import Nav from '../components/Nav';
import { initStore } from '../store';
import withAuth from '../utils/auth/withAuth';
import withRoot from '../utils/material-ui/withRoot';

class Private extends React.Component {
    render() {
        const { user }: any = this.props;
        return (
            <div>
                <Head title="private" />
                <Nav user={user} />
                <h1>Hello {user}!</h1>
                <p>This content is available for logged in users only.</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default compose(
    withRoot(),
    withRedux(initStore, mapStateToProps),
    withAuth(),
)(Private);
