/* eslint-disable no-nested-ternary */
import React, { useState, useRef } from 'react';
import {
  Box,
  Grid,
  FormControl,
  IconButton,
  TextField,
  FormHelperText,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LockIcon from '@mui/icons-material/Lock';
import CircularProgress from '@mui/material/CircularProgress';
import Layout from '@layout/index';
import AppLayout from '@components/AppLayout';
import Section from '@components/Section';
import Bridge from '@components/Menu/bridge';
import MenuToken, { Token } from '@components/Menu/token';
import { Account } from '@components/Menu/account';
import History from '@components/History';
import { Contracts } from '@components/Menu/contracts';

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

  const [tokens, setTokens] = useState<Token[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const [pair, setPair] = useState<(Account | null)[]>([null, null]);
  const [token, setToken] = useState<Token | null>(null);
  const [balance, setBalance] = useState<string>('');
  const [disabled, setDisable] = useState<boolean>(true);
  const [approved, setApproved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const textRef = useRef();
  // const [data, setData] = useState('');
  // console.log('length - ', address);

  const connected = (items: Account[]): void => {
    // layout/Navbar/ListItems에서 실행
    setAccounts(items);
    setToken(null);

    setPair([null, null]);
    setTokens([]);

    if (items.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const onSndTransaction = async (): Promise<void> => {
    if (approved) {
      console.log('----------------------------------');
      console.log('snd');
      console.log('from', JSON.stringify(pair[0]));
      console.log('to', JSON.stringify(pair[1]));
      console.log('token', JSON.stringify(token));
      console.log('value', textRef.current ? (textRef.current as any).value.toString() : '0');
      console.log('----------------------------------');
      if (pair[0] && pair[1] && token) {
        console.log('send');
        const result = await Contracts.send(
          pair[0].network,
          token.address,
          textRef.current ? (textRef.current as any).value.toString() : '0',
          pair[1].network,
          pair[1].address.replace('0x', '0x000000000000000000000000'),
        );
        console.log(result);
      }
    } else {
      console.log('----------------------------------');
      console.log('approve');
      console.log('from', JSON.stringify(pair[0]));
      console.log('token', JSON.stringify(token));
      console.log('----------------------------------');
      if (pair[0] && token) {
        console.log('approve');
        const result = await Contracts.approve(pair[0].network, token.address, '10000000000');
        console.log(result);
        const temp = await updateAllowance(token.address);
        setApproved(temp);
      }
    }
  };

  const updateBalance = async ({
    name,
    address,
  }: {
    name: string;
    address: string;
  }): Promise<void> => {
    console.log('----------------------------------');
    console.log('get token balance');
    console.log('network', pair[0]?.network);
    console.log('name', name);
    console.log('address', address);
    console.log('----------------------------------');
    if (pair[0]) {
      setLoading(true);
      setDisable(true);
      setApproved(false);
      const result = await Contracts.getBalanceOf(pair[0].network, address, pair[0].address);
      setBalance(result);
      console.log('balance', result);
      const temp = await updateAllowance(address);
      setApproved(temp);
      setDisable(false);
      setLoading(false);
    }
  };

  const updateAllowance = async (address: string): Promise<boolean> => {
    if (pair[0]) {
      const result = await Contracts.getAllowance(
        pair[0].network,
        address,
        pair[0].address,
        '100000000',
      );
      return result;
    }
    return false;
  };

  return (
    <AppLayout
      layout={Layout}
      connected={connected}
      component={(): JSX.Element => {
        return (
          <>
            <Box
              style={{
                height: '100%',
                background:
                  'radial-gradient(305.68% 144.33% at 49.88% 0%, #000000 1.62%, #000000 56.91%, #0F1D39 65.25%, #D7E5FF 83.36%)',
              }}
            >
              <Section>
                <Grid container spacing={20}>
                  <Grid
                    container
                    item
                    textAlign="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={3}
                    rowSpacing={12}
                  >
                    <Bridge
                      disabled={disabled}
                      accounts={accounts}
                      pair={pair}
                      updatePair={(items: (Account | null)[]): void => {
                        if (items[0]) {
                          setTokens(Contracts.tokenList[items[0].network] || []);
                        }
                        setToken(null);
                        setBalance('');
                        setPair(items);
                      }}
                    />

                    <Grid container item xs={12} textAlign="center" direction="row">
                      <FormControl
                        fullWidth
                        variant="filled"
                        disabled={disabled || tokens.length === 0}
                      >
                        <AmountInput
                          type="number"
                          style={{ borderRadius: '27px' }}
                          disabled={disabled || tokens.length === 0 || !token}
                          variant="outlined"
                          inputRef={textRef}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                sx={{ width: '400px', marginLeft: '-14px' }}
                              >
                                <MenuToken
                                  disabled={disabled || tokens.length === 0}
                                  token={token}
                                  tokens={tokens}
                                  label={'Select Token (ERC20)'}
                                  onSelectToken={(item: {
                                    name: string;
                                    address: string;
                                  }): void => {
                                    setBalance('');
                                    setToken(item);
                                    updateBalance(item);
                                  }}
                                />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  color="warning"
                                  size="large"
                                  disabled={disabled || tokens.length === 0 || !token || loading}
                                  onClick={onSndTransaction}
                                >
                                  {loading ? (
                                    <CircularProgress />
                                  ) : approved ? (
                                    <ArrowForwardIosIcon />
                                  ) : (
                                    <LockIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <FormHelperText>
                          {balance ? `MAX amount: ${balance} Photon, Tx Fee: 0.04 Photon` : ''}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <History />
                  </Grid>
                </Grid>
              </Section>
            </Box>
          </>
        );
      }}
    />
  );
}
