import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConverterContainer } from './pages/ConverterContainer';
import { Navbar } from './components/Navbar';
import { AllPairContainer } from './pages/AllPairContainer';

export const App = () => {
  return(
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact><ConverterContainer /></Route>
        <Route path="/pairs"><AllPairContainer /></Route>
      </Switch>
    </>
  );
}