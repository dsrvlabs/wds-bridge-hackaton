/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react';
import Link from 'next/link';
import { List, ListItem, styled, Button } from '@mui/material';
// import ABI from './welldone.json';

const StyledList = styled(List)(() => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
});

const Connect = styled(Button)(({ theme }) => {
  return {
    marginTop: theme.spacing(6),
  };
});

// Send transaction
/* const send = async () => {
  try {
    const ethers = (window as any).ethers;
    if (ethers) {
      const iface = new ethers.ethers.utils.Interface(ABI);
      const data = iface.encodeFunctionData('store', [17]);
      const welldone = (window as any).welldone;
      if (welldone) {
        const hash = await welldone.sendTransaction(
          'evmos',
          '0x91ac88FF3d5583d887BFb5BCB599a3E4164b3786',
          data,
          '0',
        );
        console.log(hash);
      }
    }
  } catch (error) {
    console.log(error);
  }
}; */

const ListItems = (): JSX.Element => {
  const [address, setAddress] = useState<string[]>([]);
  const connect = async () => {
    try {
      const welldone = (window as any).welldone;
      if (welldone) {
        await welldone.connectWallet();
        const account = await welldone.getAccount('evmos');
        setAddress([account.address]);
        console.log('success - ', account.address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(address);
  // console.log('test - ', address.length);
  return (
    <div className="navbar-listitems">
      <StyledList>
        {address.length == 0 ? ( // TODO
          <ListItem>
            <Connect variant="contained" onClick={connect}>
              Connect
            </Connect>
          </ListItem>
        ) : null}
        <ListItem>
          <Link href="/" passHref>
            <a style={{ textDecoration: 'none', color: 'inherit', fontSize: 16, marginTop: 50 }}>
              Transaction
            </a>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/history" passHref>
            <a style={{ textDecoration: 'none', color: 'inherit', fontSize: 16, marginTop: 50 }}>
              History
            </a>
          </Link>
        </ListItem>
      </StyledList>
    </div>
  );
};

export default ListItems;
