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
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import purple from 'material-ui/colors/purple';


const IndexContainer = styled.div`
    flex: 1 0 100%;
`;
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    inputLabelFocused: {
        color: purple[500],
    },
    inputUnderline: {
        '&:after': {
            backgroundColor: purple[500],
        },
    },
    textFieldRoot: {
        padding: 0,
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    textFieldInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    textFieldFormLabel: {
        fontSize: 18,
    },
});


class Submit extends React.Component<{}, {}>
{
    render() {
        const { classes } = this.props;
        return (
            <IndexContainer>
                <Head title="Submit Questions" />
                <Nav />
                <div className={classes.container}>
                    <TextField
                        defaultValue="Ask a question!"
                        label="Submit Questions Here"
                        id="submit-questions"
                        InputProps={{
                            disableUnderline: true,
                            classes: {
                                root: classes.textFieldRoot,
                                input: classes.textFieldInput,
                            },
                        }}
                        InputLabelProps={{
                            shrink: true,
                            className: classes.textFieldFormLabel,
                        }}
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
)(Submit);