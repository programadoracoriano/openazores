from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from extensions.models import AbstractBaseModel
from extensions.models.mixins import SoftDeleteMixin
from users.managers import UserManager


class User(AbstractBaseUser, PermissionsMixin, SoftDeleteMixin, AbstractBaseModel):
    """
    The concrete user class that will be used in the database.

    By default, implements a `username` field, and `is_staff` and `is_active` status, alongside everything provided by
    the `BaseAbstractModel`.
    """

    email = models.CharField(unique=True, max_length=255)

    is_active = models.BooleanField(
        default=True, help_text="Designates the user as active.", verbose_name="active status"
    )
    is_staff = models.BooleanField(
        default=False, help_text="Designates this user as a staff member.", verbose_name="staff status"
    )

    USERNAME_FIELD = "email"
    objects = UserManager()

    class Meta(AbstractBaseModel.Meta): ...

    def __str__(self) -> str:
        return f"User ({self.id}) {self.get_username()}"


class UserProfile(AbstractBaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="User")
    name = models.CharField(max_length=255, verbose_name="Name")
    address = models.CharField(max_length=255, verbose_name="Address")
    city = models.CharField(max_length=255, verbose_name="City")
    country = models.CharField(max_length=255, verbose_name="Country")
    phone_number = models.CharField(max_length=12, verbose_name="Phone Number")

    def __str__(self) -> str:
        return self.name
