from django.contrib import admin
from .models import Language, Category, Book, Comment
from unfold.admin import ModelAdmin


@admin.register(Language)
class LanguageAdmin(ModelAdmin):
    list_display = ('id', 'name', 'created_at', 'updated_at')
    search_fields = ('name',)
    ordering = ('name',)


@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    list_display = ('id', 'name', 'created_at', 'updated_at')
    search_fields = ('name',)
    ordering = ('name',)


@admin.register(Book)
class BookAdmin(ModelAdmin):
    list_display = ('id', 'name', 'author', 'language', 'category', 'published', 'created_at')
    list_filter = ('language', 'category', 'published')
    search_fields = ('name', 'author', 'description')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Book Information', {
            'fields': ('name', 'author', 'description', 'published', 'image')
        }),
        ('Relations', {
            'fields': ('language', 'category')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )


@admin.register(Comment)
class CommentAdmin(ModelAdmin):
    list_display = ('id', 'user', 'book', 'text', 'created_at')
    search_fields = ('user__username', 'book__name', 'text')
    list_filter = ('created_at',)
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')
