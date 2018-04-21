import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import withRedux from 'next-redux-wrapper';
import Link from 'next/link';
import * as React from 'react';
import { compose } from 'redux';
import styled from 'styled-components';

import BabySummary from '../components/BabySummary';
import Layout from '../components/Layout';
import { initStore } from '../store';
import theme from '../utils//styles/mui-theme';
import withAuth, { PUBLIC } from '../utils/auth/withAuth';
import withRoot from '../utils/material-ui/withRoot';

const Title = styled(Typography)`
    && {
        text-align: center;
    }
`;

const Hero = styled.div`
    min-height: 70vh;
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${theme.palette.primary.contrastText};
    background-color: ${theme.palette.primary.main};
`;

const Content = styled.div`
    padding: 10vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const IntroText = styled(Typography)`
    && {
    }
`;

const Text = styled(Typography)`
    && {
        text-align: right;
        color: #525f7f;
    }
`;

const ParagraphContainer = styled.div`
    min-height: 60vh;
    display: flex;
    flex-direction: row;
    padding: 30px;
    margin: 0px auto;
    max-width: 1180px;
    width: 100%;
`;

const BabySummaryContainer = styled.div`
    min-height: 60vh;
    padding: 30px;
    margin: 0px auto;
    max-width: 1180px;
    width: 100%;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: rgb(218, 225, 233);
`;

const ResizedImage = styled.img`
    width: 950px;
    padding-left: 20px;
    height auto;
`;

const HeroLink = styled.div`
    margin-top: 80px;
`;

const LinkText = styled.a`
    color: #007fae;
`;

const Footer = styled.div`
    padding-top: 30px;
    padding-bottom: 30px;
    background-color: #13294b;
    color: white;
`;

const InnerFooter = styled.div`
    max-width: 1180px;
    width: 100%;
    margin: 0px auto;
    padding: 30px;
`;

export interface IndexProps {
    name: string;
    user: { isLoggedIn: string; groups: string[] };
}

class Index extends React.Component<IndexProps, {}> {
    state = {
        stage: 0,
    };

    handleClick = value => {
        this.setState({
            stage: value,
        });
    };

    render() {
        const { stage } = this.state;
        return (
            <Layout title="Home">
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

                        <IntroText
                            variant="headline"
                            component="h2"
                            color="secondary"
                            gutterBottom
                        >
                            Infant Feeding is the place to go to find healthy
                            feeding guidelines for infants.
                        </IntroText>

                        <HeroLink>
                            <Link prefetch href="/register">
                                <Button variant="raised" color="secondary">
                                    <LinkText>Create account</LinkText>
                                </Button>
                            </Link>
                        </HeroLink>
                    </Content>
                </Hero>

                <Divider />

                <ParagraphContainer>
                    <Text paragraph>
                        Your baby will go on an amazing food journey during the
                        first year of life. At the start of the journey, breast
                        milk or formula will be all that your baby will need.
                        Along the way, your baby will pass by several
                        “developmental milestones” — common stages at which
                        babies can do new things, including trying new foods and
                        textures. Like most parents, you will have lots of
                        questions about what to feed your baby and when to
                        begin. Look inside the “Great Eating Adventure” to see
                        what’s ahead for your baby. As your baby approaches each
                        stage, we’ll send you more detailed information,
                        including ideas for new foods to try, tips for picky
                        eaters and advice on how to wean your baby from breast
                        milk or formula. Not sure where to start? Click the
                        titles above to explore information for the respective
                        developmental stages!
                    </Text>
                    <ResizedImage
                        src={
                            '../static/Human-Male-White-Newborn-Baby-Crying.jpg'
                        }
                        alt={'Baby'}
                    />
                </ParagraphContainer>

                <Divider />

                <BabySummaryContainer>
                    <BabySummary stage={stage} handleClick={this.handleClick} />
                </BabySummaryContainer>

                <Divider />
                <Footer>
                    <InnerFooter>Footer</InnerFooter>
                </Footer>
            </Layout>
        );
    }
}

export default compose<any>(
    withRoot(),
    withRedux(initStore),
    withAuth([PUBLIC]),
)(Index);
