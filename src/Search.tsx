// import React from 'react';
import { getDogsByBreed } from './services/getDogs';
import { findSearchMatch } from './utilities/findSearchMatch';

interface SearchProps {
    searchData: any;
    handleSubmit: () => void;
}

export default function Search(props: SearchProps) {
    const {searchData, handleSubmit} = props;

    const submitSearch = (e: any) => {
    
        // Prevents browser from reloading the page
        e.preventDefault();
    
        // Read the form data
        const form = e.target;
    
        // Constructor to create key/val pairs from submitted value
        const formData = new FormData(form);
    
        // Convert to a plain object
        const formJson = Object.fromEntries(formData.entries())
    
        const searchTerm = formJson.search.toString();
    
        const searchMatchResult = findSearchMatch(searchTerm, searchData)

        handleSubmit;
    
        // if (matchedResultsArr.length < searchMatchResult.length) {
        //   console.log('if results are <')
        //   searchMatchResult.forEach(breed => {      
        //     getDogsByBreed(breed).then(data => {
        //       // Getting image data
        //       const imageData = data.message
        //       // creating an object that has imgData and label
        //       const enhancedBreedObj = {img: imageData, label: breed.toString()}
        //       matchedResultsArr.push(enhancedBreedObj)   
        //     })
        //   });
        // } else {
        //   console.log('if results are >')
        //     setmatchedResultsArr(matchedResultsArr)
        //     setResults(matchedResultsArr)
        //     console.log(matchedResultsArr)
        //     setmatchedResultsArr([])
          
        // }
    
      }
    return(
        <div className="flex items-center justify-center search-wrapper">
            <form action="" method="get" name="search" onSubmit={submitSearch}>
                <label className="sr-only" htmlFor="search">Search</label>
                <input id="searchInput" className="search-input" name="search" placeholder="Search" type="text" />
                <button className="button">Search</button>
            </form>
        </div>
    )
}
