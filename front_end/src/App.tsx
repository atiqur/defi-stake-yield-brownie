import React from 'react';
import { DAppProvider, Kovan } from '@usedapp/core';
import { Header } from './components/Header';
import { Container } from '@material-ui/core';
import { Main } from './components/Main';

function App() {
  return (
    <DAppProvider
      config={{
        networks: [Kovan],
      }}
    >
      <Header />
      <Container maxWidth='md'>
        <Main />
      </Container>
    </DAppProvider>
  );
}

export default App;
