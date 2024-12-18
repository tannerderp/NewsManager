from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.core.serializers import serialize
import requests
from bs4 import BeautifulSoup
from .models import SavedArticle

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

@login_required
def get_user(req):
    return JsonResponse({"user": model_to_dict(req.user)})

@login_required
def get_recommended_headlines(req):
    api_key = os.environ.get("NEWS_API_KEY")
    category = req.headers.get("category")
    url = f"https://newsapi.org/v2/top-headlines?country=us&category={category}&apiKey={api_key}"
    response = requests.get(url)
    articles = response.json().get("articles", [])
    return JsonResponse({"articles": articles})

@login_required
def get_article_content(req):
    try:
        response = requests.get(req.headers.get("articleUrl"))
    except:
        return JsonResponse({"articleContent": ["Content could not be found. Use the link above to read the article from it's publisher's website"]})
    
    soup = BeautifulSoup(response.content, 'html.parser')
    
    article = soup.find("article")
    if not article:
        article = soup.find("body")
    
    content_elements = article.find_all(['p', 'h1', 'h2', 'h3', 'ul', 'ol'])
    elements = []
    for element in content_elements:
        elements.append(element.get_text())
    
    if len(elements) == 0:
        elements = ["Content could not be found. Use the link above to read the article from it's publisher's website"]
    return JsonResponse({"articleContent": elements})

@login_required
def search_articles(req):
    search_query = req.headers.get("searchquery")
    sort_by = req.headers.get("sortby")
    api_key = os.environ.get("NEWS_API_KEY")
    url = f"https://newsapi.org/v2/everything?q={search_query}&sortBy={sort_by}&apiKey={api_key}"
    response = requests.get(url)
    articles = response.json().get("articles", [])
    return JsonResponse({"searchResults": articles})

@login_required
def save_article(req):    
    if req.method == "POST":
        body_data = json.loads(req.body)
        article_img = body_data["urlToImage"]
        if article_img is None:
            ariticle_img = ""
        saved_article = SavedArticle(title=body_data["title"], imgUrl=article_img, author=body_data["author"], description=body_data["description"], url=body_data["url"], published_at=body_data["publishedAt"], user=req.user)
        saved_article.save()
        return JsonResponse({"saved": True})

@login_required
def unsave_article(req):
    article_url = req.headers.get("articleUrl")
    user_article = SavedArticle.objects.filter(user=req.user, url=article_url)
    if user_article:
        user_article.delete()
        return JsonResponse({"deleted": True})
    else:
        return JsonResponse({"deleted": False})

@login_required
def get_saved_articles(req):
    saved_articles = SavedArticle.objects.filter(user=req.user)
    data = []
    for article_model in saved_articles:
        article = {}
        article["author"] = article_model.author
        article["description"] = article_model.description
        article["title"] = article_model.title
        article["urlToImage"] = article_model.imgUrl
        article["url"] = article_model.url
        article["publishedAt"] = article_model.published_at
        data.append(article)

    return JsonResponse({"articles": data})

@login_required
def is_article_saved(req): #returns true if the article given is saved by the user. 
    article_url = req.headers.get("articleUrl")
    is_saved = False
    user_article = SavedArticle.objects.filter(user=req.user, url=article_url)
    if user_article:
        is_saved = True
    return JsonResponse({"isSaved": is_saved})