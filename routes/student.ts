import express = require('express');

export let studentRouter: express.Router = express.Router();

let student = require('./../controllers/student');

/**
 * Students Service
 */
studentRouter.get('', student.getAll);
studentRouter.get('/:studentId', student.getStudentById);
studentRouter.post('', student.addStudent);
studentRouter.put('',student.modifyStudent);
studentRouter.delete('/:studentId', student.deleteStudent);
studentRouter.get('/studies/:studyName', student.getByStudies);
