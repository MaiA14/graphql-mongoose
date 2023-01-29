const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creatorSchema = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('Creator', creatorSchema);