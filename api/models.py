from django.db import models
import string
import random

class Worth(models.Model):
    cost = models.CharField(max_length = 30, unique=True)
    
    def __str__(self):
        return str(self.cost)

class Question(models.Model):
    title = models.CharField(max_length=255, unique = True)
    worth = models.ForeignKey(Worth, related_name='worth', on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Choice(models.Model):
    question = models.ForeignKey(Question, related_name="choices", on_delete=models.CASCADE)
    choice = models.CharField("Choice", max_length=50)
    position = models.IntegerField("position")
    is_correct = models.BooleanField(default=False)

    class Meta:
        unique_together = [
            # no duplicated choice per question
            ("question", "choice"), 
            # no duplicated position per question 
            ("question", "position") 
        ]
        ordering = ("position",)

    def __str__(self):
        return self.choice

