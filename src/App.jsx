import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConverterContainer } from './pages/ConverterContainer';
import { Navbar } from './components/Navbar';
import { AllPairContainer } from './pages/AllPairContainer';

export const App = () => {
  return(
    <>
      <header className="header">
        <Navbar />
      </header>
      
      <main className="main">
        <div className="main__inner container">
          <Switch>
            <Route path="/" exact><ConverterContainer /></Route>
            <Route path="/pairs"><AllPairContainer /></Route>
          </Switch>
          </div>
      </main>

      <footer className="footer">
        <div className="container">
          Информация для данного сайта взята через api &nbsp; 
          <a 
            target="blank" 
            href="https://rapidapi.com/natkapral/api/currency-converter5?endpoint=apiendpoint_60f65086-f166-49ff-a498-12248c84fb46"
          >
            Rapidapi
          </a>
        </div>
      </footer>
    </>
  );
}