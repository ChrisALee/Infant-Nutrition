import createMuiTheme from 'material-ui/styles/createMuiTheme';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#82cdff',
            main: '#4b9cd3',
            dark: '#006ea3',
            // contrastText: '#000000'
        },
        secondary: {
            light: '#ffffff',
            main: '#ffffff',
        },
    },
});

export default theme;
