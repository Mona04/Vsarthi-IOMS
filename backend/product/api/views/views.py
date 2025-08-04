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

    @action (detail = False, methods = ['get'], url_path = 'top-selling')
    def top_selling(self, request):
        top_products = (
            Product.objects
            .annotate(total_sold = Sum('orderitem__quantity'))
            .order_by('-total_sold')[:5]
        )
        data = [
            {
                "product_name" : p.product_name,
                "product_price" : float(p.product_price),
                "stock_quantity": p.stock_quantity,
                "total_sold": p.total_sold or 0
            }
            for p in top_products
        ]
        return Response(data)
    
    @action (detail = False, methods = ['get'], url_path = 'low-stock')
    def low_stock (self, request):
        thresold = 10
        low_stock_products = Product.objects.filter(stock_quantity__lt = thresold)
        serializer = self.get_serializer (low_stock_products, many = True)
        return Response(serializer.data)



class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    @action(detail = False, methods = ['get'], url_path = 'count-this-month')
    def count_this_month (self, request):
        now = timezone.now()
        month_orders = Order.objects.filter(
            created_at__year = now.year,
            created_at__month = now.month
        ).count()
        return Response({"count": month_orders})
    

    @action(detail = False, methods = ['get'], url_path = 'total-revenue')
    def total_revenue(self, request):
        total = OrderItem.objects.aggregate(
            total_revenue = Sum(F('quantity')* F('product__product_price'))

        )['total_revenue'] or 0

        return Response({"total_revenue" : total }) 