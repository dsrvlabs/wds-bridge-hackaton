import React from 'react';
import { MenuItem, Select, Avatar, Grid, FormControl, InputLabel } from '@mui/material';
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
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  };
});

interface Props {
  data: string[];
  // setData: (key: string) => void;
  disable: boolean;
}

export default function Menu(props: Props): JSX.Element {
  // TODO: dummy data
  // TODO: 지갑 연결 전에 disabled
  // console.log(props.disable);
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

  return (
    <FormControl
      variant="outlined"
      sx={{ minWidth: 1 }}
      placeholder="Select Network"
      // onChange={props.setData('')}
    >
      <InputLabel>Select Network</InputLabel>
      <SelectBox disabled={props.disable}>
        {props.data.map((item, i) => {
          // const test = item.length == 0 ? true : false;
          return (
            <MenuItem key={i} value={item || 'evmos'}>
              <Grid container direction="row" key={i}>
                <StyledAvatar src={'evmos.png'} />
                {item.length > 15
                  ? item.substring(0, 7) + '...' + item.substring(item.length - 7, item.length)
                  : item}
              </Grid>
            </MenuItem>
          );
        })}
      </SelectBox>
    </FormControl>
  );
}
