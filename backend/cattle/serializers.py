from rest_framework import serializers
from .models import Cattle, BreedingRecord, HealthRecord


class CattleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cattle
        fields = "__all__"


class BreedingRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = BreedingRecord
        fields = "__all__"


class HealthRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthRecord
        fields = "__all__"
