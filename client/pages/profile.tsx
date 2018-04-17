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
import Table from '../components/Table';
import { initStore } from '../store';
import theme from '../utils//styles/mui-theme';
import withAuth, { PUBLIC } from '../utils/auth/withAuth';
import withRoot from '../utils/material-ui/withRoot';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import green from 'material-ui/colors/green';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Table, { TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from 'material-ui/styles/colorManipulator';

const IndexContainer = styled.div`flex: 1 0 100%;`;
const styles = {
	root: {
		color: green[600],
		'&$checked': {
			color: green[500]
		}
	},
	checked: {},
	size: {
		width: 40,
		height: 40
	},
	sizeIcon: {
		fontSize: 20
	}
};

const columnData = [
	{ id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
	{ id: 'number of times eaten ', numeric: true, disablePadding: false, label: 'Food Group' },
	{ id: 'calories', numeric: true, disablePadding: false, label: 'Fat (g)' },
	{ id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
	{ id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' }
];

class Profile extends React.Component<{}, {}> {
	state = {
		checkedA: true
	};

	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
		// update database for email listserv!!!!
	};
	createSortHandler = (property) => (event) => {
		this.props.onRequestSort(event, property);
	};
	render() {
		const { classes } = this.props;
		return (
			<IndexContainer>
				<Head title="Profile" />
				<Nav />
				<Table />
				<FormGroup row>
					<FormControlLabel
						control={
							<Checkbox
								checked={this.state.checkedA}
								onChange={this.handleChange('checkedA')}
								value="checkedA"
								color="primary"
							/>
						}
						label="Keep me notified"
					/>
				</FormGroup>
			</IndexContainer>
		);
	}
}
export default compose<any>(withRoot(), withRedux(initStore), withAuth([ PUBLIC ]))(Profile);
