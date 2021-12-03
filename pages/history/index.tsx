import React from 'react';
import Layout from '@layout/index';
import AppLayout from '@components/AppLayout';
import Section from '@components/Section';
import History from '@components/History';
import { styled } from '@mui/material/styles';
import { Button, Grid } from '@mui/material';

const MainButton = styled(Button)(({ theme }) => {
  return {
    width: 196,
    height: 40,
    borderRadius: 54,
    marginTop: theme.spacing(5),
    fontSize: 18,
    fontWeight: 400,
  };
});

export default function Page(): JSX.Element {
  return (
    <AppLayout
      layout={Layout}
      component={(): JSX.Element => {
        return (
          <>
            <Section>
              <Grid item xs={12} textAlign="center">
                <History />
                <MainButton href="/" variant="contained">
                  Main
                </MainButton>
              </Grid>
            </Section>
          </>
        );
      }}
    />
  );
}
