import { Theme, responsiveFontSizes } from '@mui/material';
import { createTheme, ComponentsOverrides } from '@mui/material/styles';
import shadows from './shadows';
import { light, dark } from './palette';

const getTheme = (mode: string, themeToggler: () => void): Theme => {
  return responsiveFontSizes(
    createTheme({
      palette: mode === 'light' ? light : dark,
      shadows: shadows(mode),
      layout: {
        contentWidth: 1600,
        minWidth: 650,
        fullWidth: '100%',
        relative: 'relative',
        absolute: 'absolute',
        middle: '0 auto',
      },
      typography: {
        fontFamily: '"Lato", sans-serif',
        button: {
          textTransform: 'none',
          fontWeight: 'medium' as React.CSSProperties['fontWeight'],
        },
      },
      zIndex: {
        appBar: 1200,
        drawer: 1300,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            label: {
              fontWeight: 600,
            },
            containedSecondary: mode === 'light' ? { color: 'white' } : { color: 'black' },
          } as ComponentsOverrides['MuiButton'],
        },
      },
      themeToggler,
    }),
  );
};

export default getTheme;
