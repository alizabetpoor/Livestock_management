from rest_framework import serializers
from .models import Cattle, BreedingRecord, HealthRecord
from breed.serializers import BreedSerializer


class CattleGetSerializer(serializers.ModelSerializer):
    gender_display = serializers.SerializerMethodField()

    class Meta:
        model = Cattle
        fields = "__all__"
        depth = 1

    def get_gender_display(self, obj):
        return obj.get_gender_display()


class CattleCreateSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(allow_null=True)

    # def create(self, validated_data):
    #     # Debug print to check what's in validated_data
    #     print(validated_data)
    #     return super().create(validated_data)

    class Meta:
        model = Cattle
        fields = "__all__"


class BreedingRecordGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = BreedingRecord
        fields = "__all__"
        depth = 1


class BreedingRecordCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BreedingRecord
        fields = "__all__"


class HealthRecordGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthRecord
        fields = "__all__"
        depth = 1


class HealthRecordCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = HealthRecord
        fields = "__all__"


class CattleAggregateSerializer(serializers.Serializer):
    total_number_of_cattles = serializers.IntegerField()
    total_number_of_cows = serializers.IntegerField()
    total_number_of_bulls = serializers.IntegerField()
    average_weight_of_cattles = serializers.DecimalField(
        max_digits=30, decimal_places=2
    )
    average_age_of_cattles = serializers.DecimalField(max_digits=30, decimal_places=2)
    average_price_of_cattles = serializers.DecimalField(max_digits=30, decimal_places=2)
    total_price_of_cattles = serializers.DecimalField(max_digits=30, decimal_places=2)


class CattleChartDataSerializer(serializers.Serializer):
    breed__name = serializers.CharField()
    gender = serializers.CharField()
    count = serializers.IntegerField()
