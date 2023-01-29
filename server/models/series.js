const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seriesSchema = new Schema({
    name: String,
    genre: String,
    creatorId: String
});

module.exports = mongoose.model('Series', seriesSchema);