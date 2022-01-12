from django.shortcuts import render
from django.contrib.auth.models import User as Auth
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.http import Http404
from dogger.serializers import *
from dogger.models import Users as UsersModel
from dogger.models import Dogs as DogsModel
from dogger.models import DogSize as DogSizeModel
from dogger.models import Schedules as SchedulesModel
from dogger.models import ScheduledWalks as ScheduledWalksModel
from dogger.models import Walkers as WalkersModel
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.dispatch import receiver
from django.conf import settings
from django.db.models.signals import post_save
# from datetime import datetime, time
from rest_framework.authentication import TokenAuthentication


class UserDogs(APIView):
	"""
		Controller to retreive dogs by user
	"""

	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

	def get(self, request, *args, **kwargs):
		owner_id = self.kwargs.get('pk')
		dogs = Dogs.objects.filter(owner=owner_id)
		serializer = DogSerializer(dogs, many=True)
		return Response(serializer.data)

class UserScheduleWalks(APIView):
	"""
		Controller to retreive schedule walks by user
	"""

	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

	def get(self, request, *args, **kwargs):
		owner_id = self.kwargs.get('pk')
		scheduleWalks = None
		scheduleWalks = ScheduledWalks.objects.filter(dog__owner=owner_id)
		print(len(scheduleWalks))
		if len(scheduleWalks) == 0:
			scheduleWalks = ScheduledWalks.objects.filter(walker__walker=owner_id)
			print(scheduleWalks)
		serializer = ScheduledWalkSerializer(scheduleWalks, many=True)
		return Response(serializer.data)

class Breeds(APIView):

	def get(self, request, *args, **kwargs):
		breeds = Breed.objects.all()
		serializer = BreedsSerializer(breeds, many=True)
		return Response(serializer.data)

class AuthTokenWithExtraInfo(ObtainAuthToken):
	def post(self, request, *args, **kwargs):
		serializer = AuthCustomTokenSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		try:
			data = serializer.validated_data['user']
			user_email = data.email
			user = Auth.objects.get(email=user_email)
			token, created = Token.objects.get_or_create(user=user)
			u = UsersModel.objects.get(account=user)
			response_data = {
				"token": token.key,
				"user": UserSerializer(u).data,
			}
			return Response(response_data)
		except (User.DoesNotExist, UsersModel.DoesNotExist):
			return Response(
				{
					"success": False,
					"error": f"Usuario con email {user_email} no existe.",
					"status": status.HTTP_404_NOT_FOUND,
				}
			)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
	if created:
		Token.objects.create(user=instance)


class UsersView(APIView):

	def get(self, request, format=None):
		users = UsersModel.objects.all()
		serializer = UserSerializer(users, many=True)
		return Response(serializer.data)
	
	def post(self, request, *args, **kwargs):
		serializer = RegisterSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		return Response({
			"success": True,
			"token": serializer.validated_data['token'],
			"user": UserSerializer(serializer.validated_data['user']).data,
			"status": status.HTTP_201_CREATED
		})


class UsersDetailsView(APIView):
	"""
	Retrieve, update or delete a user instance.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get_object(self, pk):
		try:
			return UsersModel.objects.get(pk=pk)
		except Users.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = UserSerializer(user)
		return Response(serializer.data)
	
	def put(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = UserSerializer(user, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None):
		account = Auth.objects.filter(pk)
		account.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

class DogsView(APIView):
	"""
	List all users, or create new user.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get(self, request, format=None):
		users = DogsModel.objects.all()
		serializer = DogSerializer(users, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):
		serializer = DogSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return  Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DogsDetailsView(APIView):
	"""
	Retrieve, update or delete a dog instance.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get_object(self, pk):
		try:
			return DogsModel.objects.get(pk=pk)
		except Dogs.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = DogSerializer(user)
		return Response(serializer.data)
	
	def put(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = DogSerializer(user, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None):
		user = self.get_object(pk)
		user.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

class DogSizeView(APIView):
	"""
	List all dog sizes
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get(self, request, format=None):
		users = DogSizeModel.objects.all()
		serializer = DogSizeSerializer(users, many=True)
		return Response(serializer.data)

