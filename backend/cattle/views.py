from rest_framework import viewsets
from rest_framework import status
from .models import Cattle, BreedingRecord, HealthRecord
from .serializers import (
    CattleGetSerializer,
    CattleCreateSerializer,
    BreedingRecordGetSerializer,
    BreedingRecordCreateSerializer,
    HealthRecordGetSerializer,
    HealthRecordCreateSerializer,
    CattleAggregateSerializer,
    CattleChartDataSerializer,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Avg, Sum, Count
from django.db.models.functions import ExtractYear
from datetime import date


class CattleViewSet(viewsets.ModelViewSet):
    queryset = Cattle.objects.all()
    # serializer_class = CattleSerializer

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CattleCreateSerializer
        else:
            return CattleGetSerializer

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)

    #     # After deleting the cattle instance, retrieve the updated list of cattle
    #     updated_queryset = self.queryset.exclude(id=instance.id)[:20]
    #     serializer = self.get_serializer(updated_queryset, many=True)

    #     # Return the list of cattle with a 200 OK status
    #     return Response(serializer.data, status=status.HTTP_200_OK)


class BreedingRecordViewSet(viewsets.ModelViewSet):
    queryset = BreedingRecord.objects.all()

    def get_serializer_class(self):
        if self.request.method == "POST":
            return BreedingRecordCreateSerializer
        else:
            return BreedingRecordGetSerializer


class HealthRecordViewSet(viewsets.ModelViewSet):
    queryset = HealthRecord.objects.all()

    def get_serializer_class(self):
        if self.request.method == "POST":
            return HealthRecordCreateSerializer
        else:
            return HealthRecordGetSerializer


class CattleAggregateView(APIView):
    def get(self, request, *args, **kwargs):
        current_year = date.today().year

        cattles = Cattle.objects.all()
        cows = Cattle.objects.filter(gender="F")

        aggregate_cows_data = cows.aggregate(
            total_number_of_cows=Count("id"),
        )

        # Aggregate data
        aggregate_data = cattles.aggregate(
            total_number_of_cattles=Count("id"),
            average_weight_of_cattles=Avg("weight"),
            total_price_of_cattles=Sum("price"),
        )

        # Calculate the average age of cows
        average_age_of_cattles = cattles.annotate(
            age=current_year - ExtractYear("date_of_birth")
        ).aggregate(average_age_of_cattles=Avg("age"))["average_age_of_cattles"]

        # Calculate the average price of cows
        average_price_of_cattles = (
            aggregate_data["total_price_of_cattles"]
            / aggregate_data["total_number_of_cattles"]
            if aggregate_data["total_number_of_cattles"] > 0
            else 0
        )

        # Construct the response data
        response_data = {
            "total_number_of_cattles": aggregate_data["total_number_of_cattles"],
            "total_number_of_cows": aggregate_cows_data["total_number_of_cows"],
            "total_number_of_bulls": aggregate_data["total_number_of_cattles"]
            - aggregate_cows_data["total_number_of_cows"],
            "average_weight_of_cattles": round(
                aggregate_data["average_weight_of_cattles"], 2
            ),
            "average_age_of_cattles": round(average_age_of_cattles, 2),
            "average_price_of_cattles": round(average_price_of_cattles, 2),
            "total_price_of_cattles": round(
                aggregate_data["total_price_of_cattles"], 2
            ),
        }

        # Serialize the response data
        serializer = CattleAggregateSerializer(data=response_data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data)


class CattleChartView(APIView):
    def get(self, request, *args, **kwargs):
        # Aggregate cattle counts by breed and gender
        chart_data = (
            Cattle.objects.values("breed__name", "gender")
            .annotate(count=Count("id"))
            .order_by("breed__name")
        )
        # Serialize the chart data
        serializer = CattleChartDataSerializer(chart_data, many=True)

        return Response(serializer.data)
