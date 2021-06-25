const mongoose = require('mongoose');

const Schema = mongoose.Schema();

const StudentsSchema = new Schema({ name: String });

const Student = mongoose.model('student', StudentsSchema);

export default Student;
