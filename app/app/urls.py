from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from extensions.utilities.types import URLPatternsList


urlpatterns: URLPatternsList = [
    path("", include("core.urls")),
    path("api/users/", include("users.urls")),
    path("api/islands/", include("islands.urls")),
    *static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT),
    *static(settings.STATIC_URL, document_root=settings.STATIC_ROOT),
]
