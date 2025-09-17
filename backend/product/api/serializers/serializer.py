from rest_framework import serializers
from product.models import Order, OrderItem, Product
from customer.models import Customer


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'  # to serialize all fields of the Product model


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)   # Nested serialization to get product details
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        write_only=True
    )

    class Meta:
        model = OrderItem
        fields = ['product', 'product_id', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    customer_id = serializers.PrimaryKeyRelatedField(
        queryset=Customer.objects.all(),
        source='customer',
        write_only=True
    )
    customer = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Order
        fields = ["id", "customer_id", "customer", "items", "created_at", "status"]

    def get_items(self, obj):
        order_items = OrderItem.objects.filter(order=obj)
        return OrderItemSerializer(order_items, many=True).data

    def create(self, validated_data):
        items_data = self.initial_data.get('items', [])
        order = Order.objects.create(**validated_data)
        for item in items_data:
            product = Product.objects.get(pk=item['product_id'])
            quantity = item['quantity']
            if product.stock_quantity < quantity:
                raise serializers.ValidationError(
                    f"Not enough stock for product {product.product_name}"
                )
            product.stock_quantity -= quantity
            product.save()
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity
            )
        return order

    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance
    

# request JSON format for creating an order -> 
# response JSON format for retrieving an order -> 
# request JSON format for updating an order status
