import os
import django
import random
from faker import Faker

# Configure settings for Django project
# Adjust 'your_project_name.settings' with your project's actual settings file
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from cattle.models import Cattle, HealthRecord, BreedingRecord
from breed.models import Breed
from owner.models import Owner

fake = Faker()


# Helper function to create an Owner
def create_owner():
    first_name = fake.first_name()
    last_name = fake.last_name()
    return Owner.objects.create(
        first_name=first_name,
        last_name=last_name,
        phone_number=fake.phone_number(),
        email=fake.email(),
        address=fake.address(),
        company_name=fake.company(),
        website=fake.url(),
    )


# Helper function to create a Breed
def create_breed():
    return Breed.objects.create(
        name=fake.word().capitalize(),
        origin=fake.country(),
        characteristics=fake.text(max_nb_chars=200),
        average_weight=random.uniform(200, 1500),  # Adjust range as necessary
        life_expectancy=random.randint(5, 20),  # Adjust range as necessary
    )


# Helper function to create a Cattle
def create_cattle(owner, breed):
    ear_tag_number = fake.bothify(
        text="???-########", letters="ABCDEFGHJKLMNPQRSTUVWXYZ"
    )
    return Cattle.objects.create(
        ear_tag_number=ear_tag_number,
        name=fake.first_name(),
        breed=breed,
        gender=random.choice(["F", "M"]),
        date_of_birth=fake.date_of_birth(minimum_age=0, maximum_age=10),
        weight=random.uniform(100, 800),  # Adjust range as necessary
        owner=owner,
    )


def create_breeding_record(bull, cow, breed):
    return BreedingRecord.objects.create(
        bull=bull,
        cow=cow,
        breeding_date=breed,
        expected_calving_date=fake.date_of_birth(minimum_age=0, maximum_age=1),
        actual_calving_date=fake.date_of_birth(minimum_age=0, maximum_age=1),
    )


def create_health_record(cattle):
    return HealthRecord.objects.create(
        cattle=cattle,
        checkup_date=fake.date(),
        health_notes=fake.text(max_nb_chars=200),
    )


# Create a specified number of mock data entries
def add_mock_data(num_entries=10):
    for _ in range(num_entries):
        owner = create_owner()
        breed = create_breed()
        cattle = create_cattle(owner, breed)
        # create_breeding_record()
        create_health_record(cattle)


# Run the function to create mock data
if __name__ == "__main__":
    print("Populating the database with mock data...")
    add_mock_data(50)  # Specify the number of entries you want to create
    print("Populating complete.")
