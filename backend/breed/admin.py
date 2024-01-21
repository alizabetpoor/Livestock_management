from django.contrib import admin
from .models import Breed


# Register your models here.
class Breed_Admin(admin.ModelAdmin):
    list_display = ("name", "origin", "average_weight", "life_expectancy", "color")


admin.site.register(Breed, Breed_Admin)
