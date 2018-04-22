import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import Table, {
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
} from 'material-ui/Table';
import * as React from 'react';
import styled from 'styled-components';

import theme from '../../utils//styles/mui-theme';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

const StyledPaper = styled(Paper)`
    && {
        width: 100%;
        margin-top: ${theme.spacing.unit * 3};
    }
`;

const TableWrapper = styled.div`
    overflow-x: auto;
`;

const StyledTable = styled(Table)`
    && {
        min-width: 1020;
    }
`;

let counter = 0;
function createData(name, timesEaten, calories, fat, carbs, protein) {
    counter += 1;
    return { id: counter, name, timesEaten, calories, fat, carbs, protein };
}

export interface EnhancedTableState {
    order: any;
    orderBy: string;
    selected: any[];
    data: any[];
    page: number;
    rowsPerPage: number;
}

class EnhancedTable extends React.Component<{}, EnhancedTableState> {
    state = {
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        data: [
            createData('Cupcake', 2, 305, 3.7, 67, 4.3),
            createData('Donut', 5, 452, 25.0, 51, 4.9),
            createData('Eclair', 7, 262, 16.0, 24, 6.0),
            createData('Frozen yoghurt', 3, 159, 6.0, 24, 4.0),
            createData('Gingerbread', 7, 356, 16.0, 49, 3.9),
            createData('Honeycomb', 9, 408, 3.2, 87, 6.5),
            createData('Ice cream sandwich', 1, 237, 9.0, 37, 4.3),
            createData('Jelly Bean', 10, 375, 0.0, 94, 0.0),
            createData('KitKat', 15, 518, 26.0, 65, 7.0),
            createData('Lollipop', 4, 392, 0.2, 98, 0.0),
            createData('Marshmallow', 6, 318, 0, 81, 2.0),
            createData('Nougat', 9, 360, 19.0, 9, 37.0),
            createData('Oreo', 12, 437, 18.0, 63, 4.0),
        ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
        page: 0,
        rowsPerPage: 5,
    };

    handleRequestSort = (_e, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort(
                      (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1),
                  )
                : this.state.data.sort(
                      (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1),
                  );

        this.setState({ data, order, orderBy });
    };

    handleSelectAllClick = (_e, checked) => {
        if (checked) {
            this.setState({ selected: this.state.data.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (_e, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (_e, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {
            data,
            order,
            orderBy,
            selected,
            rowsPerPage,
            page,
        } = this.state;
        const emptyRows =
            rowsPerPage -
            Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <StyledPaper>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableWrapper>
                    <StyledTable>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {data
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage,
                                )
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event =>
                                                this.handleClick(event, n.id)
                                            }
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isSelected}
                                                />
                                            </TableCell>
                                            <TableCell padding="none">
                                                {n.name}
                                            </TableCell>
                                            <TableCell numeric>
                                                {n.calories}
                                            </TableCell>
                                            <TableCell numeric>
                                                {n.timesEaten}
                                            </TableCell>
                                            <TableCell numeric>
                                                {n.fat}
                                            </TableCell>
                                            <TableCell numeric>
                                                {n.carbs}
                                            </TableCell>
                                            <TableCell numeric>
                                                {n.protein}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </StyledTable>
                </TableWrapper>
                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </StyledPaper>
        );
    }
}

export default EnhancedTable;
