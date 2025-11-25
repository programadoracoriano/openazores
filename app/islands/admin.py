from django.contrib import admin
from core.admin import admin_site
from islands import models

admin_site.register(models.Island)
admin_site.register(models.County)
admin_site.register(models.Parish)
