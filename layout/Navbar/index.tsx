import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ListItems from './ListItems';

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
  getLocalAccount: () => void;
}
const Navbar = ({ getLocalAccount }: NavbarProps): JSX.Element => {
  // console.log('navbar', themeMode);
  return (
    <AppBar>
      <StyledToolbar>
        <Link href="/">
          <a>
            <Typography variant="h5">WELLDONE Bridge</Typography>
          </a>
        </Link>
        <FlexGrow />
        <ListItems getLocalAccount={getLocalAccount}/>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
