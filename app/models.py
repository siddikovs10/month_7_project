from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
import datetime


class Language(models.Model):
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Language"
        verbose_name_plural = "Languages"
        ordering = ['name']

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        ordering = ['name']

    def __str__(self):
        return self.name


class Book(models.Model):
    name = models.CharField(max_length=200)
    author = models.CharField(max_length=150)
    description = models.TextField()
    published = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(datetime.date.today().year)]
    )
    image = models.ImageField(upload_to='books/', blank=True, null=True)
    language = models.ForeignKey(Language, on_delete=models.CASCADE, related_name="books")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="books")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} by {self.author}"


class Comment(models.Model):
    text = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="comments")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Comment by {self.user.username} on {self.book.name}"
