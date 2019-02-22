# Generated by Django 2.1.2 on 2018-11-01 06:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Batter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('player', models.TextField(blank=True, null=True)),
                ('year', models.IntegerField(blank=True, null=True)),
                ('team', models.TextField(blank=True, null=True)),
                ('position', models.TextField(blank=True, null=True)),
                ('hit', models.IntegerField(blank=True, null=True)),
                ('secbase', models.IntegerField(blank=True, null=True)),
                ('thrbase', models.IntegerField(blank=True, null=True)),
                ('homerun', models.IntegerField(blank=True, null=True)),
                ('fourballs', models.IntegerField(blank=True, null=True)),
                ('onbase', models.FloatField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Pitcher',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('player', models.TextField(blank=True, null=True)),
                ('year', models.IntegerField(blank=True, null=True)),
                ('team', models.TextField(blank=True, null=True)),
                ('inning', models.FloatField(blank=True, null=True)),
                ('strikeout', models.FloatField(blank=True, null=True)),
                ('onbase', models.FloatField(blank=True, null=True)),
            ],
        ),
    ]