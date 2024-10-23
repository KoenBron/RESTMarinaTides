# Script for adding permissions
from django.contrib.auth.models import Permission, User, Group
from django.contrib.contenttypes.models import ContentType

if __name__ == "__main__":
    content_type = ContentType.objects.get_for_model(User)
    permission_data = [{"codename": "realtor", "name": "Realtor", "content_type": content_type},{"codename": "employee", "name": "Employee", "content_type": content_type} ]

    permissions = []
    # Create the permissions
    for data in permission_data:
        permissions.append(Permission.objects.create(**data))

    # Retrieve the groups
    realtors = Group.objects.get(name="Realtors")
    employee = Group.objects.get(name="Employees")

    # Add permissions to groups
    realtors.permissions.add(permissions[0])
    employee.permissions.add(permissions[1])

