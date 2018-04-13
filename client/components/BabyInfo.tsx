import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { Typography } from 'material-ui';
import * as React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import Button from 'material-ui/Button';

export interface BabyInfoState {
    editorState: any;
    shouldReadOnly: boolean;
}

export interface BabyInfoProps {
    key: any;
    content: any;
    babyInfo?: {
        text: any;
    };
    editable?: boolean;
}

class BabyInfo extends React.Component<BabyInfoProps, BabyInfoState> {
    state = {
        editorState: EditorState.createEmpty(),
        shouldReadOnly: true,
    };

    saveContent = async content => {
        const convertedContent = convertToRaw(content.getCurrentContent());

        const contentToSend = {
            content: {
                text: convertedContent,
            },
        };

        const url = this.props.content.links.self;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(contentToSend),
            });

            if (response.status === 200) {
                // TODO: Redux possibly?
            }
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.log(err);
        }
    };

    updateText = editorState => {
        this.setState({
            editorState,
        });
    };

    toggleEditor = () => {
        if (!this.state.shouldReadOnly) {
            this.saveContent(this.state.editorState);
        }

        this.setState({
            shouldReadOnly: !this.state.shouldReadOnly,
        });
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
                editorState: contentToUse,
            });
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.log(err);
        }
    }

    render() {
        const { editorState, shouldReadOnly } = this.state;
        const { editable } = this.props;

        return (
            <div>
                {this.state && editorState ? (
                    // Component mounted so render the Editors
                    shouldReadOnly ? (
                        // Essentially render just the values
                        <Typography component="h2" gutterBottom>
                            <Editor
                                editorState={editorState}
                                readOnly={true}
                                toolbarHidden
                            />
                        </Typography>
                    ) : (
                        // Render the actual WYSIWYG functionality
                        <Typography component="h2" gutterBottom>
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={this.updateText}
                            />
                        </Typography>
                    )
                ) : (
                    // Component hasn't mounted yet so show loading
                    <div>Loading...</div>
                )}

                {editable ? (
                    shouldReadOnly ? (
                        <Button color="primary" onClick={this.toggleEditor}>
                            Edit
                        </Button>
                    ) : (
                        <Button color="primary" onClick={this.toggleEditor}>
                            Save
                        </Button>
                    )
                ) : (
                    <div />
                )}
            </div>
        );
    }
}

export default BabyInfo;
