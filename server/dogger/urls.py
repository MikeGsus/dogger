from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from dogger import views

urlpatterns = [
    path('breeds/', views.Breeds.as_view()),
    path('auth/login', views.AuthTokenWithExtraInfo.as_view()),
    path('users/', views.UsersView.as_view()),
    path('users/<int:pk>/', views.UsersDetailsView.as_view()),
    path('dogs/', views.DogsView.as_view()),
    path('dogs/<int:pk>/', views.DogsDetailsView.as_view()),
    path('dog-size/', views.DogSizeView.as_view()),
    path('dog-size/<int:pk>/', views.DogSizeDetailsView.as_view()),
    path('schedule/', views.SchedulesView.as_view()),
    path('schedule/<int:pk>/', views.SchedulesDetailsView.as_view()),
    path('scheduled-walks/', views.ScheduledWalksView.as_view()),
    path('scheduled-walks/<int:pk>/', views.ScheduledWalksDetailsView.as_view()),
    path('walkers/', views.WalkersView.as_view()),
    path('walkers/<int:pk>/', views.WalkersDetailsView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)