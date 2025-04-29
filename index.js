const express = require('express');
const path = require('path');
const { initializeDataFile, getAll, addItem, updateItem, deleteItem } = require('./data/dataHandler');

const app = express();
const PORT = 3000;

initializeDataFile();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/movies', (req, res) => {
  const movies = getAll('movies');
  if (movies === null) {
    return res.status(500).json({ message: 'Error retrieving movies' });
  }
  res.json(movies);
});

app.get('/series', (req, res) => {
  const series = getAll('series');
  if (series === null) {
    return res.status(500).json({ message: 'Error retrieving series' });
  }
  res.json(series);
});

app.get('/songs', (req, res) => {
  const songs = getAll('songs');
  if (songs === null) {
    return res.status(500).json({ message: 'Error retrieving songs' });
  }
  res.json(songs);
});

app.post('/movies', (req, res) => {
  const updatedMovies = addItem('movies', req.body);
  if (updatedMovies === null) {
    return res.status(500).json({ message: 'Error adding movie' });
  }
  res.status(201).json(updatedMovies);
});

app.post('/series', (req, res) => {
  const updatedSeries = addItem('series', req.body);
  if (updatedSeries === null) {
    return res.status(500).json({ message: 'Error adding series' });
  }
  res.status(201).json(updatedSeries);
});

app.post('/songs', (req, res) => {
  const updatedSongs = addItem('songs', req.body);
  if (updatedSongs === null) {
    return res.status(500).json({ message: 'Error adding song' });
  }
  res.status(201).json(updatedSongs);
});

app.put('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedMovies = updateItem('movies', id, req.body);
  if (updatedMovies === null) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  res.json(updatedMovies);
});

app.put('/series/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedSeries = updateItem('series', id, req.body);
  if (updatedSeries === null) {
    return res.status(404).json({ message: 'Series not found' });
  }
  res.json(updatedSeries);
});

app.put('/songs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedSongs = updateItem('songs', id, req.body);
  if (updatedSongs === null) {
    return res.status(404).json({ message: 'Song not found' });
  }
  res.json(updatedSongs);
});

app.delete('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedMovies = deleteItem('movies', id);
  if (updatedMovies === null) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  res.json(updatedMovies);
});

app.delete('/series/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedSeries = deleteItem('series', id);
  if (updatedSeries === null) {
    return res.status(404).json({ message: 'Series not found' });
  }
  res.json(updatedSeries);
});

app.delete('/songs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedSongs = deleteItem('songs', id);
  if (updatedSongs === null) {
    return res.status(404).json({ message: 'Song not found' });
  }
  res.json(updatedSongs);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 