# DroneShield Software Tech Test

DroneShield's mission is to provide the best Counter-drone defence in an emerging industry.

This code challenge involves building a Counter UAS simulator and user interface for the tracking of drones.

1. Overview of the backend
2. Overview of the frontend
3. Tasks

4. Development notes

- VSCode IDE Setup
- Getting the Go backend running
- Getting the Typescript backend running
- Getting the frontend project running

---

### 1. Overview of the backend

The provided backend code simulates two microservices that interface with each through redis publish and subscribe:

- one microservice that publishes to redis the coordinates of the drone, and
- another microservice that subscribes to the publisher and pushes events to a websocket

Note: There are two backend implementations. One is in Go and other is in Typescript. You only need to run **either** the Go or the Typescript, according to your preference.

---

### 2. Overview of the frontend

Currently, the frontend provides:

- a map
- a placeholder icon of a drone on the map
- websocket connection with the received data logged to the console

### 3. Tasks

[Frontend Tasks](./TASKS.frontend.md)

[Backend Task](./TASKS.backend.md)

For full-stack applicants pick Task 5 in the Frontend Tasks considering the requirements explained in the Backend Task.

### 4. Development notes

This project has been setup for development using VS Code.

If you're unable to use VS Code, you may need to modify (or disable) the linting setup.

---

### Run the sample using the Go backend

From the root of the project:

```
docker compose up --build
```

---

### Run the sample using the Typescript backend

First, you will need a Redis server.

On Mac:

```
brew install redis
brew services start redis
```

(When finished, you can remove redis with `brew remove redis`)

On PC:

See: https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-windows/

Once Redis is installed, from the root of the project:

Run the publisher:

```
cd drone_publisher_ts
npm i
npm run dev
```

Run the subscriber:

```
cd drone_subscriber_ts
npm i
npm run dev
```

---

### Frontend

First, make sure that the backend is running.

Then from the root of the project:

```
cd drone_frontend
npm i
npm run dev
```

The UI will be available here: http://localhost:5173

---

### Wrapping up

Please conclude by including some commentary on:

(i) assumptions and decisions that you made whilst approaching these tasks

(ii) ideas for further improvements in your solutions

(iii) what would need to be done to make it production ready including testing.
