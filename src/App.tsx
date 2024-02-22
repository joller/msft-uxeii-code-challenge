/* Libs */
import { useEffect, useState } from "react";

/* Styles */
import "./App.css";

/* Services & Types */
import {
  getAllDogs,
  getRandomDogImages,
  getDogImagesByBreed,
  getDogImagesBySubBreed,
  type EnhancedDog,
} from "./services/getDogs";

/* Utilities */
import { parseUrlByBreed } from "./utilities/parseUrlByBreed";
import { findSearchMatch } from "./utilities/findSearchMatch";
import { processBreedData } from "./utilities/processBreedData";

function App() {
  // The results displayed to the user, whether it be initial or from the search
  const [results, setResults] = useState([]);

  // Sets up the search data we key off of
  const [searchableData, setSearchableData] = useState([]);

  // To have a mechanism that enables the noResults state
  const [noResults, setNoResults] = useState(false);

  // Setting empty array that adds in image urls

  useEffect(() => {
    getRandomDogImages(12).then((data) => {
      const imageData = data.message;

      // sets the initial results display
      const initialDisplayResults = imageData.map((imageData: string) => {
        const labelResult = parseUrlByBreed(imageData, "breeds/");
        return { img: imageData, breed: labelResult };
      });
      setResults(initialDisplayResults);
    });

    // Takes dog response from allDogs API and processes to an "enhanced" array that differentiates between breed/subBreed
    getAllDogs().then((data) => {
      setSearchableData([]);
      const enhancedDogsArr = [];
      const dogResult = data.message;

      const processedDogData: EnhancedDog[] = processBreedData(dogResult);

      processedDogData.map((dog) => {
        const breed = dog.breed;
        const subBreed = dog.subBreed;
        // If it's a subBreed, hit the subBreed api to populate images
        if (dog.isSubBreed === true) {
          getDogImagesBySubBreed(breed, subBreed).then((data) => {
            const imageData = data.message;
            const enhancedBreedObj = {
              ...dog,
              img: imageData,
            };
            enhancedDogsArr.push(enhancedBreedObj);
          });
          // ... otherwise just ping breed
        } else {
          getDogImagesByBreed(breed).then((data) => {
            const imageData = data.message;
            const enhancedBreedObj = {
              ...dog,
              img: imageData,
            };
            enhancedDogsArr.push(enhancedBreedObj);
          });
        }
      });
      console.log(enhancedDogsArr);
      // Populate the searchable data set
      setSearchableData(enhancedDogsArr);
    });
  }, []);

  //console.log(searchableData);

  /// TODO handle an empty input submission?
  const submitSearch = (e: any) => {
    // Prevents browser from reloading the page
    e.preventDefault();
    setNoResults(false);

    // Read the form data
    const form = e.target;

    // Constructor to create key/val pairs from submitted value
    const formData = new FormData(form);

    // Convert to a plain object
    const formJson = Object.fromEntries(formData.entries());

    // Only have one form entry, search- parsing to a string for later use
    const searchTerm = formJson.search.toString();

    const searchMatchResult = findSearchMatch(searchTerm, searchableData);
    console.log(searchTerm, searchMatchResult);

    searchMatchResult.length === 0
      ? setNoResults(true)
      : setResults(searchMatchResult);
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
            Search dogs by breed or sub-breed
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
            {results.map((result: EnhancedDog, i) => (
              <li className="result-item" key={i}>
                <div className="flex justify-center items-center result-image">
                  <img src={result.img} alt={result.breed} />
                </div>
                <p className="reult-label">
                  {result.isSubBreed
                    ? `${result.subBreed} ${result.breed}`
                    : `${result.breed}`}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
