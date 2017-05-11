const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const mongoUrl = process.env.MONGOLAB_URI || 
  'mongodb://localhost:27017/imagesearch';

mongoose.connect(mongoUrl);

const searchSchema = new Schema({
  term: {
    type: String,
    required: true,
  },
  when: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const searchModel = mongoose.model('searches', searchSchema);

module.exports = searchModel;
