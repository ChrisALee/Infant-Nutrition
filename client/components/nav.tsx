import MenuIcon from 'material-ui-icons/Menu';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Link from 'next/link';
import styled from 'styled-components';
import Typography from 'material-ui/Typography';

const MenuButton = styled(IconButton)`
    && {
        margin-left: -12;
        margin-right: 20;
    }
`;

const TopBar = styled.div`
    flex-grow: 1;
`;

const Nav = () => (
    <TopBar>
        <AppBar position="static">
            <Toolbar>
                <MenuButton color="inherit" aria-label="Menu">
                    <MenuIcon />
                </MenuButton>
                <Link prefetch href="/">
                    <a>
                        <Typography variant="title" color="inherit">
                            Home
                        </Typography>
                    </a>
                </Link>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    </TopBar>
);

export default Nav;
