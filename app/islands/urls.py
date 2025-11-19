from django.urls import path
from extensions.utilities.types import URLPatternsList
from islands import api_views


app_name = "islands"

#Going to put api url's here
#TODO: Api urls needs to be on another file due to organization
urlpatterns: URLPatternsList = [
    path("", api_views.ListIslandsView.as_view(), name="island-list"),
    path("<uuid:island_id>/county/", api_views.ListCountyView.as_view(), name="county-list"),
    path("<uuid:island_id>/county/<uuid:county_id>/parish/", api_views.ListParishView.as_view(), name="parish-list")
]
