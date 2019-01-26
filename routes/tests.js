const router = require('express').Router();
const Test = require('../db/models/Test');
const Student = require('../db/models/Student');

router.get('/', async (req, res, next) => {
  try {
    const allTests = await Test.findAll();
    res.status(200).json(allTests);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const oneTest = await Test.findById(id);
    res.json(oneTest);
  } catch (err) {
    next(err);
  }
});

router.post('/student/:studentId', async (req, res, next) => {
  try {
    const id = req.params.studentId;
    const subject = req.body.subject;
    const grade = req.body.grade;

    const student = await Student.findById(id);
    const newTest = await Test.create({
      name: name,
      grade: grade,
      student: id,
    });
    // const studentTest = await newTest.setStudent(student);
    res.status(201).send(newTest);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
