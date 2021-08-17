from rest_framework import serializers
from .models import Question, Choice, Worth


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'worth', 'title']


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['question', 'choice', 'position', 'is_correct']

class WorthSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worth
        fields = ['id', 'cost']
