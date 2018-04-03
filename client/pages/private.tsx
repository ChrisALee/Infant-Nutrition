import withRedux from 'next-redux-wrapper';
import React from 'react';
import { compose } from 'redux';

import Head from '../components/Head';
import Nav from '../components/Nav';
import { initStore } from '../store';
import withAuth from '../utils/auth/withAuth';
import withRoot from '../utils/material-ui/withRoot';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
import Button from 'material-ui/Button';

export interface Props {
    user: { isLoggedIn: string };
}

class Private extends React.Component<Props, {}> {
    state = {
        editorState: EditorState.createWithContent(emptyContentState),
        // A flag to make sure the editor doesn't render too early
        editorRender: false,
        editorReadOnly: true,
    };

    onEditorStateChange: Function = editorState => {
        this.setState({
            editorState,
        });
    };

    handleClick = e => {
        this.setState({
            editorReadOnly: !this.state.editorReadOnly,
        });
    };

    componentDidMount() {
        this.setState({
            editorRender: true,
        });
    }

    render() {
        const { user } = this.props;
        const { editorRender, editorReadOnly, editorState } = this.state;
        return (
            <div>
                <Head title="private" />
                <Nav user={user} />
                <h1>Hello!</h1>
                <p>This content is available for logged in users only.</p>

                {editorRender ? (
                    // TODO: Split this out into its own component
                    // Component mounted so render the Editors
                    editorReadOnly ? (
                        // Essentially render just the values
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={this.onEditorStateChange}
                            readOnly={true}
                            toolbarHidden
                        />
                    ) : (
                        // Render the actual WYSIWYG functionality
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={this.onEditorStateChange}
                        />
                    )
                ) : (
                    // Component hasn't mounted yet so show loading
                    <div>Loading...</div>
                )}
                <Button color="primary" onClick={this.handleClick}>
                    Edit
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default compose(
    withRoot(),
    withRedux(initStore, mapStateToProps),
    withAuth(),
)(Private);

const emptyContentState = convertFromRaw({
    entityMap: {},
    blocks: [
        {
            text: '',
            key: 'foo',
            type: 'unstyled',
            entityRanges: [],
        },
    ],
});
