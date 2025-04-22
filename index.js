const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let movies = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    genre: "Sci-Fi",
    duration: 148
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    year: 1994,
    genre: "Drama",
    duration: 142
  },
  {
    id: 3,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    year: 2008,
    genre: "Action",
    duration: 152
  }
];

let series = [
  {
    id: 1,
    title: "Breaking Bad",
    creator: "Vince Gilligan",
    startYear: 2008,
    endYear: 2013,
    genre: "Drama",
    seasons: 5
  },
  {
    id: 2,
    title: "Stranger Things",
    creator: "The Duffer Brothers",
    startYear: 2016,
    endYear: null,
    genre: "Sci-Fi/Horror",
    seasons: 4
  },
  {
    id: 3,
    title: "Game of Thrones",
    creator: "David Benioff, D.B. Weiss",
    startYear: 2011,
    endYear: 2019,
    genre: "Fantasy",
    seasons: 8
  }
];

let songs = [
  {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    year: 1975,
    genre: "Rock",
    duration: 355
  },
  {
    id: 2,
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    year: 1982,
    genre: "Pop",
    duration: 294
  },
  {
    id: 3,
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷",
    year: 2017,
    genre: "Pop",
    duration: 233
  }
];

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/series', (req, res) => {
  res.json(series);
});

app.get('/songs', (req, res) => {
  res.json(songs);
});

app.post('/movies', (req, res) => {
  const newMovie = req.body;
  newMovie.id = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1;
  movies.push(newMovie);
  res.status(201).json(movies);
});

app.post('/series', (req, res) => {
  const newSeries = req.body;
  newSeries.id = series.length > 0 ? Math.max(...series.map(s => s.id)) + 1 : 1;
  series.push(newSeries);
  res.status(201).json(series);
});

app.post('/songs', (req, res) => {
  const newSong = req.body;
  newSong.id = songs.length > 0 ? Math.max(...songs.map(s => s.id)) + 1 : 1;
  songs.push(newSong);
  res.status(201).json(songs);
});

app.put('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const movieIndex = movies.findIndex(movie => movie.id === id);
  
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  
  const updatedMovie = { ...req.body, id };
  movies[movieIndex] = updatedMovie;
  res.json(movies);
});

app.put('/series/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const seriesIndex = series.findIndex(s => s.id === id);
  
  if (seriesIndex === -1) {
    return res.status(404).json({ message: 'Series not found' });
  }
  
  const updatedSeries = { ...req.body, id };
  series[seriesIndex] = updatedSeries;
  res.json(series);
});

app.put('/songs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const songIndex = songs.findIndex(song => song.id === id);
  
  if (songIndex === -1) {
    return res.status(404).json({ message: 'Song not found' });
  }
  
  const updatedSong = { ...req.body, id };
  songs[songIndex] = updatedSong;
  res.json(songs);
});

app.delete('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = movies.length;
  movies = movies.filter(movie => movie.id !== id);
  
  if (movies.length === initialLength) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  
  res.json(movies);
});

app.delete('/series/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = series.length;
  series = series.filter(s => s.id !== id);
  
  if (series.length === initialLength) {
    return res.status(404).json({ message: 'Series not found' });
  }
  
  res.json(series);
});

app.delete('/songs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = songs.length;
  songs = songs.filter(song => song.id !== id);
  
  if (songs.length === initialLength) {
    return res.status(404).json({ message: 'Song not found' });
  }
  
  res.json(songs);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 