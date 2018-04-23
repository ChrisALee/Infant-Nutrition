import * as React from 'react';
import styled from 'styled-components';

import Head from '../components/Head';
import Nav from '../components/Nav';
import theme from '../utils//styles/mui-theme';

const Container = styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-shrink: 0;
    flex-direction: column;
    background-color: ${(props: any) =>
        props.primary ? theme.palette.primary.main : '#FAFAFA'};
` as any;

export interface LayoutProps {
    title?: string;
    children?: any;
    primary?: boolean;
}

class Layout extends React.PureComponent<LayoutProps, {}> {
    render() {
        const { title, children, primary } = this.props;

        return (
            <Container primary={primary}>
                <Head title={title} />
                <Nav />
                {children}
            </Container>
        );
    }
}

export default Layout;
