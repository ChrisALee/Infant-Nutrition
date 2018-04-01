import 'isomorphic-unfetch';

import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import withRedux from 'next-redux-wrapper';
import getConfig from 'next/config';
import * as React from 'react';
import { compose } from 'redux';

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

export interface State {
    babyStageClicked: string;
}

export interface Props {
    name: string;
    species: string;
    user: string;
}

const { publicRuntimeConfig } = getConfig();

class IndexPage extends React.Component<Props, State> {
    static async getInitialProps(): Promise<any> {
        try {
            const res: any = await fetch(
                `${publicRuntimeConfig.API_HOST}/users/current/babies`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                    credentials: 'same-origin',
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
        this.setState({
            babyStageClicked: e.target.id,
        });
    };

    render() {
        const { name, user } = this.props;
        return (
            <div>
                <Head title="Home" />
                <Nav user={user} />

                <h1>Healthy Feeding guidelines for Infants</h1>
                <Card>
                    <CardContent>
                        <Typography variant="body1" gutterBottom>
                            &nbsp; &nbsp; &nbsp; Your baby will go on an amazing
                            food journey during the first year of life. At the
                            start of the journey, breast milk or formula will be
                            all that your baby will need. Along the way, your
                            baby will pass by several “developmental milestones”
                            — common stages at which babies can do new things,
                            including trying new foods and textures. Like most
                            parents, you will have lots of questions about what
                            to feed your baby and when to begin. Look inside the
                            “Great Eating Adventure” to see what’s ahead for
                            your baby. As your baby approaches each stage, we’ll
                            send you more detailed information, including ideas
                            for new foods to try, tips for picky eaters and
                            advice on how to wean your baby from breast milk or
                            formula.
                        </Typography>
                    </CardContent>
                </Card>

                <Typography variant="body1" gutterBottom>
                    Example fetch of data from API:
                </Typography>

                <Typography variant="body1" gutterBottom>
                    {name}
                </Typography>

                <table id="stages" onClick={this.handleClick}>
                    <tbody>
                        <tr>
                            <td id="0" className="devStage">
                                Newborn<br />(0-1 month)
                            </td>
                            <td id="1" className="devStage">
                                Pushing Up<br />(1-4 months)
                            </td>
                            <td id="2" className="devStage">
                                Learning to Sit<br />(4-7 months)
                            </td>
                            <td id="3" className="devStage">
                                Learning to crawl<br />(7-9 months)
                            </td>
                            <td id="4" className="devStage">
                                Learning to Walk<br />(9-12 months)
                            </td>
                        </tr>
                    </tbody>
                </table>

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
                    <div />
                )}
            </div>
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
