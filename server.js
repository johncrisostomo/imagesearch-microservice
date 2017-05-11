const express = require('express');
const axios = require('axios');
const Search = require('./model');

const app = express();

const apiKey = process.env.CSE_KEY;
const cxKey = process.env.CSE_CX;

app.get('/api/imagesearch/:searchterm', (req, res) => {
  const offset = req.query.offset;
  const searchTerm = req.params.searchterm;

  const requestUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cxKey}&q=${searchTerm}&searchType=image&start=${offset}`;
  
  axios.get(requestUrl).then((response) => {
    const resultSet = response.data.items.map((item) => {
      let newItem = {};
      newItem.url = item.link;
      newItem.snippet = item.snippet;
      newItem.thumbnail = item.thumbnailLink;
      newItem.context = item.image.contextLink;

      return newItem;
    });

    res.json({ results: resultSet });
  })
  .catch((error) => console.log(error));
});


app.listen(process.env.PORT || 3000);
