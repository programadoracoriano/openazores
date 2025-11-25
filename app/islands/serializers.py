from rest_framework import serializers
from islands import models

#This is only read serializers

class IslandSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Island
        fields = ("id", "island_name", "description_pt", "description_en")

class CountySerializer(serializers.ModelSerializer):
    island = IslandSerializer()
    class Meta:
        model = models.County
        fields = ("id", "island", "county_name", "description_pt", "description_en")

class ParishSerializer(serializers.ModelSerializer):
    county = CountySerializer()
    class Meta:
        model = models.Parish
        fields = ("id", "county", "parish_name", "description_pt", "description_en")
