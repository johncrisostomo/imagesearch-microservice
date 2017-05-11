const express = require('express');
const axios = require('axios');
const path = require('path');
const Search = require('./model');

const app = express();

const apiKey = process.env.CSE_KEY;
const cxKey = process.env.CSE_CX;

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/api/imagesearch/latest', (req, res) => {
  res.set('Content-Type', 'application/json');

  Search.find({}, { _id: 0, __v: 0 }).limit(10).sort({ when: -1 }).exec((err, docs) => {
    if (err || !res) {
      res.json({ message: "It's not you, it's me. . ." });
    }

    res.json(docs);
  });
});


app.get('/api/imagesearch/:searchterm', (req, res) => {
  res.set('Content-Type', 'application/json');

  const offset = req.query.offset;
  const searchTerm = req.params.searchterm;
  
  // save the current search term to the database
  const search = new Search({ term: searchTerm });
  search.save();

  const requestUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cxKey}&q=${searchTerm}&searchType=image&start=${offset}`;
  
  axios.get(requestUrl).then((response) => {
    const resultSet = response.data.items.map((item) => {
      let newItem = {};
      newItem.url = item.link;
      newItem.snippet = item.snippet;
      newItem.thumbnail = item.image.thumbnailLink;
      newItem.context = item.image.contextLink;

      return newItem;
    });

    res.json({ results: resultSet });
  })
  .catch((error) => console.log(error));
});


app.listen(process.env.PORT || 3000);
