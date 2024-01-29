from rest_framework import serializers
from .models import Cattle, BreedingRecord, HealthRecord


class CattleSerializer(serializers.ModelSerializer):
    gender_display = serializers.SerializerMethodField()

    class Meta:
        model = Cattle
        fields = "__all__"
        depth = 1

    def get_gender_display(self, obj):
        return obj.get_gender_display()


class BreedingRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = BreedingRecord
        fields = "__all__"
        depth = 1


class HealthRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthRecord
        fields = "__all__"
        depth = 1
