# Generated by Django 3.2.2 on 2021-09-22 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210922_2004'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='hint',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='question',
            name='trivia',
            field=models.TextField(blank=True, default=''),
        ),
    ]