import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ListItems from './ListItems';

const FlexGrow = styled(Box)(() => {
  return {
    flexGrow: 1,
  };
});

const StyledAppbar = styled(AppBar)(() => {
  return {
    background: 'transparent',
    boxShadow: 'none',
    height: 80,
  };
});

const StyledToolbar = styled(Toolbar)(({ theme }) => {
  return {
    zIndex: 999,
    maxWidth: theme.layout.contentWidth,
    height: 10,
    width: theme.layout.fullWidth,
    margin: theme.layout.middle,
  };
});

const Navbar = ({ /* className, */ ...rest }): JSX.Element => {
  // console.log('navbar', themeMode);
  return (
    <StyledAppbar>
      <StyledToolbar {...rest}>
        <Link href="/">
          <a
            style={{
              textDecoration: 'none',
              color: 'inherit',
              fontSize: 24,
              fontWeight: 400,
              marginTop: 50,
            }}
          >
            WELLDONE Bridge
          </a>
        </Link>
        <FlexGrow />
        <ListItems />
      </StyledToolbar>
    </StyledAppbar>
  );
};

export default Navbar;
