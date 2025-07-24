from rest_framework import viewsets, status
from rest_framework.response import Response
from customer.api.serializers.serializers import CustomerSerializer
from customer.models import Customer
from customer.models import AdminUser
from customer.api.serializers.serializers import AdminUserSerializer



class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    # customer list
    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


    # customer detail view
    def retrieve(self, request, pk=None):
        customer = self.get_object()
        serializer = self.get_serializer(customer)
        return Response(serializer.data)


    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        print(request.data)
        serializer.is_valid(raise_exception=True)
        print("this is one.............")
        serializer.save()
        # self.perform_create(serializer)
        print("this is 2..................")
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        customer = self.get_object()
        serializer = self.get_serializer(customer, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        customer = self.get_object()
        self.perform_destroy(customer)
        return Response(status=status.HTTP_204_NO_CONTENT)
    


class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = AdminUser.objects.all()
    serializer_class = AdminUserSerializer
