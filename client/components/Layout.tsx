import * as React from 'react';
import styled from 'styled-components';

import Head from '../components/Head';
import Nav from '../components/Nav';

const Container = styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    line-height: 1.15px;
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
