const mongoose = require('mongoose');

const { Schema } = mongoose;

const studentSchema = new Schema({
    name: String
});

const Student = mongoose.model('students', studentSchema);

module.exports = Student;