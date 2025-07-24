from product.models import Order
from product.models import OrderItem
from rest_framework import serializers
from product.models import Product
# from .serializer import ProductSerializer
from customer.models import Customer



class ProductSerializer(serializers.ModelSerializer):


    class Meta:
        model= Product
        fields = ['id', 'product_name', 'product_price', 'description', 'stock_quantity', 'created_at', 'sku']




class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        write_only=True
    )

    class Meta:
        model = OrderItem
        fields = ['product', 'product_id', 'quantity']




class OrderSerializer(serializers.ModelSerializer):
    customer_id = serializers.PrimaryKeyRelatedField(
        queryset=Customer.objects.all(),
        source='customer'
    )
    items = OrderItemSerializer(source='orderitem_set', many=True)

    class Meta:
        model = Order
        fields = ['id', 'customer_id', 'created_at', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('orderitem_set')
        order = Order.objects.create(**validated_data)

        for item in items_data:
            OrderItem.objects.create(
                order=order,
                product=item['product'],
                quantity=item['quantity']
            )
        return order
 