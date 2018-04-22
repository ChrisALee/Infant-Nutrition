import { injectGlobal } from 'styled-components';

/* tslint:disable no-unused-expression */
const injectGlobalStyles = () => {
    injectGlobal`
        body, html {
            width: 100%;
            height: 100%;
            background-color: #FAFAFA;
            margin: 0;
        }

        #__next {
            display: flex;
            flex: 1 1 auto;
            flex-direction: column;
            line-height: 1.15px;
            height: 100%;
        }
    `;
};

export default injectGlobalStyles;
