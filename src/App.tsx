import React from 'react';
import Search from './Search'

import './App.css';
import { getAllDogs } from './services/getDogs';

function App() {

  const {response } = getAllDogs();
  
  return (
    <div className="App">
    <header className="App-header">
      <img src="woofer.svg" className="App-logo" alt="logo" />
      <p>
        Woofer
      </p>
      <Search />
      
      
      { /* <p className="small">
        An Innovation & Technology team challenge
      </p> */ }
    </header>
  </div>
  );
}

export default App;
