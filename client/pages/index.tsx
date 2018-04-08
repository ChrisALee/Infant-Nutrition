import fetch from 'isomorphic-unfetch';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import withRedux from 'next-redux-wrapper';
import getConfig from 'next/config';
import * as React from 'react';
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

export interface State {
    babyStageClicked: string;
    babyContentToPass: any;
}

export interface Props {
    name: string;
    user: { isLoggedIn: string; groups: string[] };
    content: any;
}

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
    max-width: 500;
    text-align: center;
`;

const BottomInfo = styled.div`
    background-color: #ffffff;
`;

const SectionInfo = styled.div`
    padding-bottom: 25vh;
    padding-top: 25vh;
    padding-left: 16vh;
    padding-right: 16vh;
    max-width: 500;
`;

const HorizontalGrid = styled(Grid)`
    && {
        flex-grow: 1;
    }
`;

const { publicRuntimeConfig } = getConfig();

class IndexPage extends React.Component<Props, State> {
    static async getInitialProps(): Promise<any> {
        try {
            const babyInfo: any = await fetch(
                `${publicRuntimeConfig.API_HOST}/content?outerLocation=index`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                },
            );
            const json: any = await babyInfo.json();
            const content = json.data.index;

            return { content };
        } catch (err) {
            return {
                content: {},
            };
        }
    }

    state = {
        babyStageClicked: '',
        babyContentToPass: {},
    };

    handleClick = e => {
        const targetId = e.currentTarget.id;
        const babyContentToPass = this.props.content.babySummary[targetId];
        // Users should be able to toggle a card if already shown hence the check
        this.setState({
            babyStageClicked:
                targetId === this.state.babyStageClicked ? '' : targetId,
            babyContentToPass,
        });
    };

    render() {
        const { babyStageClicked, babyContentToPass } = this.state;
        const { babySummary } = this.props.content;

        return (
            <IndexContainer>
                <Head title="Home" />
                <Nav />
                <Hero>
                    <Content>
                        <Title
                            variant="display2"
                            component="h1"
                            align="center"
                            color="secondary"
                            gutterBottom
                        >
                            Infant Feeding
                        </Title>

                        <IntroText>
                            <Typography component="h2" color="secondary">
                                Healthy Feeding Guidelines for Infants.
                            </Typography>
                        </IntroText>
                    </Content>
                </Hero>

                <BottomInfo>
                    <HorizontalGrid container justify="center" id="stages">
                        {babySummary ? (
                            Object.keys(babySummary).map(key => (
                                <BabySummary
                                    key={babySummary[key].guid}
                                    handleClick={this.handleClick}
                                    content={babySummary[key]}
                                />
                            ))
                        ) : (
                            <div>Loading...</div>
                        )}
                    </HorizontalGrid>

                    <SectionInfo>
                        {babyStageClicked ? (
                            <BabyInfo
                                key={babyStageClicked}
                                content={babyContentToPass}
                            />
                        ) : (
                            <Typography variant="body1">
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
                        )}
                    </SectionInfo>
                </BottomInfo>
            </IndexContainer>
        );
    }
}

export default compose<any>(
    withRoot(),
    withRedux(initStore),
    withAuth([PUBLIC]),
)(IndexPage);
