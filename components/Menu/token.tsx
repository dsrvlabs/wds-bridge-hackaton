import React from 'react';
import { MenuItem, Select, Avatar, ListItemIcon, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
// import { useEffect } from 'react';

const SelectBox = styled(Select)(() => {
  return {
    appearance: 'none',
    borderRadius: 27,
  };
});

const StyledAvatar = styled(Avatar)(({ theme }) => {
  return {
    width: theme.spacing(2),
    height: theme.spacing(2),
    marginRight: theme.spacing(1),
  };
});

interface Props {
  tokens: { name: string; address: string }[];
  label: string;
  // setData: (key: string) => void;
  disabled: boolean;
}

export default function Menu(props: Props): JSX.Element {
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

  const getTokenIcon = (network: string): string => {
    switch (network) {
      case 'evmos':
        return '/evmos.png';
      default:
        break;
    }
    return '/ethereum.png';
  };

  return (
    <FormControl
      variant="outlined"
      sx={{ minWidth: 1 }}
      placeholder="Select Network"
      // onChange={props.setData('')}
    >
      <InputLabel>{props.label}</InputLabel>
      <SelectBox disabled={props.disabled} label={props.label}>
        {props.tokens.map((item, i) => {
          // const test = item.length == 0 ? true : false;
          return (
            <MenuItem key={i} value={JSON.stringify(item)}>
              <ListItemIcon>
                <StyledAvatar src={getTokenIcon(item.address)} />
              </ListItemIcon>
              {item.name}
            </MenuItem>
          );
        })}
      </SelectBox>
    </FormControl>
  );
}
