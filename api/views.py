from django.shortcuts import get_object_or_404, render
from rest_framework import generics, status
from .serializers import QuestionSerializer, ChoiceSerializer, WorthSerializer
from .models import Question, Choice, Worth
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

# Create your views here.
def home(request):
    qs = Question.objects.all()
    question = get_object_or_404(Question, pk=1)
    choices = question.choices.all()

    context = {
        'qs' : qs,
        'question' : question,
        'choices' : choices,
    }

    return render(request, 'api/home.html', context)

# Question APIs
class CreateQuestionView(generics.CreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class ListQuestionView(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

# Choices APIs.
class CreateChoiceView(generics.CreateAPIView):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer

class ListChoiceView(generics.ListAPIView):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer

#Worth APIs
class ListWorthView(generics.ListAPIView):
    queryset = Worth.objects.all()
    serializer_class = WorthSerializer