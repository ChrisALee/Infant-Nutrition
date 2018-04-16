import NextHead from 'next/head';
import * as React from 'react';
import styled from 'styled-components';

const PaddedHead = styled(NextHead)`
    padding-bottom: 30px;
`;

export interface HeadProps {
    title?: string;
    description?: string;
    url?: string;
    ogImage?: string;
}

class Head extends React.PureComponent<HeadProps, {}> {
    public static defaultProps: Partial<HeadProps> = {
        title: '',
        description: '',
        url: '',
        ogImage: '',
    };

    render() {
        const { title, description, url, ogImage } = this.props;
        return (
            <PaddedHead>
                <meta charSet="UTF-8" />
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/static/favicon.ico" />
                <link rel="stylesheet" href="/static/react-draft-wysiwyg.css" />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta name="twitter:site" content={url} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content={ogImage} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
            </PaddedHead>
        );
    }
}

export default Head;
