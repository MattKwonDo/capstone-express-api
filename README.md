# beer-express-api

This is the back-end for my capstone project, a beer tracker, which will be
deployed on Heroku.

## URL
- [Front-end Repo](https://github.com/MattKwonDo/capstone-client)
- [Deployed Front-end](https://mattkwondo.github.io/capstone-client/index.html)

- [Deployed Back-end](https://guarded-refuge-25258.herokuapp.com/)

## ERD

[ERD](http://imgur.com/MqAQzC0)

## Technologies

-   HTML
-   CSS
-   JavaScript
-   Bootstrap
-   Ajax
-   jQuery
-   Handlebars
-   Express
-   Mongoose
-   MongoDB
-   Heroku
-   Animate.css

## Approach
- For this app I wanted to add some extra features and make it look nicer than
my previous projects. I started with a express/mongo back-end, deployed to
Heroku, and utilized the browser-template for the front-end.

I used a bootstrap template to get me started on the
visual design and modified it with pictures and content of my own. I was hoping
to also incorporate a third-party API, but did not get around to that.

## Unsolved Problems
- I don't have any unsolved problems, but would like to integrate with a google
maps API to allow search functionality to pull in the location you bought or
tried a beer.

## API

### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/:id` | `users#changepw`  |
| DELETE | `/sign-out/:id`        | `users#signout`   |

#### POST /sign-up

Request:

```sh
curl --include --request POST http://localhost:4741/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password",
      "password_confirmation": "an example password"
    }
  }'
```

```sh
scripts/sign-up.sh
```

Response:

```md
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email"
  }
}
```

#### POST /sign-in

Request:

```sh
curl --include --request POST http://localhost:4741/sign-in \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password"
    }
  }'
```

```sh
scripts/sign-in.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email",
    "token": "33ad6372f795694b333ec5f329ebeaaa"
  }
}
```

#### PATCH /change-password/:id

Request:

```sh
curl --include --request PATCH http://localhost:4741/change-password/$ID \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "an example password",
      "new": "super sekrit"
    }
  }'
```

```sh
ID=1 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/change-password.sh
```

Response:

```md
HTTP/1.1 204 No Content
```

#### DELETE /sign-out/:id

Request:

```sh
curl --include --request DELETE http://localhost:4741/sign-out/$ID \
  --header "Authorization: Token token=$TOKEN"
```

```sh
ID=1 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/sign-out.sh
```

Response:

```md
HTTP/1.1 204 No Content
```

### Users

| Verb | URI Pattern | Controller#Action |
|------|-------------|-------------------|
| GET  | `/users`    | `users#index`     |
| GET  | `/users/1`  | `users#show`      |

#### GET /users

Request:

```sh
curl --include --request GET http://localhost:4741/users \
  --header "Authorization: Token token=$TOKEN"
```

```sh
TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/users.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "users": [
    {
      "id": 2,
      "email": "another@example.email"
    },
    {
      "id": 1,
      "email": "an@example.email"
    }
  ]
}
```

#### GET /users/:id

Request:

```sh
curl --include --request GET http://localhost:4741/users/$ID \
  --header "Authorization: Token token=$TOKEN"
```

```sh
ID=2 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/user.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 2,
    "email": "another@example.email"
  }
}
```

### Beers

| Verb   |  URI Pattern    |  Controller#Action  |
|--------|-----------------|---------------------|
| GET    | `/beers/:id`  | `beers#show`     |
| GET    | `/beers`      | `beers#index`     |
| POST   | `/beers`      | `beers#create`    |
| PATCH  | `/beers/:id`  | `beers#update`    |
| DELETE | `/beers/:id`  | `beers#destroy`   |

#### GET /beers

Request:

```sh
curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"
```

```sh
curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"
```

#### POST /beers

Request:

```sh
curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "beer": {
      "title": "'"${TITLE}"'",
      "question": "'"${QUESTION}"'"
    }
  }'
```

#### PATCH /beers/:id

Request:

```sh
curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "beer": {
      "title": "'"${TITLE}"'",
      "question": "'"${QUESTION}"'"
    }
  }'
```

#### DELETE /beers/:id

Request:

```sh
curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=${TOKEN}"
```

  # Template Content:
  [![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

  A template for starting projects with `express` as an API. Includes
  authentication and common middlewares.

  At the beginning of each cohort, update the versions in
  [`package.json`](package.json) by replace all versions with a glob (`*`) and
  running `npm update --save && npm update --save-dev`. You may wish to test these
  changes by deleting the `node_modules` directory and running `npm install`.
  Fix any conflicts.

  This template follows Rails-like conventions for organizing controller and
  model code, and has a routing layer which is similar to the Rails routing DSL.

  ## Dependencies

  Install with `npm install`.

  -   [`express`](http://expressjs.com/)
  -   [`mongoose`](http://mongoosejs.com/)

  At the beginning of each cohort, update the versions in
  [`package.json`](package.json) by replace all versions with a glob (`*`) and
  running `npm update --save && npm update --save-dev`. You may wish to test these
  changes by deleting the `node_modules` directory and running `npm install`.
  Fix any conflicts.

  ## Installation

  1.  [Download](../../archive/master.zip) this template.
  1.  Unzip and rename the template directory.
  1.  Empty [`README.md`](README.md) and fill with your own content.
  1.  Move into the new project and `git init`.
  1.  Replace all instances of `'beer-express-api'` with your app name. This
      includes `package.json`, various debugger configurations, and the MongoDB
      store.
  1.  Install dependencies with `npm install`.
  1.  Set a SECRET_KEY in the environment.
  1.  Run the API server with `npm start`. If you want your code to be reloaded on
      change, you should `npm install -g nodemon` and use `nodemon` instead of
      `npm start`.
  1.  Once everything is working, make an initial commit.

  For development and testing, set the SECRET_KEY from the root of your
   repository using

  ```sh
  echo SECRET_KEY=$(/usr/local/opt/openssl/bin/openssl rand -base64 66 | tr -d '\n') >>.env
  ```

  In order to make requests from your deployed client application, you will need
  to set `CLIENT_ORIGIN` in the environment (e.g. `heroku config:set
  CLIENT_ORIGIN=https://<github-username>.github.io`).

  ## Structure

  Dependencies are stored in [`package.json`](package.json).

  Do not configure `grunt` packages directly in the
  [`Gruntfile.js`](Gruntfile.js). Instead, store configurations in the
  [`grunt`](grunt) directory. You won't need a top-level key, since that's
  generated by the `Gruntfile.js` based on the filename of the configuration
  object stored in the `grunt` directory.

  Developers should store JavaScript files in [`app/controllers`](app/controllers)
   and [`app/models`](app/models).
  Routes are stored in [`config/routes.js`](config/routes.js)

  ## Tasks

  Developers should run these often!

  -   `grunt nag` or just `grunt`: runs code quality analysis tools on your code
      and complains
  -   `grunt reformat`: reformats all your code in a standard style
  -   `grunt test`: runs any automated tests

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
