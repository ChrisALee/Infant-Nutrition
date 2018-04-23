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

const LeftSide = styled.div``;

const Middle = styled.div``;

const StyledToolbar = styled(Toolbar)`
    && {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        max-width: 1180px;
        width: 100%;
        margin: 0 auto;
    }
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
                <AppBar position="static" elevation={0}>
                    <StyledToolbar>
                        <LeftSide>
                            <Link prefetch href="/">
                                <Button color="inherit">
                                    <a>Infant Feeding</a>
                                </Button>
                            </Link>
                        </LeftSide>
                        <Middle>
                            <Link prefetch href="/quiz">
                                <Button color="inherit">
                                    <a>Quiz</a>
                                </Button>
                            </Link>
                            {user && user.isLoggedIn ? (
                                <Link prefetch href="/food">
                                    <Button color="inherit">
                                        <a>Food tracker</a>
                                    </Button>
                                </Link>
                            ) : null}
                            <Link prefetch href="/contact">
                                <Button color="inherit">
                                    <a>Contact</a>
                                </Button>
                            </Link>
                        </Middle>
                        {user && user.isLoggedIn ? (
                            <AuthContainer>
                                <Link prefetch href="/profile">
                                    <Button color="inherit">
                                        <a>Profile</a>
                                    </Button>
                                </Link>
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
                    </StyledToolbar>
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
