const mongoose = require('mongoose');

const { Schema } = mongoose;

const douShema = new Schema({
  link: String,
  title: String,
  description: String,
  category: String,
});

module.exports = mongoose.model('jobs', douShema, 'jobs');
