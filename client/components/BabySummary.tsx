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
                                <StyledText>Newborn</StyledText>
                            </div>
                        ),
                        1: (
                            <div id="1">
                                <StyledText>Pushing up</StyledText>
                            </div>
                        ),
                        2: (
                            <div id="2">
                                <StyledText>Learning to sit</StyledText>
                            </div>
                        ),
                        3: (
                            <div id="3">
                                <StyledText>Learning to crawl</StyledText>
                            </div>
                        ),
                        4: (
                            <div id="4">
                                <StyledText>Learning to walk</StyledText>
                            </div>
                        ),
                    }[stage]
                }
                <Link prefetch href="/quiz">
                    <Button color="primary" variant="raised">
                        <a>Practice with a quiz</a>
                    </Button>
                </Link>
            </Container>
        );
    }
}

export default BabySummary;
