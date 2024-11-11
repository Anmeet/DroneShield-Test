# Golang Backend Implementation

This test is expected to take no more than 1 hour to setup your environment (redis and dockerized golang applications) and no more than 5 hours to complete the test. If you choose to go for `extra credit` you should try not to take more than 8 hours.

Implement the backend according to the specifications provided below. It is up to the candidate to decide how to solve this test; the guidelines provided highlight the key points required for a successful submission.

The implementation can use any external package but it is preferred for the test to be using as little packages as possible, http, websocket and redis external packages are expected.

## About this test

The backend is expected to provide the following services:

- `drone_subscriber` that handles communication between websocket subscribers and `drone_publisher`, updating the drone `flight path` and receiving drone location updates.
- `drone_publisher` that simulates drones flying path and streams the current drone coordinates to the subscriber

Inter process communication between `drone_subscriber` and `drone_publisher` must be achieved using `redis`.

Whenever reasonable, tests must be written and must be functioning when submitted for review. You don't need to write tests for WebSocket, HTTP, and Redis themselves; however, tests for the interactions between them are welcome.

Comments are required. Ensure that your code is well-commented and clear, but avoid commenting on each individual line. Instead, provide comments explaining the rationale behind your implementation choices.

### About the extra credits

When implementing extra credit task below please consider:

- testing: it is more important to test your code thoroughly than going for the extra credit.
- resource usage: don't spawn 1 routing per flight path, generate only flight path for currently observed drones.

## drone_subscriber

The `drone_publisher` service exposes a websocket server and coordinates communication with the `drone_publisher`. Communication between processes is coordinated using `redis`.

**Estimated development time:** between 2 and 3 hours, including tests.

### Must

- Accept websocket connection from clients (UI)
- Receive `flight_path` change requests from the frontend
    - Updates `drone_publisher` process with new flight path request via `redis`
- Stream `location` updates to connected clients

### Expectations

- `drone_subscriber` should consider multiple clients will handle multiple clients.
- all `clients` connected to `drone_subscriber` will all receive the same coordinates.
- any `client` connected to `drone_subscriber` could change the drone flight path.

### Extra Credit

Implementing the features below is optional.

- any `client` connected to `drone_publisher` has a different flight path
- all `clients` connected to `drone_publisher` receive coordinates according to their flight path
- in addition to `flight_path` the `origin` location of the drone is configurable

## drone_publisher

The `drone_publisher` service takes care of simulating drone flight paths. It publishes the drone location via `redis` for the `drone_subscriber`, it receives `flight_path` change requests and handle such requests by streaming the new coordinate with each subsequent update.

### Must

- Receive `flight_path` changes via `redis`
- Stream current drone `location` via `redis`

### Expectations

- `drone_publisher` streams the location of a single drone.
- after a `flight_path` update the drone path will be updated causing the drone location to abruptly change.
- coordinates for the drone are generated dynamically, they can be calculated on start but they cannot be hardcoded.
- no coordinates are generated only if a client is connected to `drone_subscriber`

### Extra Credit

Implementing the features below is optional.

- multiple drones (one per requested flight path) are handled by the software.
- streams coordinates for each requested `flight_path`.
- in addition to `flight_path` the `origin` location of a drone is configurable.
- supports `supports`, `stop` command to stop `coordinates` generation for a drone.
