import fetch from 'isomorphic-unfetch';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import withRedux from 'next-redux-wrapper';
import getConfig from 'next/config';
import * as React from 'react';
import { compose } from 'redux';
import styled from 'styled-components';

import Head from '../components/Head';
import LearningToCrawl from '../components/LearningToCrawl';
import LearningToSit from '../components/LearningToSit';
import LearningToWalk from '../components/LearningToWalk';
import Nav from '../components/Nav';
import Newborn from '../components/Newborn';
import PushingUp from '../components/PushingUp';
import { initStore } from '../store';
import withAuth, { PUBLIC } from '../utils/auth/withAuth';
import withRoot from '../utils/material-ui/withRoot';
import theme from '../utils//styles/mui-theme';

export interface State {
    babyStageClicked: string;
}

export interface Props {
    name: string;
    user: { isLoggedIn: string };
    species: string;
}

const HorizontalGrid = styled(Grid)`
    && {
        flex-grow: 1;
    }
`;

const BabyPanel = styled.div`
    border: 1.2px solid ${theme.palette.common.white};
    background-color: #fafafa;
    padding: 3px 2px;
`;

const Title = styled(Typography)`
    && {
        padding-bottom: 50;
    }
`;

const IndexContainer = styled.div`
    flex: 1 0 100%;
`;

const Hero = styled.div`
    min-height: '80vh';
    flex: '0 0 auto';
    display: 'flex';
    justify-content: 'center';
    align-items: 'center';
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};
`;

const Content = styled.div`
    padding-bottom: 25vh;
    padding-top: 25vh;
`;

const IntroText = styled.div`
    padding-left: 16vh;
    padding-right: 16vh;
    display: 'flex';
    flex-direction: 'column';
    align-items: 'center';
    justify-content: 'center';
`;

const BottomInfo = styled.div`
    background-color: #ffffff;
`;

const SectionInfo = styled.div`
    padding-bottom: 25vh;
    padding-top: 25vh;
`;

const { publicRuntimeConfig } = getConfig();

class IndexPage extends React.Component<Props, State> {
    static async getInitialProps({ req }): Promise<any> {
        try {
            const res: any = await fetch(
                `${publicRuntimeConfig.API_HOST}/users/current/babies`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        // If server rendered, cookies must manually be passed in
                        Cookie: req ? req.headers.cookie : undefined,
                    },
                    credentials: 'include',
                },
            );
            const json: any = await res.json();

            return {
                name: json[0].name,
            };
        } catch (err) {
            return {
                name: '',
            };
        }
    }

    state = {
        babyStageClicked: '',
    };

    handleClick = e => {
        const targetId = e.currentTarget.id;
        // Users should be able to toggle a card if already shown hence the check
        this.setState({
            babyStageClicked:
                targetId === this.state.babyStageClicked ? '' : targetId,
        });
    };

    render() {
        const { user } = this.props;
        return (
            <IndexContainer>
                <Head title="Home" />
                <Nav user={user} />
                <Hero>
                    <Content>
                        <Title
                            variant="display3"
                            align="center"
                            color="secondary"
                        >
                            Healthy Feeding Guidelines for Infants
                        </Title>

                        <IntroText>
                            <Typography variant="body1" color="secondary">
                                Your baby will go on an amazing food journey
                                during the first year of life. At the start of
                                the journey, breast milk or formula will be all
                                that your baby will need. Along the way, your
                                baby will pass by several “developmental
                                milestones” — common stages at which babies can
                                do new things, including trying new foods and
                                textures. Like most parents, you will have lots
                                of questions about what to feed your baby and
                                when to begin. Look inside the “Great Eating
                                Adventure” to see what’s ahead for your baby. As
                                your baby approaches each stage, we’ll send you
                                more detailed information, including ideas for
                                new foods to try, tips for picky eaters and
                                advice on how to wean your baby from breast milk
                                or formula. Not sure where to start? Click the
                                titles below to explore information for the
                                respective developmental stages!
                            </Typography>
                        </IntroText>
                    </Content>
                </Hero>

                <BottomInfo>
                    <HorizontalGrid container justify="center" id="stages">
                        <Grid item xs={2}>
                            <BabyPanel>
                                <CardContent>
                                    <Typography component="h2" gutterBottom>
                                        Newborn
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        0-1 month
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        id="0"
                                        onClick={this.handleClick}
                                        color="primary"
                                    >
                                        Learn More
                                    </Button>
                                </CardActions>
                            </BabyPanel>
                        </Grid>

                        <Grid item xs={2}>
                            <BabyPanel>
                                <CardContent>
                                    <Typography component="h2" gutterBottom>
                                        Pushing up
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        1-4 months
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        id="1"
                                        onClick={this.handleClick}
                                        color="primary"
                                    >
                                        Learn More
                                    </Button>
                                </CardActions>
                            </BabyPanel>
                        </Grid>

                        <Grid item xs={2}>
                            <BabyPanel>
                                <CardContent>
                                    <Typography component="h2" gutterBottom>
                                        Learning to sit
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        4-7 months
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        id="2"
                                        onClick={this.handleClick}
                                        color="primary"
                                    >
                                        Learn More
                                    </Button>
                                </CardActions>
                            </BabyPanel>
                        </Grid>

                        <Grid item xs={2}>
                            <BabyPanel>
                                <CardContent>
                                    <Typography component="h2" gutterBottom>
                                        Learning to crawl
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        7-9 months
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        id="3"
                                        onClick={this.handleClick}
                                        color="primary"
                                    >
                                        Learn More
                                    </Button>
                                </CardActions>
                            </BabyPanel>
                        </Grid>

                        <Grid item xs={2}>
                            <BabyPanel>
                                <CardContent>
                                    <Typography component="h2" gutterBottom>
                                        Learning to walk
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        9-12 months
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        id="4"
                                        onClick={this.handleClick}
                                        color="primary"
                                    >
                                        Learn More
                                    </Button>
                                </CardActions>
                            </BabyPanel>
                        </Grid>
                    </HorizontalGrid>

                    <SectionInfo>
                        {this.state.babyStageClicked ? (
                            <div>
                                <h2 id="stageName">
                                    {
                                        {
                                            '0': 'Newborn',
                                            '1': 'Pushing Up',
                                            '2': 'Learning to Sit',
                                            '3': 'Learning to Crawl',
                                            '4': 'Learning to Walk',
                                        }[this.state.babyStageClicked]
                                    }
                                </h2>
                                <div id="stageInfo">
                                    {
                                        {
                                            '0': <Newborn />,
                                            '1': <PushingUp />,
                                            '2': <LearningToSit />,
                                            '3': <LearningToCrawl />,
                                            '4': <LearningToWalk />,
                                        }[this.state.babyStageClicked]
                                    }
                                </div>
                            </div>
                        ) : (
                            <div>Filler content</div>
                        )}
                    </SectionInfo>
                </BottomInfo>
            </IndexContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default compose<any>(
    withRoot(),
    withRedux(initStore, mapStateToProps),
    withAuth([PUBLIC]),
)(IndexPage);
