from rest_framework import viewsets
from .models import Cattle, BreedingRecord, HealthRecord
from .serializers import (
    CattleSerializer,
    BreedingRecordSerializer,
    HealthRecordSerializer,
)


class CattleViewSet(viewsets.ModelViewSet):
    queryset = Cattle.objects.all()
    serializer_class = CattleSerializer


class BreedingRecordViewSet(viewsets.ModelViewSet):
    queryset = BreedingRecord.objects.all()
    serializer_class = BreedingRecordSerializer


class HealthRecordViewSet(viewsets.ModelViewSet):
    queryset = HealthRecord.objects.all()
    serializer_class = HealthRecordSerializer
