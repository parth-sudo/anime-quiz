from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('create-q/', views.CreateQuestionView.as_view(), name='create-question'),
    path('list-q/', views.ListQuestionView.as_view(), name='question-list'),

    path('create-c/', views.CreateChoiceView.as_view(), name='create-choice'),
    path('list-c/', views.ListChoiceView.as_view(), name='question-choice'),

    path('list-worth/', views.ListWorthView.as_view(), name='worth'),
]
