import { injectGlobal } from 'styled-components';

/* tslint:disable no-unused-expression */
const injectGlobalStyles = () => {
    injectGlobal`
        body {
            width: 100%;
            height: 100%;
            background-color: #FAFAFA;
            box-sizing: border-box;
            margin: 0;
        }
        html {
            width: 100%;
            height: 100%;
        }
    `;
};

export default injectGlobalStyles;
