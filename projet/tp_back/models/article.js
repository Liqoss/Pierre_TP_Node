const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const articleSchema = mongoose.Schema({
    title: {type: String, required: true, unqiue: false},
    text : {type: String, required: true, unique: false},
    image: {type: String, required: false, unique: false},
    questions: {type: Array, required: false, unique: false},
    answers: {type: Array, required: false, unique: false}
});

articleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Article', articleSchema);
