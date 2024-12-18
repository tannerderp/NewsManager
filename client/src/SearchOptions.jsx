import { useEffect, useState } from 'react';

export function SearchOptions({activeOption, setActiveOption}){
    async function handleButtonClick(id){
        setActiveOption(id);
    }
    
    return (
        <div className="search-options-container">
            Sort By<br></br>
            <button className={"search-option " + (activeOption === 1 ? "active-option": "")} onClick={() => handleButtonClick(1)}>Newest Articles</button>
            <button className={"search-option " + (activeOption === 2 ? "active-option": "")} onClick={() => handleButtonClick(2)}>Popular Articles</button>
            <button className={"search-option " + (activeOption === 3 ? "active-option": "")} onClick={() => handleButtonClick(3)}>Relevant Articles</button>
        </div>
    )
}