/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Layout from '@layout/index';
import AppLayout from '@components/AppLayout';
import Section from '@components/Section';
import Menu from '@components/Menu';
import History from '@components/History';

const StyledAvatar = styled(Avatar)(({ theme }) => {
  return {
    width: theme.spacing(30),
    height: theme.spacing(3),
  };
});

const SwitchIcon = styled(Avatar)(({ theme }) => {
  return {
    width: theme.spacing(3),
    height: theme.spacing(3),
  };
});

const AmountBox = styled(Box)(({ theme }) => {
  return {
    borderRadius: theme.spacing(5),
    backgroundColor: 'rgba(73, 75, 82, 0.1)',
    height: theme.spacing(7),
    fontSize: 20,
  };
});

export default function Page(): JSX.Element {
  // TODO: dummy data
  // const address = ['0x48q359...E488d19', '0x49q359...E488d19', '0x50q359...E488d19'];
  const token = ['Evmos']; // ['ethereum', 'evmos', 'cosmos'];
  const [address, setAddress] = useState<string[]>(['']);
  const [disable, setDisable] = useState<boolean>(true);
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
              <Grid item xs={12}>
                <Grid container textAlign="center" direction="row" justifyContent="space-between">
                  <Grid item xs={4} marginBottom={2}>
                    <Typography>From</Typography>
                  </Grid>
                  <SwitchIcon src={'switch.png'} />
                  <Grid item xs={4}>
                    <Typography>To</Typography>
                  </Grid>
                </Grid>
                <Grid container textAlign="center" direction="row" justifyContent="space-between">
                  <Grid item xs={4}>
                    <Menu data={address} disable={disable} />
                  </Grid>
                  <StyledAvatar src={'vector.png'} />
                  <Grid item xs={4}>
                    <Menu data={address} disable={disable} />
                  </Grid>
                </Grid>
                <Grid item xs={12} container textAlign="center" direction="row" marginTop={20}>
                  <Grid item xs={4} zIndex={1}>
                    <Menu data={token} disable={disable} />
                  </Grid>
                  <Grid item xs={8} zIndex={999}>
                    <AmountBox>amount here</AmountBox>
                  </Grid>
                </Grid>
                <Grid
                  xs={12}
                  container
                  textAlign="center"
                  direction="row"
                  justifyContent="space-between"
                  marginTop={2}
                >
                  <Grid item xs={2}>
                    <Typography>MAX amount: {balance} Photon</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>Tx Fee: 0.04 Photon</Typography>
                  </Grid>
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
