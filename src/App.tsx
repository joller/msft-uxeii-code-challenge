import { useEffect, useState } from 'react';
import Search from './Search'

import './App.css';
import type { RandomDog } from './services/getDogs';
import { getRandomDogs } from './services/getDogs';
import { parseUrlByBreed } from './utilities/parseUrlByBreed';

function App() {
  const [results, setResults] = useState([])

  useEffect(() => {
    // getRandomDogs(12).then(data => {
    //   setResults(data.message)
    //  });

    getRandomDogs(12).then(data => {
      const imageData = data.message

      const enhancedResults = imageData.map((imageData: string) => {
        const labelResult = parseUrlByBreed(imageData, 'breeds/')
        return {img: imageData, label: labelResult }
      })
      setResults(enhancedResults)
    })

    console.log(results)
  }, [])

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
    <div className="results">
      <ul className="results-list">
        {
        results.map((result: RandomDog, i) => (
        <li className="result-item" key={i}> 
          <div className="flex justify-center result-image">
            <img  src={result.img} /> 
          </div>
          <p>{result.label}</p>
        </li>
        ))}
      </ul>
    </div>
  </div>
  );
}

export default App;
