/* eslint-disabled @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  FormControl,
  IconButton,
  TextField,
  FormHelperText,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Layout from '@layout/index';
import AppLayout from '@components/AppLayout';
import Section from '@components/Section';
import Menu from '@components/Menu';
import History from '@components/History';

const AmountInput = styled(TextField)(() => {
  return {
    '& input': {
      paddingLeft: '30px',
    },
    '& fieldset': {
      borderRadius: '30px',
    },
  };
});

export default function Page(): JSX.Element {
  // TODO: dummy data
  // const address = ['0x48q359...E488d19', '0x49q359...E488d19', '0x50q359...E488d19'];
  const token = ['Evmos']; // ['ethereum', 'evmos', 'cosmos'];
  const [address, setAddress] = useState<string[]>(['']);
  const [disabled, setDisable] = useState<boolean>(true);
  // const [data, setData] = useState('');
  // console.log('length - ', address);

  useEffect(() => {
    const connect = async (): Promise<void> => {
      try {
        console.log('try');
        const welldone = (window as any).welldone;
        // TODO: injection 안됨
        console.log('welldone', welldone);
        if (welldone) {
          console.log('welldone true');
          // await welldone.connectWallet();
          const temp = await welldone.getAccount('evmos');
          setAddress([temp.address]);
          setDisable(false);
          console.log('temp - ', temp);
        }
      } catch (error) {
        console.log(error);
      }
      // console.log('account - ', address);

      // TODO: 이더리움과 비교
      if ((window as any).ethereum) {
        // console.log((window as any).ethereum);
      }
    };
    const init = async (): Promise<void> => {
      await connect();
    };
    init();
    // setTimeout(()=>{init()}, 1000);
    // setInterval(()=>{init()}, 500);
  }, []);

  return (
    <AppLayout
      layout={Layout}
      component={(): JSX.Element => {
        const balance = 17; // TODO
        return (
          <>
            <Section>
              <Grid container spacing={15}>
                <Grid
                  container
                  item
                  textAlign="center"
                  direction="row"
                  justifyContent="space-between"
                  spacing={3}
                >
                  <Grid container item xs={5} md={4} spacing={3}>
                    <Grid item xs={12}>
                      <Typography>From</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Menu data={address} disabled={disabled} label={'Select Network'} />
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
                      <IconButton size="large" disabled={disabled}>
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
                      <Menu data={address} disabled={disabled} label={'Select Network'} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} container textAlign="center" direction="row">
                  <FormControl fullWidth variant="filled" disabled={disabled}>
                    <AmountInput
                      style={{ borderRadius: '27px' }}
                      disabled={disabled}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ width: '400px', marginLeft: '-14px' }}
                          >
                            <Menu data={token} disabled={disabled} label={'Select Token (ERC20)'} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton color="warning" size="large" disabled={disabled}>
                              <ArrowForwardIosIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormHelperText>
                      {' '}
                      <Grid
                        xs={12}
                        container
                        textAlign="center"
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Grid item xs={6} textAlign="start">
                          <Typography variant="caption">MAX amount: {balance} Photon</Typography>
                        </Grid>
                        <Grid item xs={6} textAlign="end">
                          <Typography variant="caption">Tx Fee: 0.04 Photon</Typography>
                        </Grid>
                      </Grid>
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Section>

            <Section>
              <History />
            </Section>
          </>
        );
      }}
    />
  );
}
