import { injectGlobal } from 'styled-components';

/* tslint:disable no-unused-expression */
const injectGlobalStyles = () => {
    injectGlobal`
    body {
      background-color: #FAFAFA;
    }
  `;
};

export default injectGlobalStyles;
