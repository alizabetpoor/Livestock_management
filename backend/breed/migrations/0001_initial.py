# Generated by Django 5.0.1 on 2024-01-22 06:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Breed',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='نام')),
                ('origin', models.CharField(max_length=255, verbose_name='مبداً')),
                ('characteristics', models.TextField(verbose_name='خصوصیات')),
                ('average_weight', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True, verbose_name='وزن میانگین')),
                ('life_expectancy', models.IntegerField(blank=True, null=True, verbose_name='(سال)طول عمر')),
                ('color', models.CharField(blank=True, max_length=100, null=True, verbose_name='رنگ')),
            ],
            options={
                'verbose_name': 'نژاد',
                'verbose_name_plural': 'نژاد ها',
            },
        ),
    ]
