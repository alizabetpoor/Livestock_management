from django.contrib import admin
from .models import Owner


# Register your models here.
class Owner_Admin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "phone_number", "email", "created")


admin.site.register(Owner, Owner_Admin)
