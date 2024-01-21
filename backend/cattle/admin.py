from django.contrib import admin
from .models import Cattle, BreedingRecord, HealthRecord


# Register your models here.
class Cattle_Admin(admin.ModelAdmin):
    list_display = (
        "ear_tag_number",
        "breed",
        "gender",
        "date_of_birth",
        "weight",
        "BreedingRecord",
    )


class BreedingRecord_Admin(admin.ModelAdmin):
    list_display = ("bull", "cow", "breeding_date", "expected_calving_date")


class HealthRecord_Admin(admin.ModelAdmin):
    list_display = ("cattle", "checkup_date", "health_notes", "treatments", "diagnosis")


admin.site.register(Cattle, Cattle_Admin)
admin.site.register(BreedingRecord, BreedingRecord_Admin)
admin.site.register(HealthRecord, HealthRecord_Admin)
