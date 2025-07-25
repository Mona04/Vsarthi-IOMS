from django.db import models
from customer.models import Customer
import uuid 

# Create your models here.
class Product(models.Model):
    # sku = models.CharField(max_length=30, unique=True)
    product_name = models.CharField(max_length=100)
    product_price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.PositiveIntegerField()
    isActive = models.BooleanField(default=True)
    description = models.CharField(max_length = 500, default = "des")
  
    created_at = models.DateTimeField(auto_now_add=True)
 

    def __str__(self):
        return f"{self.product_name} - {self.product_name}"

class Order(models.Model):
    STATUS_CHOICES = [("PENDING","Pending"), ("PROCESSING", "Processing"),("SHIPPED", "Shipped"), ("CANCELED", "Canceled"),("DELIVERED" , "Delivered") ]
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    products = models.ManyToManyField(Product, through='OrderItem')

    status = models.CharField(choices = STATUS_CHOICES, default = "PENDING", max_length = 50)

    def __str__(self):
        return f"Order #{self.id} by {self.customer.name}"

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.quantity} x {self.product.product_name} (Order #{self.order.id})"
