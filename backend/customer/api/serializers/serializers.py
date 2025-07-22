from rest_framework import serializers
from customer.models import Customer
from customer.models import AdminUser
from django.contrib.auth.models import User

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

class AdminUserSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = AdminUser
        fields = ['id', 'user', 'is_superuser']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        password = user_data.pop('password')

        user = User(**user_data)
        user.set_password(password)  
        user.save()

        admin_user = AdminUser.objects.create(user=user, **validated_data)
        return admin_user

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            password = user_data.pop('password', None)
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            if password:
                instance.user.set_password(password)  
            instance.user.save()

        instance.is_superuser = validated_data.get('is_superuser', instance.is_superuser)
        instance.save()
        return instance