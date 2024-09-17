# Flask Vite (React) Starter

Starter template for a project utilizing Flask, Flask-Migrations, Flask-SQLAlchemy, Vite (React + Typescript), and Redux Toolkit Query with user authentication.
This has security protection via cors and csrf tokens. Comes production ready to allow you to host the application on render.com and utilize a PostgreSQL database (SQLite when developing locally). Utilizes SQLAlchemy v2 and Flask-SQLAlchemy v3

## [Live Demo](https://flask-react-starter.onrender.com/)
![image](https://github.com/WhirlyFan/flask-react-starter/assets/75882197/232ec78c-86e7-4988-9c01-b7af562dfd63)
NOTE: This is using render's free tier so it may take a moment before loading in:
- https://flask-react-starter.onrender.com/

### Demo user login:
- username: demo@test.com
- password: password

## Getting started
NOTE: This is assuming you have Node>=16.19.1 installed

0. Make sure [miniconda](https://docs.anaconda.com/miniconda/miniconda-install/) is installed and the conda command is available

      ```
      conda --version
      ```

1. Clone this repository (only this branch)

      ```
      git clone git@github.com:WhirlyFan/flask-react-starter.git
      ```

2. Create virtual environment for python and python dependencies

      ```bash
      cd flask_react_starter
      conda env create -f environment.yml
      conda activate flask_react_starter
      ```

      Note: You can change the name of the environment when its created by changing the name in the environment.yml file

      Note: To update the environment.yml file for new packages you can install using pip and generate a new requirements.txt file with
      ```
      pip freeze > requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment (There are 2, 1 for backend (in project root folder) and one in /ui/)

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Migrate your database, seed your database, and run your Flask app

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development install pnpm if not already installed

      ```
      curl -fsSL https://get.pnpm.io/install.sh | sh -
      ```
      or
      ```
      npm install -g pnpm
      ```
8. Install and run the dev server (make sure to do this in the /ui/ directory)
      ```
      cd ./ui
      ```
      ```
      pnpm install
      ```
      ```
      pnpm run dev
      ```
9. (Optional) To run the linter to find any eslint violations run
      ```
      pnpm run lint
      ```

10. (Optional) To run the formatter to reformat all files using Prettier
      ```
      pnpm run format
      ```

## Migrations

Inside the pipenv shell (the python environment) you will need to make a new migration whenever a model is modified or created in the backend (app directory).

```
flask db migrate -m "message such as: create users table"
```
```
flask db upgrade
```
To downgrade migrations you can run:
```
flask db downgrade
```
After your migrations are applied you can apply any seed files that you may have created with
```
flask seed all
```
To undo the seeds:
```
flask seed undo
```
NOTE: When creating new seed files, make sure to add the relevant code for production. (example can be found on the users seed file)

## NOTE: When adding new migrations, you have to manually add code for production. Simply adding the names for the tables that are being modified/created. (instructions are pre-generated on the migration file)

## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
pnpm install --prefix ui && pnpm --prefix ui run build && pip install -r requirements.txt && pip install psycopg && flask db upgrade && flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_DEBUG 0
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- VITE_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/
