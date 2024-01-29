from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Cattle, BreedingRecord, HealthRecord
from .serializers import (
    CattleSerializer,
    BreedingRecordSerializer,
    HealthRecordSerializer,
)


class CattleViewSet(viewsets.ModelViewSet):
    queryset = Cattle.objects.all()
    serializer_class = CattleSerializer

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
    serializer_class = BreedingRecordSerializer


class HealthRecordViewSet(viewsets.ModelViewSet):
    queryset = HealthRecord.objects.all()
    serializer_class = HealthRecordSerializer
