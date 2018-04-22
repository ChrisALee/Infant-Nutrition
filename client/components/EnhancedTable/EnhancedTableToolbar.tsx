import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from 'material-ui/IconButton';
import { lighten } from 'material-ui/styles/colorManipulator';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import styled from 'styled-components';

import theme from '../../utils//styles/mui-theme';

const StyledToolbar = styled(Toolbar)`
    && {
        padding-right: 5px;
        color: ${theme.palette.secondary.main};
        background-color: ${lighten(theme.palette.secondary.light, 0.85)};
    }
`;

const TitleContainer = styled.div`
    flex: 0 0 auto;
`;

const Spacer = styled.div`
    flex: 1 1 100%;
`;

const Actions = styled.div`
    color: ${theme.palette.text.secondary};
`;

export interface EnhancedTableToolbarProps {
    numSelected: number;
}

class EnhancedTableToolbar extends React.PureComponent<
    EnhancedTableToolbarProps,
    {}
> {
    render() {
        const { numSelected } = this.props;

        return (
            <StyledToolbar>
                <TitleContainer>
                    {numSelected > 0 ? (
                        <Typography color="primary" variant="subheading">
                            {numSelected} selected
                        </Typography>
                    ) : (
                        <Typography variant="title">Nutrition</Typography>
                    )}
                </TitleContainer>
                <Spacer />
                <Actions>
                    {numSelected > 0 ? (
                        <Tooltip title="Delete">
                            <IconButton aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Filter list">
                            <IconButton aria-label="Filter list">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Actions>
            </StyledToolbar>
        );
    }
}

export default EnhancedTableToolbar;
