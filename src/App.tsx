import { useEffect, useState } from "react";

import "./App.css";
import type { RandomDog } from "./services/getDogs";
import { getAllDogs, getRandomDogs, getDogsByBreed } from "./services/getDogs";
import { parseUrlByBreed } from "./utilities/parseUrlByBreed";
import { findSearchMatch } from "./utilities/findSearchMatch";
import { flattenObjectArrays } from "./utilities/flattenObjectArray";

function App() {
  // The results displayed to the user, whether it be initial or from the search
  const [results, setResults] = useState([]);

  // Sets up the search data we key off of
  const [searchableData, setSearchableData] = useState([]);

  // To have a mechanism that enables the noResults state
  const [noResults, setNoResults] = useState(false);

  //TODO
  // create search data that gives us all dog possibilities
  // filter/find using searchTerm to map through that search data, and return only the matches
  // setResults to the matched search data

  // TODO have this populate the URL when searchQuery is populated? Could be the "nice to have"
  // Will need to encode the url param
  // const [searchQuery, setSearchQuery] = useState('')

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
      const dogResult = data.message;

      const breedData = Object.keys(dogResult);
      const subBreedData = flattenObjectArrays(dogResult);

      const adjustedSubBreedData = subBreedData.map((item) => {
        return { label: item, isSubBreed: true };
      });

      const adjustedBreedData = breedData.map((item) => {
        return { label: item, isSubBreed: false };
      });

      const flattenedDogData = adjustedBreedData.concat(adjustedSubBreedData);

      setSearchableData(flattenedDogData);
    });
  }, []);

  console.log(searchableData);

  /// TODO search code
  const submitSearch = (e: any) => {
    // Prevents browser from reloading the page
    e.preventDefault();
    setNoResults(false);

    // Setting empty array that takes in image urls during loop and resets each time form is submitted
    const matchedResultsArr = [];

    // Read the form data
    const form = e.target;

    // Constructor to create key/val pairs from submitted value
    const formData = new FormData(form);

    // Convert to a plain object
    const formJson = Object.fromEntries(formData.entries());

    // Only have one form entry, search- parsing to a string for later use
    const searchTerm = formJson.search.toString();

    const searchMatchResult = findSearchMatch(searchTerm, searchableData);

    console.log(searchMatchResult);

    searchMatchResult.length === 0
      ? setNoResults(true)
      : searchMatchResult.map((breed) => {
          getDogsByBreed(breed).then((data) => {
            // Getting image data
            const imageData = data.message;
            // creating an object that has imgData and label
            const enhancedBreedObj = {
              img: imageData,
              label: breed.toString(),
            };

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
      {noResults ? (
        <div>
          <h2>No results found</h2>
          <p>Please try another search</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default App;
