import * as React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import getPageContext from './getPageContext';

export default () => Component => {
    class WithRoot extends React.Component {
        constructor(props, context) {
            super(props, context);

            this.pageContext =
                (this as any).props.pageContext || getPageContext();
        }

        componentDidMount() {
            // Remove the server-side injected CSS.
            const jssStyles = document.querySelector('#jss-server-side');
            if (jssStyles && jssStyles.parentNode) {
                jssStyles.parentNode.removeChild(jssStyles);
            }
        }

        pageContext = null;

        render() {
            // MuiThemeProvider makes the theme available down the React tree thanks to React context.
            return (
                <MuiThemeProvider
                    theme={this.pageContext.theme}
                    sheetsManager={this.pageContext.sheetsManager}
                >
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...this.props} />
                </MuiThemeProvider>
            );
        }
    }

    (WithRoot as any).getInitialProps = ctx => {
        if (Component.getInitialProps) {
            return Component.getInitialProps(ctx);
        }

        return {};
    };

    return WithRoot;
};
