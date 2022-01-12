from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models.fields import EmailField

# Create your models here.=

class Breed(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Users(models.Model):
    account = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    last_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=10)
    walker = models.BooleanField(default=False)
    owner = models.BooleanField(default=False)
    avatar = models.ImageField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__ (self):
         return f"{self.name} {self.last_name}"

class Dogs(models.Model):
    name = models.CharField(max_length=50)
    age = models.IntegerField()
    size = models.ForeignKey('DogSize', on_delete=models.DO_NOTHING)
    owner = models.ForeignKey('Users', on_delete=models.CASCADE)
    breed = models.ForeignKey(to="Breed", on_delete=models.DO_NOTHING)
    walker = models.ForeignKey('Walkers', null=True, blank=True, on_delete=models.SET_NULL)

    def __str__ (self):
        return self.name

class DogSize(models.Model):
    size = models.CharField(max_length=8)

    def __str__ (self):
        return self.size

class Schedules(models.Model):
    day_of_week = models.CharField(max_length=10, default='Monday',
        choices=(('monday', 'Monday'),
            ('tuesday', 'Tuesday'),
            ('wednesday', 'Wednesday'),
            ('thursday', 'Thursday'),
            ('friday', 'Friday'),
            ('saturday', 'Saturday'),
            ('sunday', 'Sunday')))
    start_hour = models.TimeField()
    end_hour = models.TimeField()
    size = models.ForeignKey('DogSize', null=True, blank=True, on_delete=models.SET_NULL)

class ScheduledWalks(models.Model):
    schedule = models.ForeignKey('Schedules', on_delete=models.CASCADE)
    dog = models.ForeignKey('Dogs', on_delete=models.CASCADE)
    walker = models.ForeignKey('Walkers', on_delete=models.CASCADE)

    def __str__(self):
        return self.schedule.day_of_week

class Walkers(models.Model):
    walker = models.ForeignKey('Users', on_delete=models.CASCADE)
    schedules = models.ManyToManyField('Schedules')

    def __str__(self):
        return self.walker.name