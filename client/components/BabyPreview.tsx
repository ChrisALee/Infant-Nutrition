import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import styled from 'styled-components';

const BabyContainer = styled(Grid)`
    && {
    }
`;

const stages = [
    { type: 'Newborn', age: '0-1 month', id: 0 },
    { type: 'Pushing up', age: '1-4 months', id: 1 },
    { type: 'Learning to sit', age: '4-7 months', id: 2 },
    { type: 'Learning to crawl', age: '7-9 months', id: 3 },
    { type: 'Learning to walk', age: '9-12 months', id: 4 },
];

export interface BabyPreviewProps {
    handleClick: (e: any) => any;
}

class BabyPreview extends React.PureComponent<BabyPreviewProps, {}> {
    handleClick = e => {
        const value = e.target.id;
        this.props.handleClick(value);
    };

    render() {
        return (
            <BabyContainer container>
                {stages.map(stage => (
                    <Grid item xs={12} md key={stage.type}>
                        <a href={`#${stage.id}`}>
                            <Button
                                onClick={this.handleClick}
                                id={`${stage.id}`}
                            >
                                <Card>
                                    <CardContent>
                                        <Typography component="h2" gutterBottom>
                                            {stage.type}
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            gutterBottom
                                        >
                                            {stage.age}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Button>
                        </a>
                    </Grid>
                ))}
            </BabyContainer>
        );
    }
}

export default BabyPreview;
