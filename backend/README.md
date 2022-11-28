### Backend

## Setup

1. Setup `.env` file in the /backend directory --> this file will contain a DATABASE_URL string
2. Install dependencies through `npm i` or `npm install`
3. Run server through `npm run start`

## Database Connection
The database connection string to CockroachDB must be set in the `.env` file with the `DATABASE_URL` string.

## Enable Caching
The backend can run without caching, but it will be very slow and a noticable difference when using the search API, which involves a
complex query with multiple joins. If a redis cache is online in the same IP as this server it will automatically connect.
Below steps is how to setup the cache for development using Docker.

1. Install Docker
2. Pull the redis image using `docker pull redis`
3. Run container and forward the port using `docker run -p 6379:6379 --name redis-1 -d redis`

To stop the container use `docker container stop [container ID]`

## Postman

View all the endpoints for the following backend server through this postman link here:
https://www.getpostman.com/collections/f3de478f63bb916a4fdf
