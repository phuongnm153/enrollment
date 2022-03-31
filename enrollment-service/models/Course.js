const mongoose = require('mongoose');

const { Schema } = mongoose;

const courseSchema = new Schema({
    name: String,
});

const Course = mongoose.model('courses', courseSchema);

module.exports = Course;