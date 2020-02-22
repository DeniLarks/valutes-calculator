import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './redux/store';


function AppContainer() {
  // let values = [];
  // useEffect(() => {
    
  // }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
       <App />
      </BrowserRouter>
    </Provider>
  );
}

export default AppContainer;
