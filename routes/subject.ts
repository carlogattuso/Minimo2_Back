import express = require('express');

export let subjectRouter: express.Router = express.Router();

let subject = require('./../controllers/subject');

/**
 * Subjects Service
 */
subjectRouter.get('', subject.getAll);
subjectRouter.get('/:subjectId', subject.getSubjectById);
subjectRouter.get('/students/:subjectId', subject.getStudents);
subjectRouter.post('', subject.addSubject);
subjectRouter.delete('/:subjectId', subject.deleteSubject);
subjectRouter.post('/addStudent', subject.addStudentToSubject);
