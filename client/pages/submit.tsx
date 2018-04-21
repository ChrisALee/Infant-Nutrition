import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import withRedux from 'next-redux-wrapper';
import * as React from 'react';
import { compose } from 'redux';
import styled from 'styled-components';

import Layout from '../components/Layout';
import { initStore } from '../store';
import withAuth, { PUBLIC } from '../utils/auth/withAuth';
import withRoot from '../utils/material-ui/withRoot';

const Container = styled.div`
	padding-top: 30px;
	flex: 1 0 100%;
	display: flex;
	flex-wrap: wrap;
`;
const TextField = styled.div`
	width: 48px;
	height: 48px;
	borderRadius: 4;
	backgroundColor: theme.palette.common.white;
	border: '1px solid #ced4da';
	fontSize: 16;
	padding: '10px 12px';
	width: 'calc(100% - 24px)';
	borderColor: '#80bdff';
	boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)';
`;

class Submit extends React.Component<{}, {}> {
	render() {
		return (
			<Layout title="Submit">
				<Container>
					<TextField
						defaultValue="Ask a question!"
						label="Submit Questions Here"
						id="submit-questions"
						InputProps={{
							disableUnderline: true
						}}
						InputLabelProps={{
							shrink: true
						}}
					/>
				</Container>
			</Layout>
		);
	}
}

export default compose<any>(withRoot(), withRedux(initStore), withAuth([ PUBLIC ]))(Submit);
