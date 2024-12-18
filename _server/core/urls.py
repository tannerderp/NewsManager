from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path("me/", view=views.get_user, name="current_user"),
    path("recommended/", view=views.get_recommended_headlines, name="recommended"),
    path("getarticlecontent/", view=views.get_article_content, name="article-content"),
    path("searcharticle/", view=views.search_articles, name="search-article"),
    path("savearticle/", view=views.save_article, name="save-article"),
    path("unsavearticle/", view=views.unsave_article, name="unsave-article"),
    path("getsaved/", view=views.get_saved_articles, name="get-saved-articles"),
    path("issaved/", view=views.is_article_saved, name="is-saved")
]