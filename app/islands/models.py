from django_resized import ResizedImageField #type: ignore
from django.db import models
from extensions.models import AbstractBaseModel

class Island(AbstractBaseModel):
    island_name = models.CharField(max_length=255, verbose_name="Island Name")
    description_pt = models.TextField(max_length=3000, verbose_name="Description in Portuguese", null=True, blank=True)
    description_en = models.TextField(max_length=3000, verbose_name="Description in English", null=True, blank=True)
    cover = ResizedImageField(size=[1024, 768], quality=75, upload_to="island", force_format="WEBP", keep_meta=False, null=True, blank=True)

    def __str__(self) -> str:
        return self.island_name

class County(AbstractBaseModel):
    island = models.ForeignKey(Island, on_delete=models.SET_NULL, null=True, verbose_name="Island")
    county_name = models.CharField(max_length=255, verbose_name="County Name")
    description_pt = models.TextField(max_length=3000, verbose_name="Description in Portuguese", null=True, blank=True)
    description_en = models.TextField(max_length=3000, verbose_name="Description in English", null=True, blank=True)
    cover = ResizedImageField(size=[1024, 768], quality=75, upload_to="county", force_format="WEBP", keep_meta=False, null=True, blank=True)

    def __str__(self) -> str:
        return self.county_name

class Parish(AbstractBaseModel):
    county = models.ForeignKey(County, on_delete=models.SET_NULL, null=True, verbose_name="County")
    parish_name = models.CharField(max_length=255, verbose_name="Parish Name")
    description_pt = models.TextField(max_length=3000, verbose_name="Description in Portuguese", null=True, blank=True)
    description_en = models.TextField(max_length=3000, verbose_name="Description in English", null=True, blank=True)
    cover = ResizedImageField(size=[1024, 768], quality=75, upload_to="parish", force_format="WEBP", keep_meta=False, null=True, blank=True)
    def __str__(self) -> str:
        return self.parish_name
