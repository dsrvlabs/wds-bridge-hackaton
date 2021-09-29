// testing themeToggler

import type { NextPage } from 'next';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

const Home: NextPage = () => {
  const theme = useTheme();
  const { themeToggler } = theme;

  return (
    <Button
      variant={'outlined'}
      onClick={(): void => {
        return themeToggler();
      }}
    >
      Theme
    </Button>
  );
};

export default Home;
