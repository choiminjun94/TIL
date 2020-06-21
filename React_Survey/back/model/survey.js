const mongoose = require('mongoose');

const surveySchema = mongoose.Schema({
    gender : String,
    animal : String
},{
    versionKey : false
})

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;

