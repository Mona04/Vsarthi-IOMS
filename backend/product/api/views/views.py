from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from product.models import Product
from product.api.serializers.serializer import ProductSerializer
from product.models import Order
from product.api.serializers.serializer import OrderSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny] 



class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer