import React from 'react';
import { MenuItem, Select, Avatar, Grid, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

const SelectBox = styled(Select)(() => {
  return {
    appearance: 'none',
    borderRadius: 27,
  };
});

const StyledAvatar = styled(Avatar)(({ theme }) => {
  return {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  };
});

export interface Account {
  network: string;
  address: string;
}

interface Props {
  account: Account | null;
  accounts: Account[];
  label: string;
  onSelectAccount: (item: Account) => void;
  // setData: (key: string) => void;
  disabled: boolean;
}

export default function Menu({
  account,
  accounts,
  label,
  onSelectAccount,
  disabled,
}: Props): JSX.Element {
  // TODO: dummy data
  // TODO: 지갑 연결 전에 disabled
  // console.log(props.disabled);
  // console.log(props.data == '')
  // console.log('props', props);
  // const [address, setAddress] = useState<string[]>(['example1', 'example2']);

  /*   const [address, setAddress] = useState<string[]>(['']);
  const connect = async (): Promise<void> => {
    try {
      const welldone = (window as any).welldone;
      if (welldone) {
        await welldone.connectWallet();
        const account = await welldone.getAccount('evmos');
        setAddress(account);
        console.log('connected to - ', account.address);
      }
    } catch (error) {
      console.log(error);
    }
  };
  connect();
  console.log('rr - ', address) */

  const drawItem = (item: Account): JSX.Element => {
    let icon = '/ethereum.png';

    switch (item.network) {
      case 'evmos':
        icon = '/evmos.png';
        break;
      default:
        break;
    }

    return (
      <Grid container direction="row">
        <StyledAvatar src={icon} />
        {item.address.length > 15
          ? item.address.substring(0, 7) +
            '...' +
            item.address.substring(item.address.length - 7, item.address.length)
          : item.address}
      </Grid>
    );
  };

  return (
    <FormControl variant="outlined" sx={{ minWidth: 1 }} placeholder="Select Network">
      <InputLabel>{label}</InputLabel>
      <SelectBox
        disabled={disabled}
        label={label}
        style={{ backgroundColor: '#9FBFFF26' }}
        value={account ? `${account.network}:${account.address}` : ''}
        onChange={(e): void => {
          const temp = e.target.value as string;
          onSelectAccount({
            network: temp.split(':')[0],
            address: temp.split(':')[1],
          });
        }}
      >
        {accounts.map((item, i) => {
          return (
            <MenuItem key={i} value={`${item.network}:${item.address}`}>
              {drawItem(item)}
            </MenuItem>
          );
        })}
      </SelectBox>
    </FormControl>
  );
}
