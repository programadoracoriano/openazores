from django.db import models
from extensions.models import AbstractBaseModel

class Island(AbstractBaseModel):
    island_name = models.CharField(max_length=255, verbose_name="Island Name")
    description_pt = models.TextField(max_length=3000, verbose_name="Description in Portuguese")
    description_en = models.TextField(max_length=3000, verbose_name="Description in English")

    def __str__(self) -> str:
        return self.island_name

class County(AbstractBaseModel):
    island = models.ForeignKey(Island, on_delete=models.SET_NULL, null=True, verbose_name="Island")
    county_name = models.CharField(max_length=255, verbose_name="County Name")
    description_pt = models.TextField(max_length=3000, verbose_name="Description in Portuguese")
    description_en = models.TextField(max_length=3000, verbose_name="Description in English")

    def __str__(self) -> str:
        return self.county_name

class Parish(AbstractBaseModel):
    county = models.ForeignKey(County, on_delete=models.SET_NULL, null=True, verbose_name="County")
    parish_name = models.CharField(max_length=255, verbose_name="Parish Name")
    description_pt = models.TextField(max_length=3000, verbose_name="Description in Portuguese")
    description_en = models.TextField(max_length=3000, verbose_name="Description in English")

    def __str__(self) -> str:
        return self.parish_name
