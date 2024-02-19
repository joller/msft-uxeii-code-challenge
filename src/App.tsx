import React from 'react';
import Search from './Search'

import './App.css';
import { getAllDogs, getRandomDogs } from './services/getDogs';

function App() {

  const {response } = getRandomDogs(12);
  
  return (
    <div className="App">
    <header className="App-header">
      <div className='flex items-center'>
        <img src="woofer.svg" className="App-logo" alt="logo" />
        <p className="logo-name">Woofer</p>  
      </div>
     
      <Search />
      { /* <p className="small">
        An Innovation & Technology team challenge
      </p> */ }
    </header>
    <div className='restuls'>

    </div>
  </div>
  );
}

export default App;
