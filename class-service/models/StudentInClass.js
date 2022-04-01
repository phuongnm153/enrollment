const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
const config = require("../config");

let connection = mongoose.createConnection(config.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
autoIncrement.initialize(connection)

const studentInClassSchema = new mongoose.Schema({
    studentId: Number,
    classId: Number
});

studentInClassSchema.plugin(autoIncrement.plugin, { model: 'studentinclass', startAt: 1 })
const StudentInClass = mongoose.model('studentinclass', studentInClassSchema);

module.exports = StudentInClass;