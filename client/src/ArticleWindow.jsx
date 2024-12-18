import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import * as cookie from "cookie";

export function ArticleWindow({changeArticle, article}) {
    const [published, setPublished] = useState("at an unknown date")
    const [saved, setSaved] = useState(false);
    
    useEffect(() => {
        const date = new Date(article.publishedAt);
        const readableDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        setPublished(readableDate);
        isSaved();
    }, []);

    async function isSaved(){
        const res = await fetch("/issaved/", {
            credentials: "same-origin",
            headers: {
                "articleUrl": article.url
            }
        });
        const body = await res.json();
        if(body.isSaved){
            setSaved(true);
        }
    }

    async function saveArticle(){
        const res = await fetch("/savearticle/", {
            method: "POST",
            credentials: "same-origin",
            body: JSON.stringify({
                "title": article.title,
                "author": article.author,
                "description": article.description,
                "urlToImage": article.urlToImage,
                "url": article.url,
                "publishedAt": article.publishedAt
            }),
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookie.parse(document.cookie).csrftoken
            }
        });
        const body = await res.json();
        if(body.saved){
            setSaved(true);
        }
    }

    async function unsaveArticle() {
        const res = await fetch("/unsavearticle/", {
            credentials: "same-origin",
            headers: {
                "articleUrl": article.url
            }
        });
        const body = await res.json();
        if(body.deleted){
            setSaved(false);
        } 
    }

    return (
        <div className="article-preview"><Link to={"/viewarticle"} state={{ article: article }}>
            <img className="preview-image" src={article.urlToImage}></img>
            <h3>{article.title}</h3>
            <h5 className="preview-author">By {article.author}</h5>
            <h5 className="preview-author">Published {published}</h5>
            <p className="preview-description">{article.description}</p> </Link>
            {saved ? (
            <button className="save-article-button" onClick={unsaveArticle}>UNSAVE ARTICLE</button>) : (
            <button className="save-article-button" onClick={saveArticle}>SAVE ARTICLE</button>
            )}
        </div>
    )
}