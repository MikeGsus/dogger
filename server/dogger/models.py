from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Users(models.Model):
    account = models.ForeignKey('auth.User', related_name='account', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    age = models.IntegerField()
    email = models.EmailField(unique=True)
    walker = models.BooleanField(default=False)
    owner = models.BooleanField(default=False)
    avatar = models.ImageField(null=True, blank=True)
    address = models.CharField(max_length=500)
    timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)

    def __str__ (self):
        return "%s %s" % (self.name, self.last_name)

class Dogs(models.Model):
    name = models.CharField(max_length=50)
    age = models.IntegerField()
    size = models.ForeignKey('DogSize', on_delete=models.DO_NOTHING)
    owner = models.ForeignKey('Users', on_delete=models.CASCADE)
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
    hour = models.PositiveSmallIntegerField(validators=[MinValueValidator(7), MaxValueValidator(20)])
    size = models.ForeignKey('DogSize', null=True, blank=True, on_delete=models.SET_NULL)

class ScheduledWalks(models.Model):
    schedule = models.ForeignKey('Schedules', on_delete=models.CASCADE)
    dog = models.ForeignKey('Dogs', on_delete=models.CASCADE)

    def __str__(self):
        return self.schedule

class Walkers(models.Model):
    walker = models.ForeignKey('Users', on_delete=models.CASCADE)
    schedules = models.ManyToManyField('Schedules')

    def __str__(self):
        return self.walker
