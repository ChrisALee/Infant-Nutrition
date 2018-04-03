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

export interface Props {
    user: { isLoggedIn: string };
}

class Private extends React.Component<Props, {}> {
    state = {
        editorState: EditorState.createWithContent(emptyContentState),
        // A flag to make sure the editor doesn't render too early
        editor: false,
    };

    onEditorStateChange: Function = editorState => {
        this.setState({
            editorState,
        });
    };

    componentDidMount() {
        this.setState({
            editor: true,
        });
    }

    render() {
        const { user } = this.props;
        const { editor, editorState } = this.state;
        return (
            <div>
                <Head title="private" />
                <Nav user={user} />
                <h1>Hello!</h1>
                <p>This content is available for logged in users only.</p>
                {editor ? (
                    <Editor
                        editorKey="editor"
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                    />
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

export default compose(
    withRoot(),
    withRedux(initStore, mapStateToProps),
    withAuth(),
)(Private);

const initialData = {
    blocks: [
        {
            key: '16d0k',
            text: 'You can edit this text.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 0, length: 23, style: 'BOLD' }],
            entityRanges: [],
            data: {},
        },
        {
            key: '98peq',
            text: '',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
        },
        {
            key: 'ecmnc',
            text:
                'Luke Skywalker has vanished. In his absence, the sinister FIRST ORDER has risen from the ashes of the Empire and will not rest until Skywalker, the last Jedi, has been destroyed.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [
                { offset: 0, length: 14, style: 'BOLD' },
                { offset: 133, length: 9, style: 'BOLD' },
            ],
            entityRanges: [],
            data: {},
        },
        {
            key: 'fe2gn',
            text: '',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
        },
        {
            key: '4481k',
            text:
                'With the support of the REPUBLIC, General Leia Organa leads a brave RESISTANCE. She is desperate to find her brother Luke and gain his help in restoring peace and justice to the galaxy.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [
                { offset: 34, length: 19, style: 'BOLD' },
                { offset: 117, length: 4, style: 'BOLD' },
                { offset: 68, length: 10, style: 'ANYCUSTOMSTYLE' },
            ],
            entityRanges: [],
            data: {},
        },
    ],
    entityMap: {},
};

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
