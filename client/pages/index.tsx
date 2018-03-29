import 'isomorphic-unfetch';

import * as React from 'react';

import Head from '../components/Head';
import LearningToCrawl from '../components/LearningToCrawl';
import LearningToSit from '../components/LearningToSit';
import LearningToWalk from '../components/LearningToWalk';
import Nav from '../components/Nav';
import Newborn from '../components/Newborn';
import PushingUp from '../components/PushingUp';

export interface State {
    babyStageClicked: string;
}

export interface Props {
    name: string;
    species: string;
}

export default class IndexPage extends React.Component<Props, State> {
    static async getInitialProps(): Promise<any> {
        try {
            // TODO: Use env var for url
            const res: any = await fetch('http://localhost:3001/birds');
            const json: any = await res.json();
            return {
                name: json.data[0].name,
                species: json.data[0].species,
            };
        } catch (err) {
            return {
                name: '',
                species: '',
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
        const { name, species } = this.props;
        return (
            <div>
                <Head title="Home" />
                <Nav />

                <h1>Healthy Feeding guidelines for Infants</h1>
                <div id="intro">
                    &nbsp; &nbsp; &nbsp; Your baby will go on an amazing food
                    journey during the first year of life. At the start of the
                    journey, breast milk or formula will be all that your baby
                    will need. Along the way, your baby will pass by several
                    “developmental milestones” — common stages at which babies
                    can do new things, including trying new foods and textures.
                    Like most parents, you will have lots of questions about
                    what to feed your baby and when to begin. Look inside the
                    “Great Eating Adventure” to see what’s ahead for your baby.
                    As your baby approaches each stage, we’ll send you more
                    detailed information, including ideas for new foods to try,
                    tips for picky eaters and advice on how to wean your baby
                    from breast milk or formula.
                </div>

                <div>
                    <p>Example fetch of data from API: </p>
                    <p>{name}</p>
                    <p>{species}</p>
                </div>

                <table id="stages" onClick={this.handleClick}>
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

                <style jsx>{`
                     {
                        h1 {
                            text-align: center;
                            font-family: 'Pacifico', cursive;
                        }

                        h3 {
                            font-family: 'Pacifico', cursive;
                        }

                        #intro {
                            background-color: w)hite;
                            padding: 2.5%;
                            border-radius: 5px;
                            margin-top: 5%;
                            margin-left: 7.5%;
                            width: 80%;
                            font-size: 18px;
                            font-family: 'Arima Madurai', cursive;
                        }

                        #stages {
                            margin-top: 5%;
                            margin-left: 5%;
                            width: 90%;
                            height: 33.33%;
                            /**/
                            /* border-color: red;
	border-style: dotted; */
                            /**/
                            position: absolute;
                        }

                        .devStage {
                            background-color: white;
                            height: 80%;
                            width: 12.5%;
                            font-family: 'Arima Madurai', cursive;
                            text-align: center;
                            border-style: solid;
                            border-color: transparent;
                            border-radius: 15px;
                            transition: background-color 1.25s, height 0.75s,
                                width 0.75s, font-size 0.75s, padding 0.75s;
                            /**/
                            /*display: inline-block;
	margin-left: 1%;*/
                            position: auto;
                            overflow: visible;
                        }

                        .devStage:hover {
                            height: 100%;
                            width: 20%;
                            font-size: 22px;
                            padding-bottom: 15%;
                            background-color: grey;
                            color: white;
                        }

                        #stageName {
                            text-align: center;
                            position: auto;
                            margin-top: 27.5%;
                            font-family: 'Shrikhand', cursive;
                        }

                        #stageInfo {
                            position: auto;
                            margin-left: 7.5%;
                            margin-bottom: 10%;
                            padding: 2.5%;
                            width: 80%;
                            height: 40%;
                            text-align: left;
                            font-family: 'Arima Madurai', cursive;
                            /**/
                            background-color: white;
                            border-radius: 5px;
                            transition: height 0.75s;
                        }

                        .hidden {
                            visibility: visible;
                            width: 0px;
                            height: 0px;
                            font-size: 0%;
                            position: absolute;
                        }
                    }
                `}</style>
            </div>
        );
    }
}
