import uuid
from django.contrib.auth.models import User
from django.db.models import fields
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from dogger.models import *
from dogger.models import Users as UsersModel
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User as Auth

class BreedsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Breed
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
        depth = 1

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

class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)
    phone = serializers.CharField(max_length=10)
    password = serializers.CharField(min_length=8)
    confirmPassword = serializers.CharField(min_length=8)
    owner = serializers.BooleanField()
    walker = serializers.BooleanField()

    def validate(self, data):
        if data['password'] != data['confirmPassword']:
            raise ValidationError('Las contraseñas no coinciden.')
        if data['owner'] and data['walker'] or data['owner'] == False and data['walker'] == False:
            raise ValidationError('Necesitas seleccionar un tipo a la vez (OWNER o WALKER).')
        name = data['name']
        email = data['email']
        password = data['password']
        try:
            user = Auth.objects.get(email=email)
            raise ValidationError('Ya existe un usuario con ese correo electronico.')
        except Auth.DoesNotExist:
            username = uuid.uuid4().hex[:30]
            user = Auth.objects.create_user(username, email, password)
            user.save()
            user_info = {
                'email': email,
                'name': name,
                'last_name': data['last_name'],
                'phone': data['phone'],
                'owner': data['owner'],
                'walker': data['walker']
            }
            u = UsersModel.objects.create(
                account=user,
                **user_info
            )
            token, _ = Token.objects.get_or_create(user=user)
        return {
            **data,
            'token': token.key,
            'user': u
        }


class AuthCustomTokenSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False)
    password = serializers.CharField(required=False)
    
    def validate(self, attrs):
        email_or_username = attrs.get('email')
        password = attrs.get('password')
        if email_or_username and password:
            try:
                user_request = User.objects.get(email=email_or_username)
                email_or_username = user_request.username
                user = authenticate(username=email_or_username, password=password)
                if user:
                    if not user.is_active:
                        msg = 'Cuenta Deshabilitada'
                        raise ValidationError(msg)
                else:
                    msg = 'No se puede iniciar sesión con las credenciales proporcionadas.'
                    raise ValidationError(msg)
            except User.DoesNotExist:
                msg = 'No se puede iniciar sesión con las credenciales proporcionadas.'
                raise ValidationError(msg)
        else:
            msg = 'No se puede iniciar sesión con las credenciales proporcionadas.'
            raise ValidationError(msg)
        attrs['user'] = user
        return attrs
