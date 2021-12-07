import React, { useState } from 'react';
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
import Layout from '@layout/index';
import AppLayout from '@components/AppLayout';
import Section from '@components/Section';
import Bridge from '@components/Menu/bridge';
import MenuToken, { Token } from '@components/Menu/token';
import { Account } from '@components/Menu/account';
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
  const tokenList: { [key: string]: Token[] } = {
    evmos: [
      {
        name: 'test token',
        address: '',
      },
    ],
  };
  const [tokens, setTokens] = useState<Token[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const [pair, setPair] = useState<(Account | null)[]>([null, null]);
  const [token, setToken] = useState<Token | null>(null);
  const [value, setValue] = useState<number>(0);
  const [disabled, setDisable] = useState<boolean>(true);
  // const [data, setData] = useState('');
  // console.log('length - ', address);

  const connected = (items: Account[]): void => {
    // layout/Navbar/ListItems에서 실행
    setAccounts(items);
    setToken(null);
    setValue(0);
    setPair([null, null]);
    setTokens([]);

    if (items.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const onSndTransaction = (): void => {
    console.log('----------------------------------');
    console.log('snd');
    console.log('from', pair[0]);
    console.log('to', pair[1]);
    console.log('token', token);
    console.log('value', value);
    console.log('----------------------------------');
  };

  return (
    <AppLayout
      layout={Layout}
      connected={connected}
      component={(): JSX.Element => {
        const balance = 17; // TODO
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
                          setToken(null);
                          setTokens(tokenList[items[0].network] || []);
                        }
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
                          disabled={disabled || tokens.length === 0}
                          variant="outlined"
                          value={value}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            setValue(e.target.value as unknown as number);
                          }}
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
                                    setToken(item);
                                  }}
                                />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  color="warning"
                                  size="large"
                                  disabled={disabled || tokens.length === 0}
                                  onClick={onSndTransaction}
                                >
                                  <ArrowForwardIosIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <FormHelperText>
                          {`MAX amount: ${balance} Photon, Tx Fee: 0.04 Photon`}
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
