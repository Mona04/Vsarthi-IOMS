from rest_framework import routers

from product.api.views.views import ProductViewSet, OrderViewSet
from customer.api.views.views import CustomerViewSet
from customer.api.views.views import CustomerViewSet, AdminUserViewSet
from customer.api.views.admin_views import LoginViewSet ,AdminViewSet

router = routers.DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'customers', CustomerViewSet, basename='customer')
router.register(r'admin-users', AdminViewSet, basename='admin-user')
router.register(r'login',LoginViewSet,basename = 'login' )
router.register(r'orders', OrderViewSet, basename='order')  

urlpatterns = router.urls