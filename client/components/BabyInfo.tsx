import { convertFromRaw, EditorState } from 'draft-js';
import * as React from 'react';
import { Editor } from 'react-draft-wysiwyg';

export interface BabyInfoState {
    babyInfo: {
        text: any;
    };
}

export interface BabyInfoProps {
    id: string;
    key: string;
    content: any;
}

class BabyInfo extends React.Component<BabyInfoProps, BabyInfoState> {
    state = {
        babyInfo: {
            text: EditorState.createEmpty(),
        },
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
        return (
            <div>
                {this.state && this.state.babyInfo ? (
                    <Editor
                        editorState={this.state.babyInfo.text}
                        readOnly={true}
                        toolbarHidden
                    />
                ) : (
                    // Component hasn't mounted yet so show loading
                    <div>Loading...</div>
                )}
            </div>
        );
    }
}

export default BabyInfo;
