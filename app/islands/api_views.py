from django.db.models.query import QuerySet
from rest_framework import generics, status
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied, NotFound
from drf_spectacular.utils import OpenApiResponse, extend_schema, extend_schema_view
from islands import models, serializers

@extend_schema(tags=["Islands"])
class ListIslandsView(generics.ListAPIView):
    serializer_class = serializers.IslandSerializer
    queryset = models.Island.objects.all()


@extend_schema(tags=["Islands"])
class ListCountyView(generics.ListAPIView):
    serializer_class = serializers.CountySerializer

    def get_queryset(self):
        island_id = self.kwargs["island_id"]
        return models.County.objects.filter(island_id=island_id)

@extend_schema(tags=["Islands"])
class ListParishView(generics.ListAPIView):
    serializer_class = serializers.ParishSerializer

    def get_queryset(self):
        island_id = self.kwargs["island_id"]
        county_id = self.kwargs["county_id"]
        return models.Parish.objects.filter(county__island_id=island_id, county_id=county_id)
