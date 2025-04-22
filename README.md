# Mock Media Server

A simple Node.js server that provides endpoints for movies, series, and songs data.

## Features

- RESTful API endpoints for movies, series, and songs
- Full CRUD operations (GET, POST, PUT, DELETE) for each resource
- Automatic 404 handling for undefined routes

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd <repository-directory>

# Install dependencies
npm install
```

## Usage

### Start the server

```bash
# Start with Node
npm start

# Start with Nodemon (auto-reload on file changes)
npm run dev
```

The server will run on `http://localhost:3000`.

## API Endpoints

### Movies

- `GET /movies` - Get all movies
- `POST /movies` - Add a new movie
- `PUT /movies/:id` - Update a movie by ID
- `DELETE /movies/:id` - Delete a movie by ID

### Series

- `GET /series` - Get all series
- `POST /series` - Add a new series
- `PUT /series/:id` - Update a series by ID
- `DELETE /series/:id` - Delete a series by ID

### Songs

- `GET /songs` - Get all songs
- `POST /songs` - Add a new song
- `PUT /songs/:id` - Update a song by ID
- `DELETE /songs/:id` - Delete a song by ID

## Example Request

```
POST /movies
Content-Type: application/json

{
  "title": "The Matrix",
  "director": "The Wachowskis",
  "year": 1999,
  "genre": "Sci-Fi",
  "duration": 136
}
```

## License

ISC 