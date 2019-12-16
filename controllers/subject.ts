'use strict';
import Student from '../models/student';
import Subject from '../models/subject';

exports.addSubject = async function (req, res){
    let subject = new Subject(req.body);
    let subjectFound = await Student.findOne({_id:subject._id});
    if(!subjectFound){
        return subject.save()
            .then(() => res.status(200).send(subject));
    } else {
        return res.status(400).send({message: 'Duplicate subject'});
    }
};

exports.addStudentToSubject = async function (req, res){
    let subjectId = req.body.subjectId;
    let studentId = req.body.studentId;

    let student = await Student.findOne({_id: studentId});
    let subject = await Subject.findOne({_id: subjectId});

    if (!student) {
        return res.status(404).send({message: 'Student not found'});
    } else if (!subject){
        return res.status(404).send({message: 'Subject not found'});
    } else {
        let result = await Subject.updateOne({_id: subjectId}, {$addToSet: {students: studentId}});
        if(result.nModified == 1){
            return res.status(200).send({message: 'Student added successfully'});
        } else {
            return res.status(409).send({message: 'Student already in'});
        }
    }
};

exports.getAll = async function (req, res){
    let students = await Subject.find();
    return res.status(200).send(students);
};

exports.getSubjectById = async function (req,res){
    let subjectId = req.params.subjectId;
    let subject = await Subject.findOne({_id:subjectId});
    if(subject){
        return res.status(200).send(subject);
    } else {
        return res.status(404).send({message:"Subject not found"});
    }
};

exports.getStudents = async function (req, res) {
    let subjectId = req.params.subjectId;
    let subject = await Subject.findOne({_id:subjectId}).populate('students');
    if(subject){
        return res.status(200).send(subject.students);
    } else {
        return res.status(404).send({ message: 'Subject not found' });
    }
};

exports.deleteSubject = async function (req,res) {
    let subjectId = req.params.subjectId;
    let subject = await Subject.findByIdAndDelete(subjectId);
    if(!subject){
        return res.status(404).send({message: 'Student not found'})
    } else {
        return res.status(200).send({message:'Subject deleted successfully'});
    }
};
