import * as React from 'react';
import styled from 'styled-components';

import Head from '../components/Head';
import Nav from '../components/Nav';

const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #ffffff;
`;

const PaddedDiv = styled.div`
    padding-bottom: 60px;
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
                <PaddedDiv />
                {children}
                <footer>Footer</footer>
            </Container>
        );
    }
}

export default Layout;
