import { convertFromRaw, EditorState } from 'draft-js';
import Button from 'material-ui/Button';
import { CardActions, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import styled from 'styled-components';

import theme from '../utils//styles/mui-theme';

const BabyPanel = styled.div`
    border: 1.2px solid ${theme.palette.common.white};
    background-color: #fafafa;
    padding: 3px 2px;
    width: 100%;
`;

export interface BabySummaryState {
    babyInfo: {
        text: any;
    };
    spacing: string;
}

export interface BabySummaryProps {
    key: string;
    content: any;
    handleClick: (e: any) => void;
}

class BabySummary extends React.Component<BabySummaryProps, BabySummaryState> {
    state = {
        babyInfo: {
            text: EditorState.createEmpty(),
        },
        spacing: '16',
    };

    componentDidMount() {
        try {
            const content = this.props.content.text;
            let contentToUse;

            // We only want to try to parse the content if it exists
            try {
                contentToUse = EditorState.createWithContent(
                    convertFromRaw(JSON.parse(content)),
                );
            } catch (err) {
                contentToUse = EditorState.createEmpty();
            }

            this.setState({
                babyInfo: {
                    text: contentToUse,
                },
            });
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.log(err);
        }
    }

    render() {
        const { handleClick, content } = this.props;
        return (
            <div>
                {this.state && this.state.babyInfo ? (
                    <Grid item xs={12}>
                        <BabyPanel>
                            <CardContent>
                                <Typography component="h2" gutterBottom>
                                    {/* <Editor
                                        editorState={this.state.babyInfo.text}
                                        readOnly={true}
                                        toolbarHidden
                                    /> */}
                                    {content.contentType}
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    0-1 month
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    id={content.contentType}
                                    onClick={handleClick}
                                    color="primary"
                                >
                                    Learn More
                                </Button>
                            </CardActions>
                        </BabyPanel>
                    </Grid>
                ) : (
                    // Component hasn't mounted yet so show loading
                    <div>Loading...</div>
                )}
            </div>
        );
    }
}

export default BabySummary;
