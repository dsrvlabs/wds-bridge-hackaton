import React from 'react';
import { styled } from '@mui/material/styles';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Card,
  Chip,
  Grid,
  Avatar,
} from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Data } from './types';

const StyledAvatar = styled(Avatar)(({ theme }) => {
  return {
    width: theme.spacing(3),
    height: theme.spacing(3),
  };
});

const StyledCard = styled(Card)(() => {
  return {
    backgroundColor: 'rgba(73, 75, 82, 0.1)',
    position: 'relative',
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    align: 'center',
    fontWeight: 400,
    fontSize: 20,
    marginTop: theme.spacing(3),
  };
});

const Done = styled(Chip)(({ theme }) => {
  return {
    backgroundColor: theme.palette.success.main,
    height: 17,
  };
});

const Pending = styled(Chip)(({ theme }) => {
  return {
    backgroundColor: theme.palette.error.main,
    height: 17,
    color: '#000',
  };
});

const stableSort = <T,>(array: T[]): T[] => {
  const stabilizedThis = array.map((el, index) => {
    return [el, index] as [T, number];
  });
  stabilizedThis.sort((a, b) => {
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => {
    return el[0];
  });
};

export default function History(): JSX.Element {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // TODO: dummy data
  const stakes: Data[] = [];

  const getRows = (): Data[] => {
    const data: Data[] = [];
    for (let i = 0; i < stakes.length; i += 1) {
      data.push({
        id: i,
        time: stakes[i].time,
        from: stakes[i].from,
        to: stakes[i].to,
        amount: stakes[i].amount,
      });
    }
    return data;
  };

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, stakes.length - page * rowsPerPage);

  return (
    <>
      <StyledCard variant="outlined">
        <Grid item xs={12} textAlign="center">
          <Title>Previous transaction</Title>
        </Grid>
        <TablePagination
          rowsPerPageOptions={[3, 5, 7]}
          component="div"
          count={stakes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <TableContainer>
          <Table>
            <TableBody>
              {stableSort(getRows())
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-staking-${index}`;
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.id ? <Done label="done" /> : <Pending label="pending" />}
                      </TableCell>
                      <TableCell align="left">
                        <Typography>{row.time}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Grid container direction="row">
                          <StyledAvatar src={`${row.from}.png`} />
                          <ArrowRightAltIcon />
                          <StyledAvatar src={`${row.to}.png`} />
                        </Grid>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontSize={25} fontWeight={600}>
                          {row.amount}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography>CELO</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IosShareIcon />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledCard>
    </>
  );
}
