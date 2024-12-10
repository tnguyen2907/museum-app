# Allen Memorial Art Museum App

This is a ReactJS + NodeJS (ExpressJS) app that uses the Allen Memorial Art Museum data to display information about the museum's collection.

## Installation

1. Clone the repository
2. Add the `.env` file to the root of each folder (`backend` and `frontend`) with the following content:

a. `backend/.env`:
```
DB_HOST=<your_db_host e.g. sql.cs.oberlin.edu>
DB_USER=<your_db_user>
DB_PASSWORD=<your_db_password>
DB_NAME=<your_db_name>
PORT=<your_backend_port e.g. 3000>
```

b. `frontend/.env`:
```
VITE_HOST=<your_backend_host: needs to be the same as DB_HOST in the backend .env file >
VITE_PORT=<your_backend_port: needs to be the same as PORT in the backend .env file >
```

3. Run run.sh

4. Go to `http://<HOST>:<PORT>` in your browser