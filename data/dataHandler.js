const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const dataFile = path.join(dataDir, 'mediaData.json');

const initialData = {
  movies: [
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
  ],
  series: [
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
  ],
  songs: [
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
  ]
};

function initializeDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify(initialData, null, 2));
  }
}

function readData() {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    return null;
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing to data file:', error);
    return false;
  }
}

function getAll(type) {
  const data = readData();
  return data ? data[type] : null;
}

function addItem(type, item) {
  const data = readData();
  if (!data) return null;

  const items = data[type];
  const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
  const newItem = { ...item, id: newId };
  
  data[type].push(newItem);
  if (writeData(data)) {
    return data[type];
  }
  return null;
}

function updateItem(type, id, updates) {
  const data = readData();
  if (!data) return null;

  const items = data[type];
  const index = items.findIndex(item => item.id === id);
  
  if (index === -1) return null;
  
  data[type][index] = { ...items[index], ...updates, id };
  if (writeData(data)) {
    return data[type];
  }
  return null;
}

function deleteItem(type, id) {
  const data = readData();
  if (!data) return null;

  const initialLength = data[type].length;
  data[type] = data[type].filter(item => item.id !== id);
  
  if (data[type].length === initialLength) return null;
  
  if (writeData(data)) {
    return data[type];
  }
  return null;
}

module.exports = {
  initializeDataFile,
  getAll,
  addItem,
  updateItem,
  deleteItem
}; 