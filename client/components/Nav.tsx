import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Link from 'next/link';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { logout } from '../store';

const TopBar = styled.div`
    flex-grow: 1;
    z-index: 100;
    width: 100%;
`;

const AuthContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const LeftSide = styled.div`
    flex-basis: 100%;
`;

export interface NavProps {
    user: { isLoggedIn: string; groups: string[] };
}

class Nav extends React.PureComponent<NavProps, {}> {
    handleLogout = e => {
        e.preventDefault();
        const { dispatch }: any = this.props;
        dispatch(logout());
    };

    render() {
        const { user } = this.props;
        return (
            <TopBar>
                <AppBar position="fixed" elevation={0}>
                    <Toolbar>
                        <LeftSide>
                            <Link prefetch href="/">
                                <Button color="inherit">
                                    <a>Home</a>
                                </Button>
                            </Link>
                            <Link prefetch href="/quiz">
                                <Button color="inherit">
                                    <a>Quiz</a>
                                </Button>
                            </Link>
                        </LeftSide>
                        {user && user.isLoggedIn ? (
                            <AuthContainer>
                                <Button
                                    onClick={this.handleLogout}
                                    color="inherit"
                                >
                                    <a>Logout</a>
                                </Button>
                            </AuthContainer>
                        ) : (
                            <AuthContainer>
                                <Link prefetch href="/login">
                                    <Button color="inherit">
                                        <a>Login</a>
                                    </Button>
                                </Link>
                                <Link prefetch href="/register">
                                    <Button color="inherit">
                                        <a>Register</a>
                                    </Button>
                                </Link>
                            </AuthContainer>
                        )}
                    </Toolbar>
                </AppBar>
            </TopBar>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(Nav);
