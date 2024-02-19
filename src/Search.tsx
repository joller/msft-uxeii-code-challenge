// import React from 'react';

export default function Search() {

    return(
        <div>
            <div className="flex items-center justify-center search-wrapper">
                <label className="sr-only" htmlFor="search">Search</label>
                <input id="searchInput" className="search-input" placeholder="Search" type="text" />
                <button className="button">Search</button>
            </div>
            
        
        </div>
   
    )
}
