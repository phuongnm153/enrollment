const mongoose = require('mongoose');

const { Schema } = mongoose;

const classSchema = new Schema({
    id: Number,
    name: String,
    courseId: Number
});

const Class = mongoose.model('classes', classSchema);

module.exports = Class;