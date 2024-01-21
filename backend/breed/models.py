from django.db import models


# Create your models here.
class Breed(models.Model):
    name = models.CharField(max_length=255, verbose_name="نام")
    origin = models.CharField(max_length=255, verbose_name="مبداً")
    characteristics = models.TextField(verbose_name="خصوصیات")
    average_weight = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name="وزن میانگین",
    )
    life_expectancy = models.IntegerField(
        null=True, blank=True, verbose_name="(سال)طول عمر"
    )
    color = models.CharField(max_length=100, null=True, blank=True, verbose_name="رنگ")

    class Meta:
        verbose_name = "نژاد"
        verbose_name_plural = "نژاد ها"

    def __str__(self):
        return self.name
