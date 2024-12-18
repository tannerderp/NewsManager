import { useEffect, useState } from 'react';
import { ArticleWindow } from "./ArticleWindow";
import { SearchOptions } from "./SearchOptions";

export function Search({changePage, changeArticle}){
    const [searchQuery, setSearchQuery] = useState("");
    const [articles, setArticles] = useState([]);
    const [activeOption, setActiveOption] = useState(3);

    async function searchArticles(query){
        let sortBy = "publishedAt";
        if(activeOption == 2){
            sortBy = "popularity"
        } else if(activeOption == 3){
            sortBy = "relevancy";
        }
        const res = await fetch("/searcharticle/", {
            credientials: "same-origin",
            headers: {
                "searchquery": query,
                "sortby": sortBy
            }
        });
        const body = await res.json();
        setArticles(body.searchResults);
    }

    function handleSubmit(e){
        e.preventDefault();
        searchArticles(searchQuery);
    }

    return (
        <div>
            <h1>Search</h1>
            <form onSubmit={handleSubmit} className="search-bar">
                <input type='text' className="search-bar" value={searchQuery} onChange={(e) => 
                    {
                        setSearchQuery(e.target.value);
                }}></input>
                <button>Search</button>
            </form>
            <SearchOptions activeOption={activeOption} setActiveOption={setActiveOption} ></SearchOptions>
            <div className="articles-container">
                {articles.map(article => (
                    <ArticleWindow article={article} changeArticle={changeArticle} ></ArticleWindow>
                ))}
            </div>
        </div>
    )
}