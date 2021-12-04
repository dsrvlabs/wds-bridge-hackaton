import React from 'react';
import { Grid, Typography, IconButton } from '@mui/material';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import MenuAccount, { Account } from '@components/Menu/account';

interface Props {
  disabled: boolean;
  accounts: Account[];
  pair: (Account | null)[];
  updatePair: (pair: (Account | null)[]) => void;
}

export default function Bridge({ disabled, accounts, pair, updatePair }: Props): JSX.Element {
  return (
    <>
      <Grid container item xs={5} md={4} spacing={3}>
        <Grid item xs={12}>
          <Typography>From</Typography>
        </Grid>
        <Grid item xs={12}>
          <MenuAccount
            account={pair[0]}
            accounts={accounts}
            disabled={disabled}
            label={'Select Network'}
            onSelectAccount={(account): void => {
              if (
                pair[1] &&
                account.network === pair[1].network &&
                account.address === pair[1].address
              ) {
                updatePair([account, pair[0]]);
              } else {
                updatePair([account, pair[1]]);
              }
            }}
          />
        </Grid>
      </Grid>

      <Grid
        container
        item
        xs={2}
        md={4}
        spacing={3}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <IconButton
            size="large"
            disabled={disabled}
            onClick={(): void => {
              updatePair([pair[1], pair[0]]);
            }}
          >
            <SwapHorizontalCircleIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <TrendingFlatIcon />
        </Grid>
      </Grid>

      <Grid container item xs={5} md={4} spacing={3}>
        <Grid item xs={12}>
          <Typography>To</Typography>
        </Grid>
        <Grid item xs={12}>
          <MenuAccount
            account={pair[1]}
            accounts={accounts}
            disabled={disabled}
            label={'Select Network'}
            onSelectAccount={(account): void => {
              if (
                pair[0] &&
                account.network === pair[0].network &&
                account.address === pair[0].address
              ) {
                updatePair([pair[1], account]);
              } else {
                updatePair([pair[0], account]);
              }
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
