import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Account } from '@components/Menu/account';
import ListItems from './ListItems';
import LogoImage from '../../public/logo.png';

const FlexGrow = styled(Box)(() => {
  return {
    flexGrow: 1,
  };
});

const StyledToolbar = styled(Toolbar)(({ theme }) => {
  return {
    zIndex: 999,
    maxWidth: theme.layout.contentWidth,
    width: theme.layout.fullWidth,
    margin: theme.layout.middle,
  };
});

interface NavbarProps {
  connected: (accounts: Account[]) => void;
}

const Navbar = ({ connected }: NavbarProps): JSX.Element => {
  // console.log('navbar', themeMode);
  return (
    <AppBar>
      <StyledToolbar>
        <Link href="/">
          <a>
            <img width="120px" style={{ marginTop: '6px' }} src="/logo.png" />
          </a>
        </Link>
        <FlexGrow />
        <ListItems connected={connected} />
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
