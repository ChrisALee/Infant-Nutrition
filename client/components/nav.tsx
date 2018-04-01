import MenuIcon from 'material-ui-icons/Menu';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Link from 'next/link';
import styled from 'styled-components';
import { logout } from '../store';
import * as React from 'react';
import { connect } from 'react-redux';
import { initStore } from '../store';

const MenuButton = styled(IconButton)`
    && {
        margin-left: -12;
        margin-right: 20;
    }
`;

const TopBar = styled.div`
    flex-grow: 1;
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
                        {user ? (
                            <Button onClick={this.handleLogout} color="inherit">
                                <a>Logout {user}</a>
                            </Button>
                        ) : (
                            <Link prefetch href="/login">
                                <Button color="inherit">
                                    <a>Login</a>
                                </Button>
                            </Link>
                        )}
                    </Toolbar>
                </AppBar>
            </TopBar>
        );
    }
}

export default connect(initStore)(Nav);
