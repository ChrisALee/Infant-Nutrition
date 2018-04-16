import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import * as React from 'react';

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
            <div>
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
                                <Typography>Newborn</Typography>
                            </div>
                        ),
                        1: (
                            <div id="1">
                                <Typography>Pushing up</Typography>
                            </div>
                        ),
                        2: (
                            <div id="2">
                                <Typography>Learning to sit</Typography>
                            </div>
                        ),
                        3: (
                            <div id="3">
                                <Typography>Learning to crawl</Typography>
                            </div>
                        ),
                        4: (
                            <div id="4">
                                <Typography>Learning to walk</Typography>
                            </div>
                        ),
                    }[stage]
                }
                <Button>Take our quiz</Button>
            </div>
        );
    }
}

export default BabySummary;
