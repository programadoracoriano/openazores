from unittest import skipIf
from django.test import TestCase
from users.managers import UserManager
from users.models import User
from users.tests import VALID_PASSWORD


@skipIf(not isinstance(User.objects, UserManager), "Different UserManager applied.")
class TestUserManager(TestCase):
    """
    Test the UserManager. To do this, we use our user model. These tests are skipped if the current user model uses a
    different UserManager.
    """

    def test_create_user(self) -> None:
        """Test creating a normal user."""
        email = "email@email.com"
        password = VALID_PASSWORD
        user = User.objects.create_user(email=email, password=password)
        self.assertEqual(email, user.email)
        self.assertNotEqual(password, user.password)
        self.assertTrue(user.check_password(password))
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self) -> None:
        """Test creating a superuser."""
        email = "email@email.com"
        password = VALID_PASSWORD
        user = User.objects.create_superuser(email=email, password=password)
        self.assertEqual(email, user.email)
        self.assertNotEqual(password, user.password)
        self.assertTrue(user.check_password(password))
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)

    def test_create_superuser_forces_staff(self) -> None:
        """Test creating a superuser forces the user to be staff."""
        email = "email@email.com"
        password = VALID_PASSWORD
        user = User.objects.create_superuser(email=email, password=password, is_staff=False, is_superuser=False)
        self.assertEqual(email, user.email)
        self.assertNotEqual(password, user.password)
        self.assertTrue(user.check_password(password))
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
