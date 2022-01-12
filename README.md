# Dogger

Dog owners and walkers meetter

### Documentation

[Docs](./docs/README.md)

# Dogger is the easy way to find a Walker for you Dog when you don't have time to that walk in the park!

## Backend

- Django/Django Rest Framework
- Sqlite3/Postgresql

to run the project you need to install a library called `pipenv` is the easy way to manage dependencies and virtualenv whitout tears.

after that you need to run the following command:

`pipenv shell`

this command start the virtualenv automatic created and managed by the library.
now you can install your dependencies:

`pipenv install` (this command use Pipfile instead of requirements.txt)

when all dependencies are completely installed you need to run the project:

`python manage.py runserver 0:8000`

## Frontend

- React/Javascript

to run the project you need to install `npm` to install some project dependencies.

`https://www.npmjs.com`

if you have installed `npm` you only need to run the following command:

`npm i`

when all dependencies was installed correctly only need to run the project.

before run the project you need to create a `.env` file at the root of the `client` folder.

`CONTACT WITH ME TO KNOW WHICH ENVIROMENT VARIABLES NEEDS FOR THE PROJECT`

now you can run the following command:

`npm run start --reset-cache`
