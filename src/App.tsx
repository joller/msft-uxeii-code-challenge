import { useEffect, useState } from "react";
// import Search from "./Search";

import "./App.css";
import type { RandomDog } from "./services/getDogs";
import { getAllDogs, getRandomDogs, getDogsByBreed } from "./services/getDogs";
import { parseUrlByBreed } from "./utilities/parseUrlByBreed";

function App() {
  const [results, setResults] = useState([]);
  const [searchData, setSearchData] = useState();
  // const [matchedResultsArr, setmatchedResultsArr] = useState([]);

  //TODO
  // create search data that gives us all dog possibilities
  // filter/find using searchTerm to map through that search data, and return only the matches
  // setResults to the matched search data

  // TODO have this populate the URL when searchQuery is populated? Could be the "nice to have"
  // Will need to encode the url param
  // const [searchQuery, setSearchQuery] = useState('')

  function findSearchMatch(searchKey: string, obj: any): any | undefined {
    const matchKey = Object.keys(obj).filter((key) => key.includes(searchKey));
    if (matchKey) {
      return matchKey;
    } else {
      return undefined;
    }
  }

  useEffect(() => {
    getRandomDogs(12).then((data) => {
      const imageData = data.message;

      // sets the initial results display
      const initialDisplayResults = imageData.map((imageData: string) => {
        const labelResult = parseUrlByBreed(imageData, "breeds/");
        return { img: imageData, label: labelResult };
      });
      setResults(initialDisplayResults);
    });

    getAllDogs().then((data) => {
      const dogData = data.message;

      setSearchData(dogData);
    });
  }, []);

  /// TODO search code
  const submitSearch = (e: any) => {
    // Prevents browser from reloading the page
    e.preventDefault();

    // Setting empty array that takes in image urls during loop and resets each time form is submitted
    const matchedResultsArr = [];

    // Read the form data
    const form = e.target;

    // Constructor to create key/val pairs from submitted value
    const formData = new FormData(form);

    // Convert to a plain object
    const formJson = Object.fromEntries(formData.entries());

    //
    const searchTerm = formJson.search.toString();

    const searchMatchResult = findSearchMatch(searchTerm, searchData);

    searchMatchResult.map((breed) => {
      getDogsByBreed(breed).then((data) => {
        // Getting image data
        const imageData = data.message;
        // creating an object that has imgData and label
        const enhancedBreedObj = { img: imageData, label: breed.toString() };

        // Adding urls to array
        matchedResultsArr.push(enhancedBreedObj);

        console.log(results);

        // if temporary array is great or equal to our search results terms then set results
        if (matchedResultsArr.length >= searchMatchResult.length) {
          setResults(matchedResultsArr);
          console.log(matchedResultsArr);
        }
      });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex items-center">
          <img src="woofer.svg" className="App-logo" alt="logo" />
          <p className="logo-name">Woofer</p>
        </div>

        <form
          className="flex items-center justify-center search-form"
          action=""
          method="get"
          name="search"
          onSubmit={submitSearch}
        >
          <label className="sr-only" htmlFor="search">
            Search
          </label>
          <input
            id="searchInput"
            className="search-input"
            name="search"
            placeholder="Dog type"
            type="text"
          />
          <button className="button">Search</button>
        </form>
      </header>
      <div className="results flex">
        <ul className="results-list">
          {results.map((result: RandomDog, i) => (
            <li className="result-item" key={i}>
              <div className="flex justify-center items-center result-image">
                <img src={result.img} alt={result.label} />
              </div>
              <p className="reult-label">{result.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
