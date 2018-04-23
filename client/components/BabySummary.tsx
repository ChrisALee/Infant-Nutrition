import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';

const StyledText = styled(Typography)`
    && {
        color: #525f7f;
    }
`;

const StyledButton = styled(Button)`
    && {
        align-self: center;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

export interface BabySummaryProps {
    stage: number;
    handleClick: (e: any) => void;
}

class BabySummary extends React.PureComponent<BabySummaryProps, {}> {
    handleChange = (_e, value) => {
        this.props.handleClick(value);
    };

    render() {
        const { stage } = this.props;

        return (
            <Container>
                <AppBar position="static" color="default">
                    <Tabs
                        value={stage}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Newborn" />
                        <Tab label="Pushing up" />
                        <Tab label="Learning to sit" />
                        <Tab label="Learning to crawl" />
                        <Tab label="Learning to walk" />
                    </Tabs>
                </AppBar>
                {
                    {
                        0: (
                            <div id="0">
                                <StyledText>
                                    <br />
                                    <b>Newborn</b>
                                    <br />
                                    <br />
                                    <div>
                                        <b>
                                            Key skills most babies have at this
                                            stage:
                                        </b>
                                        <li>Needs head support</li>
                                        <li>
                                            Baby establishes a
                                            suck-swallow-breathe pattern during
                                            breast or bottle feeding
                                        </li>
                                    </div>
                                    <br />
                                    <div>
                                        <b>
                                            Feeding cues many babies use at this
                                            stage:
                                        </b>
                                        <li>Cries or fusses to show hunger</li>
                                        <li>
                                            Gazes at caregiver, opens mouth
                                            during feeding indicating desire to
                                            continue
                                        </li>
                                        <li>
                                            Spits out nipple or falls asleep
                                            when full
                                        </li>
                                        <li>Stops sucking when full</li>
                                    </div>
                                    <br />
                                    <div>
                                        <b>
                                            Healthy and appropriate foods and
                                            textures:
                                        </b>
                                        <li>Breastmilk or infant formula</li>
                                    </div>
                                    <br />
                                </StyledText>
                            </div>
                        ),
                        1: (
                            <div id="1">
                                <StyledText>
                                    <br />
                                    <b>Pushing Up</b>
                                    <br />
                                    <br />

                                    <div>
                                        <b>
                                            Key skills most babies have at this
                                            stage:
                                        </b>
                                        <li>
                                            More skillful head control with
                                            support emerging
                                        </li>
                                        <li>Breastfeeds or bottle feeds</li>
                                        <li>
                                            Tongue moves forward and back to
                                            suck
                                        </li>
                                    </div>
                                    <br />
                                    <div>
                                        <b>
                                            Feeding cues many babies use at this
                                            stage:
                                        </b>
                                        <li>Cries of fusses to show hunger</li>
                                        <li>
                                            Smiles, gazes at caregiver, or coos
                                            during feeding to indicate desire to
                                            continue
                                        </li>
                                        <li>
                                            Spits out nipple or falls asleep
                                            when full
                                        </li>
                                        <li>Stops sucking when full</li>
                                    </div>
                                    <br />
                                    <div>
                                        <b>
                                            Healthy and appropriate foods and
                                            textures:
                                        </b>
                                        <li>Breastmilk or infant formula</li>
                                    </div>
                                    <br />
                                </StyledText>
                            </div>
                        ),
                        2: (
                            <div id="2">
                                <StyledText>
                                    <br />
                                    <b>Learning to Sit</b>
                                    <br />
                                    <br />

                                    <div>
                                        <b>
                                            Key skills most babies have at this
                                            stage:
                                        </b>
                                        <li>Sits with help or support</li>
                                        <li>
                                            On tummy, pushes up on arms with
                                            straight elbows
                                        </li>
                                        <li>Sits independently</li>
                                        <li>
                                            Can pick up and hold small object in
                                            hand
                                        </li>
                                        <li>Leans toward food or spoon</li>
                                        <li>
                                            May push food out of mouth with
                                            tongue, which gradually decreases
                                            with age
                                        </li>
                                        <li>
                                            Moves pureed food forward and
                                            backward in mouth with tongue to
                                            swallow
                                        </li>
                                        <li>
                                            Recognizes spoon and holds mouth
                                            open as spoon approaches
                                        </li>
                                    </div>
                                    <br />
                                    <div>
                                        <b>
                                            Feeding cues many babies use at this
                                            stage:
                                        </b>
                                        <li>
                                            Learns to keep thick purees in mouth
                                        </li>
                                        <li>
                                            Pulls head downward and presses
                                            upper lip to draw food from spoon
                                        </li>
                                        <li>
                                            Tries to rake foods toward self into
                                            fist
                                        </li>
                                        <li>
                                            Can transfer food from one hand to
                                            the other
                                        </li>
                                        <li>
                                            Can drink from a cup held by a
                                            feeder
                                        </li>
                                    </div>
                                    <br />
                                    <div>
                                        <b>
                                            Healthy and appropriate foods and
                                            textures:
                                        </b>
                                        <li>Breastmilk or infant formula</li>
                                        <li>Infant cereals</li>
                                        <li>Thin pureed baby foods</li>
                                        <li>Thicker pureed baby foods</li>
                                        <li>Soft mashed foods without lumps</li>
                                        <li>100% Juice</li>
                                    </div>
                                    <br />
                                </StyledText>
                            </div>
                        ),
                        3: (
                            <div id="3">
                                <StyledText>
                                    <br />
                                    <b>Learning to crawl</b>
                                    <br /> <br />
                                    <div>
                                        <b>
                                            Key skills most babies have at this
                                            stage:
                                        </b>
                                        <li>Learns to crawl</li>
                                        <li>May pull self to stand</li>
                                        <li>
                                            Learns to move tongue from side to
                                            side to transfer food around mouth
                                            and push food to the side of the
                                            mouth so food can be mashed
                                        </li>
                                        <li>
                                            Begins to use jaw and tongue to mash
                                            food
                                        </li>
                                        <li>
                                            Plays with spoon at mealtime, may
                                            bring it to mouth, but does not use
                                            it for self-feeding yet
                                        </li>
                                        <li>Can feed self finger foods</li>
                                        <li>Holds cup independently</li>
                                        <li>
                                            Holds small foods between thumb and
                                            first finger
                                        </li>
                                    </div>
                                    <br />
                                    <div>
                                        <b>
                                            Feeding cues many babies use at this
                                            stage:
                                        </b>
                                        <li>Reaches for food when hungry</li>
                                        <li>Points to food when hungry</li>
                                        <li>
                                            Shows excitement when food is
                                            presented when hungry
                                        </li>
                                        <li>Pushes food away when full</li>
                                        <li>Slows down in eating when full</li>
                                    </div>
                                    <br />
                                    <div>
                                        <b>
                                            Healthy and appropriate foods and
                                            textures:
                                        </b>
                                        <li>Breastmilk or infant formula</li>
                                        <li>100% Juice</li>
                                        <li>Infant cereals</li>
                                        <li>Pureed foods</li>
                                        <li>
                                            Ground or soft mashed foods with
                                            tiny soft noticeable lumps
                                        </li>
                                        <li>Foods with soft texture</li>
                                        <li>
                                            Crunchy foods that dissolve (such as
                                            baby biscuits or crackers)
                                        </li>
                                        <li>
                                            Increase variety of flavors offered
                                        </li>
                                    </div>
                                    <br />
                                </StyledText>
                            </div>
                        ),
                        4: (
                            <div id="4">
                                <StyledText>
                                    <br />
                                    <b>Learning to walk</b>
                                    <br /> <br />
                                    <div>
                                        <b>
                                            Key skills most babies have at this
                                            stage:
                                        </b>
                                        <li>Pulls self to stand</li>
                                        <li>Stands alone</li>
                                        <li>Takes early steps</li>
                                        <li>Feeds self easily with fingers</li>
                                        <li>Can drink from a straw</li>
                                        <li>
                                            Can hold cup with two hands and take
                                            swallows
                                        </li>
                                        <li>More skillful at chewing</li>
                                        <li>
                                            Dips spoon in food rather than
                                            scooping
                                        </li>
                                        <li>Demands to spoon-feed self</li>
                                        <li>
                                            Bites through a variety of textures
                                        </li>
                                    </div>
                                    <br />
                                    <div>
                                        <b>
                                            Feeding cues many babies use at this
                                            stage:
                                        </b>
                                        <li>
                                            Expresses desire for specific foods
                                            with words or sounds
                                        </li>
                                        <li>
                                            Shakes head to say "no more" when
                                            full
                                        </li>
                                    </div>
                                    <br />
                                    <div>
                                        <b>
                                            Healthy and appropriate foods and
                                            textures:
                                        </b>
                                        <li>
                                            Breastmilk, infant formula or whole
                                            milk
                                        </li>
                                        <li>100% Juice</li>
                                        <li>
                                            Coarsely choppped foods, including
                                            foods with noticeable pieces
                                        </li>
                                        <li>
                                            Foods with soft to moderate texture
                                        </li>
                                        <li>Toddler foods</li>
                                        <li>Bite-sized pieces of foods</li>
                                        <li>
                                            Bites through a variety of textures
                                        </li>
                                    </div>
                                    <br />
                                </StyledText>
                            </div>
                        ),
                    }[stage]
                }

                <Link prefetch href="/quiz">
                    <StyledButton color="primary" variant="raised">
                        <a>Practice with a quiz</a>
                    </StyledButton>
                </Link>
            </Container>
        );
    }
}

export default BabySummary;
