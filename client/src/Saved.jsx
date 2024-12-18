import { useEffect, useState } from 'react'
import { ArticleWindow } from "./ArticleWindow";

export function Saved({changePage, changeArticle}){
    const [articles, setArticles] = useState([]);
    
    async function getSavedArticles() {
        const res = await fetch("/getsaved/", {
            credientials: "same-origin",
        });
        const body = await res.json();
        setArticles(body.articles);
    }

    useEffect(() => {
        getSavedArticles();
    }, [])
    
    return (
        <div>
        <h1>Saved</h1>
            <div className="articles-container">
                {articles.map(article => (
                    <ArticleWindow article={article} changeArticle={changeArticle} ></ArticleWindow>
                ))}
            </div>
        </div>
    )
}