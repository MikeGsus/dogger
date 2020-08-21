from rest_framework import routers, serializers, viewsets
from ./models import Users,
Dogs,
DogSize,
Schedules,
ScheduledWalks,
Walkers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

class DogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dogs
        fields = '__all__'
        depth = 1

class DogSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DogSize
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedules
        fields = '__all__'
        depth = 1

class ScheduledWalkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduledWalks
        fields = '__all__'
        depth = 3

class WalkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Walkers
        fields = '__all__'
        depth = 5
