import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { ServerStyleSheet } from 'styled-components';
import flush from 'styled-jsx/server';

import getPageContext from '../utils/material-ui/getPageContext';
import injectGlobalStyles from '../utils/styles/global-styles';

injectGlobalStyles();

const withJssProvider = (App, pageContext, props) => (
    <JssProvider
        registry={pageContext.sheetsRegistry}
        generateClassName={pageContext.generateClassName}
    >
        <App pageContext={pageContext} {...props} />
    </JssProvider>
);

export default class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        // Resolution order
        //
        // On the server:
        // 1. page.getInitialProps
        // 2. document.getInitialProps
        // 3. page.render
        // 4. document.render
        //
        // On the server with error:
        // 2. document.getInitialProps
        // 3. page.render
        // 4. document.render
        //
        // On the client
        // 1. page.getInitialProps
        // 3. page.render

        // Get the context of the page to collected side effects.
        const sheet = new ServerStyleSheet(); // for styled-components
        const pageContext = getPageContext(); // for material-ui

        // create the wrapped page object
        const page = renderPage(App => props => {
            const WrappedApp = withJssProvider(App, pageContext, props); // for material-ui
            sheet.collectStyles(WrappedApp); // for styled-components
            return WrappedApp;
        });

        // return styleTags for styled-components and pageContext and styles for material-ui
        return {
            ...page,
            styleTags: sheet.getStyleElement(),
            pageContext,
            styles: (
                <React.Fragment>
                    <style
                        id="jss-server-side"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                            __html: pageContext.sheetsRegistry.toString(),
                        }}
                    />
                    {flush() || null}
                </React.Fragment>
            ),
        };
    }

    render() {
        return (
            <html>
                <Head>
                    <title>My page</title>
                    {this.props.styleTags}
                    <meta charSet="utf-8" />
                    {/* Use minimum-scale=1 to enable GPU rasterization */}
                    <meta
                        name="viewport"
                        content={
                            'user-scalable=0, initial-scale=1, ' +
                            'minimum-scale=1, width=device-width, height=device-height'
                        }
                    />
                    {/* PWA primary color */}
                    <meta
                        name="theme-color"
                        content={
                            this.props.pageContext.theme.palette.primary.main
                        }
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Arima+Madurai|Berkshire+Swash|Pacifico"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
