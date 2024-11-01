# REST MarinaTides

A Django REST Framework implementaion of the MarinTides project.

## Setup

### (Optional) Create a virtual environment

Virtual environments are considered a best practice for python projects. Check [here](https://www.freecodecamp.org/news/how-to-setup-virtual-environments-in-python/) to learn how to set up a virtual environment on your given OS.

### Install required packages

Make sure `pip` is installed on your machine, check [here](https://pip.pypa.io/en/stable/installation/) on how to do that.

When `pip` is installed, run this command to installed the required django packages:

    $ pip install -r requirements.txt

### Setup & run Django

Navigate to the `marinatides/` directory and make sure to create the database tables.

    $ python3 manage.py makemigrations
    $ python3 manage.py migrate

Then run the django server: 

    $ python3 manage.py runserver

## Documentation

You can view the documentation in the OpenAI 3.0 format for all endpoints and schemas by running the django server and navigating to either of the following endpoints: 

    - `api/docs/`
    - `api/schema/`

To generate the YAML file associated with the schemas, run this command:

    $ manage.py spectacular --color --file schema.yml
