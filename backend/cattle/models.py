from django.db import models
from breed.models import Breed


# Create your models here.
class Cattle(models.Model):
    GENDER_CHOICES = [
        ("F", "ماده"),
        ("M", "نر"),
    ]

    ear_tag_number = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=255, null=True, blank=True, verbose_name="نام")
    breed = models.ForeignKey(Breed, on_delete=models.CASCADE, verbose_name="نژاد")
    gender = models.CharField(
        max_length=1, choices=GENDER_CHOICES, verbose_name="جنسیت"
    )
    date_of_birth = models.DateField(verbose_name="تاریخ تولد")
    sire = models.ForeignKey(
        "self",
        related_name="cattle_sire",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="پدر حیوان",
    )
    dam = models.ForeignKey(
        "self",
        related_name="cattle_dam",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="مادر حیوان",
    )
    weight = models.DecimalField(max_digits=6, decimal_places=2, verbose_name="وزن")
    height = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True, verbose_name="قد"
    )
    owner = models.ForeignKey("Owner", on_delete=models.CASCADE, verbose_name="صاحب")
    photo = models.ImageField(
        upload_to="cattle_photos/", null=True, blank=True, verbose_name="عکس"
    )
    microchip_id = models.CharField(
        max_length=100, null=True, blank=True, verbose_name="شماره میکروچیپ"
    )
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True, verbose_name="قیمت"
    )

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "گاو"
        verbose_name_plural = "گاو ها"
        ordering = ["-created"]

    def __str__(self):
        return self.ear_tag_number
