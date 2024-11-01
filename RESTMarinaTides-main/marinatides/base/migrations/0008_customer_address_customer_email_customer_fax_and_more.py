# Generated by Django 5.1.1 on 2024-10-29 08:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_boat_cause_sales_customer_referencecode_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='address',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='customer',
            name='email',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='customer',
            name='fax',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='customer',
            name='landline_phone',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='customer',
            name='linked_boat',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='customer',
            name='mobile_phone',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='customer',
            name='newsletter_registration',
            field=models.CharField(blank=True, choices=[('ja', 'Ja'), ('nee', 'Nee')], max_length=20, null=True),
        ),
    ]
