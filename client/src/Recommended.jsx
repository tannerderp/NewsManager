import { useEffect, useState } from 'react'
import { ArticleWindow } from "./ArticleWindow";
import { CategoryDropdown } from "./CategoryDropdown";

export function Recommended({changePage, changeArticle}) {
    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState("General");
    
    async function getRecommendedArticles() {
        const res = await fetch("/recommended/", {
            credientials: "same-origin",
            headers: {
                "category": category
            }
        });
        const body = await res.json();
        setArticles(body.articles);
    }

    async function changeCategory(categoryName){
        setCategory(categoryName);
    }

    useEffect(() => {
        getRecommendedArticles();
    }, [, category])
    
    return (
        <div>
            <h1>Recommended Articles</h1>
            <CategoryDropdown category={category} changeCategory={changeCategory}/>
            <div className="articles-container">
                {articles.map(article => (
                    <ArticleWindow article={article} changeArticle={changeArticle} ></ArticleWindow>
                ))}
            </div>
        </div>
    )
}