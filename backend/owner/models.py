from django.db import models


# Create your models here.
class Owner(models.Model):
    first_name = models.CharField(max_length=255, verbose_name="نام")
    last_name = models.CharField(max_length=255, verbose_name="نام خانوادگی")
    phone_number = models.CharField(max_length=50, verbose_name="شماره موبایل")
    email = models.EmailField(max_length=254, verbose_name="ایمیل")
    address = models.TextField(verbose_name="آدرس")
    company_name = models.CharField(
        max_length=255, null=True, blank=True, verbose_name="نام شرکت"
    )
    website = models.URLField(
        max_length=200, null=True, blank=True, verbose_name="آدرس وبسایت"
    )
    profile_picture = models.ImageField(
        upload_to="owner_profiles/", null=True, blank=True, verbose_name="عکس پروفایل"
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "صاحب"
        verbose_name_plural = "صاحب ها"
        ordering = ["-created"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