class DogSizeDetailsView(APIView):
	"""
	List a dog size instance.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get_object(self, pk):
		try:
			return DogSizeModel.objects.get(pk=pk)
		except DogSize.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = DogSizeSerializer(user)
		return Response(serializer.data)

class SchedulesView(APIView):
	"""
	List all schedules, create new schedules.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get(self, request, format=None):
		users = SchedulesModel.objects.all()
		serializer = ScheduleSerializer(users, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):
		serializer = ScheduleSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return  Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SchedulesDetailsView(APIView):
	"""
	Retrieve, update or delete a schedule instance.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get_object(self, pk):
		try:
			return SchedulesModel.objects.get(pk=pk)
		except Schedules.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = ScheduleSerializer(user)
		return Response(serializer.data)
	
	def put(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = ScheduleSerializer(user, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None):
		user = self.get_object(pk)
		user.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

class ScheduledWalksView(APIView):
	"""
	List all scheduled walks, create a new scheduled walk.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get(self, request, format=None):
		users = ScheduledWalksModel.objects.all()
		serializer = ScheduledWalkSerializer(users, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):
		dog_id = request.data.get('dog', None)
		walker_id = request.data.get('walker', None)
		schedule_id = request.data.get('schedule', None)
		try:
			dog = Dogs.objects.get(id=dog_id)
			walker = Walkers.objects.get(id=walker_id)
			schedule = Schedules.objects.get(id=schedule_id)
			# validate that the dog size is accepted in that particular schedule
			if dog.size == schedule.size:
				# get current walker scheduleWalks
				# use to accept only 3 dogs at the time and nothing more
				# if the schedule are empty the scheduleWalks is register success
				scheduleWalksIn = ScheduledWalks.objects.filter(walker=walker, schedule=schedule)
				if len(scheduleWalksIn) < 3:
					r = ScheduledWalks(dog=dog, walker=walker, schedule=schedule)
					r.save()
					serializer = ScheduledWalkSerializer(r)
					return Response(serializer.data, status=status.HTTP_201_CREATED)
				else:
					return Response({
						'success': False,
						'error': 'Lo sentimos este walker tiene lleno los servicios en este horario prueba en otro horario.',
					})
			else:
				return Response({
					'success': False,
					'error': 'El tamaño del perro no es aceptado en ese horario prueba en otro horario.',
				})
		except (Dogs.DoesNotExist, Walkers.DoesNotExist, Schedules.DoesNotExist):
			return Response({
					'success': False,
					'error': 'No se encontro dog o walker o schedule para generar el registro.'
				})
	
class ScheduledWalksDetailsView(APIView):
	"""
	Retrieve, update or delete a scheduled walk instance.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get_object(self, pk):
		try:
			return ScheduledWalksModel.objects.get(pk=pk)
		except ScheduledWalks.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = ScheduledWalkSerializer(user)
		return Response(serializer.data)
	
	def put(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = ScheduledWalkSerializer(user, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None):
		user = self.get_object(pk)
		user.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

class WalkersView(APIView):
	"""
	List all walkers, create a new walker.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get(self, request, format=None):
		# def is_time_between(begin_time, end_time, check_time=None):
		# 	# If check time is not given, default to current UTC time
		# 	check_time = check_time or datetime.utcnow().time()
		# 	if begin_time < end_time:
		# 		return check_time >= begin_time and check_time <= end_time
		# 	else: # crosses midnight
		# 		return check_time >= begin_time or check_time <= end_time

		# Original test case from OP
		# print('IS BETWEEN:', is_time_between(time(10,30), time(16,30), time(8,00)))

		# Test case when range crosses midnight
		# print('IS BETWEEN:', is_time_between(time(22,0), time(4,00), time(3,59)))
		# return Response('ok')

		users = WalkersModel.objects.all()
		serializer = WalkerSerializer(users, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):
		serializer = WalkerSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return  Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WalkersDetailsView(APIView):
	"""
	Retrieve, update or delete a walker instance.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get_object(self, pk):
		try:
			return WalkersModel.objects.get(pk=pk)
		except Walkers.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = WalkerSerializer(user)
		return Response(serializer.data)

	def put(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = WalkerSerializer(user, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None):
		user = self.get_object(pk)
		user.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)