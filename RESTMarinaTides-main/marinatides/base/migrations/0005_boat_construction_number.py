# Generated by Django 5.1.1 on 2024-10-28 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_boat_ce_rating_boat_condition_boat_construction_year_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='boat',
            name='construction_number',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
