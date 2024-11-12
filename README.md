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

 - State Management: I assumed that dronePosition and path state would be handled by useDroneWebSocket hook, which will update these states based on the websocket events. It ensure that updates will be seamlessly reflected in Map component.

- Error Handling: I ensure that the application gracefully handles potential issues such as network errors in websocket communication or Leaflet map related errors. I added error handling where errors could occur, like in websocket connection and when Leaflet operations could potentially fail(eg  getBounds, setView).

- Mocking: When setting up mocks for react-leaflet and react-leaflet-marker, I assumed that these libraries were central to the map rendering and interactions in the app. The mocks were added in a reusable file(reactLeafletMock.tsx), assuming it would help with scalibility and code reuse.

- Testing:  I assumed that unit tests would focus on specific behaviors like maps auto-center functionality(which uses useAutoCenterMap).Additionally, tests would cover error handling to ensure that unexpected conditions are handled.
  
- Custom Hook: I have created a custom Hook to enable auto center when necessary and another hook to manage the websocket connection and update drone position and paths. This will benefit from separation of concerns and make App and Map component more cleaner.

(ii) ideas for further improvements in your solutions

- Error Boundaries: I have added some error handling at specific points. React's error boundaries could be leveraged to catch any unforseen errors in component tree. This will prevent the entire app from crashing and coud show a fallback UI in case of severe error.

- Retries for WebSocket: Websocket failures could be handled by adding a retry mechanism. For example, if the connection fails, the app could attempt to reconnect after a delay or provide an option to user to retry the connection.
  
- UI enhancements:  The UI enhancements can be done in several ways. Such as if web socket data takes time to load, we can add a loading spinner or skeleton screens to improve the UX while data is being fetched or processed.Also, Error Dialog can be used to display the error message.
  
- Unit Testing: We can add more unit tests such as Unit testing for websocket handling where tests can be written to simulate different websocket events( eg. onclose,on errors, etc) to ensure that the app responds correctly to different types of connection failures.

(iii) what would need to be done to make it production ready including testing.

- Unit Testing: The current tests cover specific behaviors but more edge cases should be added. e.g.  Simulate websocket failures, retries, and successful connections, test behaviour when websocket server is down,test behaviour when map fails to load or when map-related functions fail.
  
- Integration Tests: The integration tests to test the integration between the Map, useAutoCenterMap, and useDroneWebSocket hooks, especially for real-time interactions like positioning updates and map auto-centering.

- End to End Testing: To validate the UX, end-to-end tests should be written using tools like Cypress.

- Error Handling in Production: The Centralized Error Logging to track errors in real-time and monitor websocket disconnection or failures in the app. In case of major failures like map failing to load we can provide an error message or fallback UI.
  
- Performance Optimization: we can use Debounce or Throttling for Map updates. if the drone position is being updated frequently then we can use debouncing or throttling updates to the map to avoid unnecessary re-renderes. Also, we can use React Lazy Loading and React Suspense for loading large map libraries or websocket related  dependencies.
  
- Security Considerations: As Websocket data is paresed directly into a DronePosition, we can ensure that input from the websocket is validated to prevent any malicious data from being processed.
  
