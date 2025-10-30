from django.core.paginator import Paginator
from django.shortcuts import render, redirect
from django.views import View
from .models import Language, Category, Book, User, Comment
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q


class HomeView(View):
    def get(self, request):
        books = Book.objects.all().order_by('-created_at')[:8]
        languages = Language.objects.all()
        categories = Category.objects.all()

        context = {
            'title': 'Home - Bookly',
            'languages': languages,
            'categories': categories,
            'books': books,
        }
        return render(request, 'app/home.html', context)


class BookListView(View):
    def get(self, request):
        languages = Language.objects.all()
        categories = Category.objects.all()
        books = Book.objects.all().order_by('-created_at')

        language_id = request.GET.get('language')
        category_id = request.GET.get('category')
        search_query = request.GET.get('search')

        selected_language = None
        selected_category = None

        if language_id:
            books = books.filter(language_id=language_id)
            selected_language = int(language_id)

        if category_id:
            books = books.filter(category_id=category_id)
            selected_category = int(category_id)

        if search_query:
            books = books.filter(Q(name__icontains=search_query) | Q(author__icontains=search_query))

        paginator = Paginator(books, 8)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)

        context = {
            'title': 'All Books - Bookly',
            'languages': languages,
            'categories': categories,
            'books': page_obj,
            'page_obj': page_obj,
            'selected_language': selected_language,
            'selected_category': selected_category,
            'search_query': search_query or '',
        }
        return render(request, 'app/books.html', context)

class BookDetailView(View):
    def get(self, request, pk):
        book = Book.objects.get(pk=pk)
        comments = book.comments.all().order_by('-created_at')
        data = {
            'title': f'{book.name} - Bookly',
            'book': book,
            'comments': comments,
        }
        return render(request, 'app/detail.html', context=data)
    
    def post(self, request, pk):
        book = Book.objects.get(pk=pk)
        text = request.POST.get('text')

        if text and request.user.is_authenticated:
            book.comments.create(user=request.user, text=text)

        comments = book.comments.all().order_by('-created_at')
        data = {
            'title': f'{book.name} - Bookly',
            'book': book,
            'comments': comments,
        }
        return render(request, 'app/detail.html', context=data)



class ProfileView(LoginRequiredMixin, View):
    login_url = 'login'

    def get(self, request):
        user = request.user
        comments = Comment.objects.filter(user=user).order_by('-created_at')[:5]

        context = {
            'title': 'My Profile - Bookly',
            'user': user,
            'comments': comments,
        }
        return render(request, 'app/profile.html', context)

    def post(self, request):
        user = request.user
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        if username and username != user.username:
            user.username = username
        if email and email != user.email:
            user.email = email

        if password:
            user.set_password(password)

        user.save()
        messages.success(request, "Profile updated successfully ✅")
        return redirect('profile')
    
class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect('home')
    
class LoginView(View):
    def get(self, request):
        return render(request, 'app/login.html', {'title': 'Login - Bookly'})

    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            context = {
                'title': 'Login - Bookly',
                'error': 'Invalid username or password'
            }
            return render(request, 'app/login.html', context)

class RegisterView(View):
    def get(self, request):
        return render(request, 'app/register.html', {'title': 'Register - Bookly'})

    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        if password != confirm_password:
            context = {
                'title': 'Register - Bookly',
                'error': 'Passwords do not match'
            }
            return render(request, 'app/register.html', context)

        if User.objects.filter(username=username).exists():
            context = {
                'title': 'Register - Bookly',
                'error': 'Username already exists'
            }
            return render(request, 'app/register.html', context)

        user = User.objects.create_user(username=username, password=password)
        login(request, user)
        return redirect('home')
