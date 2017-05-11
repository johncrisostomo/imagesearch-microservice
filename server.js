const express = require('express');
const Search = require('./model');

const app = express();

const apiKey = process.env.CSE_KEY;
const cxKey = process.env.CSE_CX;

app.get('/api/imagesearch/:searchterm', (req, res) => {
  const offset = req.query.offset;
  const searchTerm = req.params.searchterm;
  res.json({ searchTerm: searchTerm, offset });
});


app.listen(process.env.PORT || 3000);
