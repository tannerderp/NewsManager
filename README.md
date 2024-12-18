# News Manager
This is a personal project that utilisizes the news api from newsapi.org to display news articles. It also allows user's to login and save articles, and search for articles. It utilizes a mix of react and django for the client side and server side portions of the app, respectively.

## Project Demonstration
A demonstration of this project is shown below


[![Demonstration Video](https://img.youtube.com/vi/49a0MA-KB4s/0.jpg)](https://www.youtube.com/watch?v=49a0MA-KB4s)

## How to Setup
1. Clone the Repo
2. In the root directory, install the python dependencies `poetry install`
3. In the `client` directory, install the javascript dependencies `npm install`
4. In the `_server` directory, create a new file called `.env`
5. Copy the contents of `_server/.env.example` into the newly created `.env` file. Get an api key for the news api at newsapi.org and put it as the value for the NEWS_API_KEY variable
6. Activate the poetry env `poetry shell`
7. In the `_server` directory, run the migrations `python manage.py migrate`

## Running the appliction
1. In the `client` directory run `npm run dev`
2. In the `_server` directory (with your poetry env activated) run `python manage.py runserver`
3. Visit your application at `http://localhost:8000`
