import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import * as cookie from "cookie";

export function ViewArticle(){
    const location = useLocation();
    const article = location.state?.article;
    const [articleContent, setArticleContent] = useState(["Article content could not be found. Please use the link above to view the article from the publisher's website."]);
    const [saved, setSaved] = useState(false);
    const [publishedDate, setPublishedDate] = useState("");

    async function getArticleContent(){
        const res = await fetch("/getarticlecontent/", {
            credentials: "same-origin",
            headers: {
                "articleUrl": article.url
            }
        });
        const body = await res.json();
        setArticleContent(body.articleContent);
    }

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

    useEffect(() => {
        isSaved();
        getArticleContent();
        const date = new Date(article.publishedAt);
        const readableDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        setPublishedDate(readableDate);
    }, [saved, ])

    return (
        <div>
        <h2><a href={article.url} target="_blank" className="original-article-link">
            <img className="article-image" src={article.urlToImage} rel="noopener noreferrer"></img>
            <br></br>View on original site
        </a></h2>
        <h1 className="article-title">{article.title}</h1>
        <h5>By {article.author}</h5>
        <h5>Published {publishedDate}</h5>
        <p className="article-description italicized">{article.description}</p>
        {saved ? (
            <button className="save-article-button" onClick={unsaveArticle}>UNSAVE ARTICLE</button>) : (
            <button className="save-article-button" onClick={saveArticle}>SAVE ARTICLE</button>
        )}
        <div className="article-content">{articleContent.map(element => (
            <p>{element}</p>
        ))}</div>
        </div>
    )
}