const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const douShema = new Schema({
    link: String,
    title: String,
    description: String,
});

module.exports = mongoose.model('jobs', douShema, 'jobs');