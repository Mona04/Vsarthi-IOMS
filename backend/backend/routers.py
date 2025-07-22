from rest_framework import routers

# from app.product.views import ProductViewSet
# from app.customer.views import CustomerViewSet
# from app.order.views import OrderViewSet
from customer.api.views.views import CustomerViewSet, AdminUserViewSet


router = routers.DefaultRouter()
# router.register(r'products', ProductViewSet, basename='product')
router.register(r'customers', CustomerViewSet, basename='customer')
router.register(r'admin-users', AdminUserViewSet, basename='admin-user')
# router.register(r'orders', OrderViewSet, basename='order')  

urlpatterns = router.urls