const mongoose = require('mongoose');
const schema = mongoose.Schema;

const musicSchema = new schema({
    name: {
        type: String,
        required: true
    },
    singer: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
});

module.exports = mongoose.model('music', musicSchema)