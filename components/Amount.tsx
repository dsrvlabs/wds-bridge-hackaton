import React from 'react';
import { Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const AmountBox = styled(Box)(({ theme }) => {
  return {
    borderRadius: theme.spacing(5),
    backgroundColor: 'rgba(73, 75, 82, 0.1)',
    width: 800,
    height: theme.spacing(7),
  };
});

export default function Menu(): JSX.Element {
  return (
    <Grid item xs={5} direction="row">
      <AmountBox>amount here</AmountBox>
    </Grid>
  );
}
