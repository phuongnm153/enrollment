const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
const config = require("../config");

let connection = mongoose.createConnection(config.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
autoIncrement.initialize(connection)

const classSchema = new mongoose.Schema({
    id: Number,
    name: String,
    courseId: Number
});

classSchema.plugin(autoIncrement.plugin, { model: 'classes', field: 'id', startAt: 1 })
const Class = mongoose.model('classes', classSchema);

module.exports = Class;