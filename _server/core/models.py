from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class SavedArticle(models.Model):
    id = models.BigAutoField(primary_key=True)
    
    title = models.TextField()
    url = models.TextField()
    imgUrl = models.TextField(null=True)
    author = models.TextField(null=True)
    description = models.TextField(null=True)
    published_at = models.TextField()

    user = models.ForeignKey(User, on_delete=models.CASCADE)