import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import withRedux from 'next-redux-wrapper';
import Link from 'next/link';
import * as React from 'react';
import { compose } from 'redux';
import styled from 'styled-components';

import BabyPreview from '../components/BabyPreview';
import BabySummary from '../components/BabySummary';
import Layout from '../components/Layout';
import { initStore } from '../store';
import theme from '../utils//styles/mui-theme';
import withAuth, { PUBLIC } from '../utils/auth/withAuth';
import withRoot from '../utils/material-ui/withRoot';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const Title = styled(Typography)`
    && {
        text-align: center;
        font-family: 'Pacifico', cursive;
        text-decoration: underline;
        text-decoration-style: solid;
        color: #000000;
    }
`;

const Hero = styled.div`
	min-height: 80vh;
	flex: 0 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${theme.palette.primary.contrastText};
	background-color: ${theme.palette.primary.main};
	background-image: url('../static/bg-baby.png');
`;

const Content = styled.div`
	padding-bottom: 10vh;
	padding-top: 10vh;
	padding-left: 10vh;
	padding-right: 10vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const IntroText = styled(Typography)`
    && {
        color: #000000;
        font-family: 'Arima Madurai', cursive;
    }
`;

const HomeSteps = styled(Grid)`
    && {
        flex-grow: 1;
    }
`;

const Text = styled(Typography)`
    && {
        text-align: left;
        font-family: 'Arima Madurai', cursive;
        font-size: 18px;
    }
`;

export interface IndexProps {
	name: string;
	user: { isLoggedIn: string; groups: string[] };
}

class Index extends React.Component<IndexProps, {}> {
	state = {
		stage: 0
	};

	handleClick = (value) => {
		this.setState({
			stage: value
		});
	};

	render() {
		const { stage } = this.state;
		return (
			<Layout title="Home">
				<Hero>
					<Content>
						<Title variant="display2" component="h1" align="center" gutterBottom>
							Infant Feeding
						</Title>

						<IntroText variant="headline" component="h2" gutterBottom>
							Healthy Feeding Guidelines for Infants.
						</IntroText>

						<Link prefetch href="/quiz">
							<Button variant="raised">
								<a>Get started with a quiz</a>
							</Button>
						</Link>
					</Content>
				</Hero>

				<HomeSteps container id="stages">
					<BabyPreview handleClick={this.handleClick} />
				</HomeSteps>

				<Text paragraph>
					Your baby will go on an amazing food journey during the first year of life. At the start of the
					journey, breast milk or formula will be all that your baby will need. Along the way, your baby will
					pass by several “developmental milestones” — common stages at which babies can do new things,
					including trying new foods and textures. Like most parents, you will have lots of questions about
					what to feed your baby and when to begin. Look inside the “Great Eating Adventure” to see what’s
					ahead for your baby. As your baby approaches each stage, we’ll send you more detailed information,
					including ideas for new foods to try, tips for picky eaters and advice on how to wean your baby from
					breast milk or formula. Not sure where to start? Click the titles above to explore information for
					the respective developmental stages!
				</Text>

				<BabySummary stage={stage} handleClick={this.handleClick} />
			</Layout>
		);
	}
}

export default compose<any>(withRoot(), withRedux(initStore), withAuth([ PUBLIC ]))(Index);
