# Pubstomp Backend Node.Js + Express + MongoDB

This is the repo to the backend API of Pubstomp. 

## Pubstomp Frontend

You can redirect to the frontend with this link https://github.com/SeeYouSpaceCowboy/pubstomp-frontend-react. Please follow the `README.md` there to set up the frontend. You can see the whole overview `README.md` for this project on this repo, https://github.com/SeeYouSpaceCowboy/pubstomp.

## Getting Started

After you clone this repo, make sure you start MongoDB.
```bash
$ sudo mongod
```

After you start MongoDB, run the following code to start the api.

```bash
$ npm i
$ npm start
```

## API Endpoints

All API endpoints have a `api` prefix. If this is on localhost then this should default to port `4000` and you should be making calls to the following http://localhost:4000/api.

| Methods  | Endpoints  | Variables | Response |
| ------------- | ------------- | ------------- | ------------- |
|post| `/signup`  | `email`, `gamerid`, `password`, `name`  ||
|get| <s>`/login`</s>  | `email`, `password`  ||
|get| `/users`  |||
|get| `/user/:email`|||
