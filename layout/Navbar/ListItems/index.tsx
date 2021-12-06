/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react';
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
  getLocalAccount: () => void;
}

const ListItems = ({ getLocalAccount }: ListItemsProps): JSX.Element => {
  const [address, setAddress] = useState<string[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const getAccounts = async (network: string): Promise<Account[]> => {
      const { welldone } = window as any;
      if (welldone) {
        const temp = await welldone.getAccount(network);
        // console.log(network)
        return [{ network: network, address: temp.address }];
      }
      return [];
    };

  const connect = async (): Promise<void> => {
      try {
        // console.log('try connect');
        // const { welldone } = window as any;
          const a0 = await getAccounts('evmos');
          const a1 = await getAccounts('ethereum');
          const a2 = await getAccounts('cosmos');
          const localAccounts = JSON.stringify([...a0, ...a1, ...a2]);
          localStorage.setItem('accounts', localAccounts)
          // console.log('stored - ', localStorage.getItem('accounts'));
          getLocalAccount();
        // console.log('executed');
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="navbar-listitems">
      <StyledList>
        {address.length == 0 ? ( // TODO
          <ListItem>
            <Button variant="contained" onClick={connect}>
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
