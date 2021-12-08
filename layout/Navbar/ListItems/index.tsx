/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { List, ListItem, styled, Button, Typography } from '@mui/material';
import { Account } from '@components/Menu/account';
// import ABI from './welldone.json';

const StyledList = styled(List)(() => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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

interface ListItemsProps {
  connected: (accounts: Account[]) => void;
}

const ListItems = ({ connected }: ListItemsProps): JSX.Element => {
  const [address, setAddress] = useState<Account[]>([]);

  const getAccounts = async (network: string): Promise<Account[]> => {
    const { welldone } = window as any;
    if (welldone) {
      const accounts = await welldone.getAccount(network);
      const temp = accounts[0];
      // console.log(network)
      return [{ network: network, address: temp.address }];
    }
    return [];
  };

  useEffect(() => {
    const update = async () => {
      const localAccount = localStorage.getItem('isConnected');
      if (localAccount === 'true') {
        await onConnect();
      } else {
        localStorage.removeItem('isConnected');
        connected([]);
      }
    };
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onConnect = async (): Promise<void> => {
    try {
      // console.log('try connect');
      const { welldone } = window as any;
      await welldone.connectWallet();
      const a0 = await getAccounts('evmos');
      const a1 = await getAccounts('ethereum');

      const addressAll = [...a0, ...a1];

      setAddress(addressAll);
      if (addressAll.length > 0) {
        localStorage.setItem('isConnected', 'true');
      } else {
        localStorage.removeItem('isConnected');
      }
      connected(addressAll);
    } catch (error) {
      localStorage.removeItem('isConnected');
      connected([]);
    }
  };

  return (
    <div className="navbar-listitems">
      <StyledList>
        {address.length == 0 ? ( // TODO
          <ListItem>
            <Button variant="contained" onClick={onConnect}>
              Connect
            </Button>
          </ListItem>
        ) : null}
        <ListItem>
          <Link href="/" passHref>
            <a>
              <Typography>Transaction</Typography>
            </a>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/history" passHref>
            <a>
              <Typography>History</Typography>
            </a>
          </Link>
        </ListItem>
      </StyledList>
    </div>
  );
};

export default ListItems;
