from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from product.models import Product
from product.api.serializers.serializer import ProductSerializer
from product.models import Order, OrderItem
from product.api.serializers.serializer import OrderSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Sum, F


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer



class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    @action(detail = False, method = ['get'], url_path = 'count-this-month')
    def count_this_month (self, request):
        now = timezone.now()
        month_orders = Order.objects.filter(
            created_at__year = now.year,
            created_at__month = now.month
        ).count()
        return Response({"count": month_orders})
    

    @action(detail = False, method = ['get'], url_path = 'total-revenue')
    def total_revenue(self, request):
        total = OrderItem.objects.aggregate(
            total_revenue = Sum(F('quantity')* F('product__price'))

        )['total_revenue'] or 0

        return Response({"total_revenue" : total }) 