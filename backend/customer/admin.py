from django.contrib import admin
from customer.models import Customer,AdminUser

# Register your models here.

admin.site.register(Customer)
admin.site.register(AdminUser)