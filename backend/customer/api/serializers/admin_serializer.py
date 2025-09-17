from rest_framework import serializers
from customer.models import AdminUser
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email','password']



class AdminSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = AdminUser
        fields = ['id', 'user']
        read_only_fields = ['id']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        password = user_data.pop('password')
        username=user_data['username']
        email=user_data['email']
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError("Username already exists")

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email already in use")

        user = User(**user_data)
        user.set_password(password)   # auto-hash the password
        user.is_staff=True    
        user.is_active=True
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

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()



 