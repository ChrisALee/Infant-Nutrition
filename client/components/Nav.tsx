import MenuIcon from 'material-ui-icons/Menu';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Link from 'next/link';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { initStore, logout } from '../store';

const MenuButton = styled(IconButton)`
    && {
        margin-left: -12;
        margin-right: 20;
    }
`;

const TopBar = styled.div`
    flex-grow: 1;
`;

const AuthContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const LeftSide = styled.div`
    flex-basis: 100%;
`;

class Nav extends React.Component {
    handleLogout = e => {
        e.preventDefault();
        const { dispatch }: any = this.props;
        dispatch(logout());
    };

    render() {
        const { user }: any = this.props;
        return (
            <TopBar>
                <AppBar position="static">
                    <Toolbar>
                        <LeftSide>
                            <MenuButton color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </MenuButton>
                            <Link prefetch href="/">
                                <Button color="inherit">
                                    <a>Home</a>
                                </Button>
                            </Link>
                            <Link prefetch href="/private">
                                <Button color="inherit">
                                    <a>Private</a>
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

export default connect(initStore)(Nav);
