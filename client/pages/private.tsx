import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import fetch from 'isomorphic-unfetch';
import Button from 'material-ui/Button';
import withRedux from 'next-redux-wrapper';
import getConfig from 'next/config';
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { compose } from 'redux';

import Head from '../components/Head';
import Nav from '../components/Nav';
import { initStore } from '../store';
import withAuth, { ADMIN } from '../utils/auth/withAuth';
import withRoot from '../utils/material-ui/withRoot';

export interface Props {
    user: { isLoggedIn: string; groups: string[] };
    text: string;
    guid: string;
}

const { publicRuntimeConfig } = getConfig();

class Private extends React.Component<Props, {}> {
    static async getInitialProps({ req }): Promise<any> {
        try {
            const res: any = await fetch(
                `${
                    publicRuntimeConfig.API_HOST
                }/content?contentLocation=private`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        // If server rendered, cookies must manually be passed in
                        Cookie: req ? req.headers.cookie : undefined,
                    },
                    credentials: 'include',
                },
            );
            const json: any = await res.json();

            return {
                text: json.data.private.text,
                guid: json.data.private.guid,
            };
        } catch (err) {
            return {
                text: '',
            };
        }
    }

    state = {
        private: {
            text: EditorState.createEmpty(),
            // A flag to make sure the editor doesn't render too early
            shouldRender: false,
            shouldReadOnly: true,
            guid: '',
        },
    };

    onEditorStateChange = text => {
        this.setState({
            private: { ...this.state.private, text },
        });
    };

    saveContent = async content => {
        // TODO: save the content
        const convertedContent = convertToRaw(content.getCurrentContent());

        const contentToSend = {
            content: {
                text: convertedContent,
            },
        };

        // const contentToSend = {
        //     content: {
        //         text: convertedContent,
        //     },
        // };

        const url = `${publicRuntimeConfig.API_HOST}/content/${
            this.state.private.guid
        }`;

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

    handleClick = e => {
        e.preventDefault();

        if (!this.state.private.shouldReadOnly) {
            this.saveContent(this.state.private.text);
        }
        this.setState({
            private: {
                ...this.state.private,
                shouldReadOnly: !this.state.private.shouldReadOnly,
            },
        });
    };

    componentDidMount() {
        try {
            const content = this.props.text;
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
                private: {
                    ...this.state.private,
                    shouldRender: true,
                    text: contentToUse,
                    guid: this.props.guid,
                },
            });
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.log(err);
        }
    }

    render() {
        const { shouldRender, shouldReadOnly, text } = this.state.private;

        return (
            <div>
                <Head title="private" />
                <Nav />
                <h1>Hello!</h1>
                <p>This content is available for logged in users only.</p>

                {shouldRender ? (
                    // TODO: Split this out into its own component
                    // Component mounted so render the Editors
                    shouldReadOnly ? (
                        // Essentially render just the values
                        <Editor
                            editorState={text}
                            onEditorStateChange={this.onEditorStateChange}
                            readOnly={true}
                            toolbarHidden
                        />
                    ) : (
                        // Render the actual WYSIWYG functionality
                        <Editor
                            editorState={text}
                            onEditorStateChange={this.onEditorStateChange}
                        />
                    )
                ) : (
                    // Component hasn't mounted yet so show loading
                    <div>Loading...</div>
                )}

                {shouldReadOnly ? (
                    <Button color="primary" onClick={this.handleClick}>
                        Edit
                    </Button>
                ) : (
                    <Button color="primary" onClick={this.handleClick}>
                        Save
                    </Button>
                )}
            </div>
        );
    }
}

export default compose(withRoot(), withRedux(initStore), withAuth([ADMIN]))(
    Private,
);
