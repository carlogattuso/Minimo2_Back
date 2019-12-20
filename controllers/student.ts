'use strict';
import Student from '../models/student';
import Subject from '../models/subject';

exports.addStudent = async function (req, res){
    let student = new Student(req.body);
    let studentFound = await Student.findOne({name:student.name});
    if(!studentFound){
        return student.save()
            .then(() => res.status(200).send(student));
    } else {
        return res.status(400).send({message: 'Duplicate student'});
    }
};

exports.getStudentById = async function (req, res) {
    let studentId = req.params.studentId;
    let student = await Student.findOne({_id: studentId});
    if (student) {
        res.status(200).json(student);
    } else {
        res.status(404).send({message: 'Student not found'});
    }
};

exports.getAll = async function (req, res) {
    let students = await Student.find();
    res.status(200).send(students);
};

exports.getByStudies = async function (req,res) {
    let study = req.params.studyName;
    let students = await Student.find({studies:{$elemMatch:{name : study}}});
    if(students){
        return res.status(200).send(students);
    } else {
        res.status(204).send({message: 'No results'});
    }
};

exports.modifyStudent = async function (req,res) {
    let student = req.body;
    let studentUpdated = await Student.findByIdAndUpdate(student._id, student, {runValidators: true});
    if(!studentUpdated) {
        return res.status(404).send({message: 'Student not found'})
    } else{
        return res.status(200).send(student);
    }
};

exports.deleteStudent = async function (req,res) {
    let studentId = req.params.studentId;
    let student = await Student.findByIdAndDelete(studentId);
    if(!student){
        return res.status(404).send({message: 'Student not found'})
    } else {
        await Subject.updateMany({}, {$pull: {students: studentId}}, {multi: true});
        return res.status(200).send({message:'Student deleted successfully'});
    }
};



