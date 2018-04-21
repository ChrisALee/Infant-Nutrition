import * as React from 'react';
import styled from 'styled-components';

import Head from '../components/Head';
import Nav from '../components/Nav';

const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #ffffff;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    box-sizing: border-box;
    line-height: 1.15px;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: rgb(218, 225, 233);
`;

export interface LayoutProps {
    title?: string;
    children?: any;
}

class Layout extends React.PureComponent<LayoutProps, {}> {
    render() {
        const { title, children } = this.props;

        return (
            <Container>
                <Head title={title} />
                <Nav />
                {children}
            </Container>
        );
    }
}

export default Layout;
