const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
const config = require("../config");

let connection = mongoose.createConnection(config.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
autoIncrement.initialize(connection)

const enrollSchema = new mongoose.Schema({
    studentId: {
        type: Number,
        index: true,
    },
    classId: {
        type: Number,
        index: true,
    },
    status: {
        type: Number,
        default: 0,
        min: 0,
        max: 3,
    }
});
enrollSchema.plugin(autoIncrement.plugin, { model: 'enrollments', startAt: 1 })

const Enrollment = mongoose.model('enrollments', enrollSchema);

module.exports = Enrollment;