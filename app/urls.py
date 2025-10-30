from django.urls import path
from .views import HomeView, BookListView, ProfileView, BookDetailView, LogoutView, LoginView, RegisterView

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('books/', BookListView.as_view(), name='book_list'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('books/<int:pk>/', BookDetailView.as_view(), name='detail'),

    path('logout/', LogoutView.as_view(), name='logout'),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
]
