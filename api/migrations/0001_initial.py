# Generated by Django 3.2.2 on 2021-09-22 14:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Worth',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cost', models.CharField(max_length=30, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, unique=True)),
                ('trivia', models.TextField(blank=True, default='')),
                ('hint', models.CharField(default='', max_length=255)),
                ('worth', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='worth', to='api.worth')),
            ],
        ),
        migrations.CreateModel(
            name='Choice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('choice', models.CharField(max_length=50, verbose_name='Choice')),
                ('position', models.IntegerField(verbose_name='position')),
                ('is_correct', models.BooleanField(default=False)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='choices', to='api.question')),
            ],
            options={
                'ordering': ('position',),
                'unique_together': {('question', 'choice'), ('question', 'position')},
            },
        ),
    ]