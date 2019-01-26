const router = require('express').Router();
const Students = require('../db/models/Student');

router.get('/', async (req, res, next) => {
  try {
    const allStudents = await Students.findAll();
    res.json(allStudents);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const individualStudent = await Students.findById(id);
    if (individualStudent) {
      res.json(individualStudent);
    } else {
      const err = new Error('Student Not Found');
      throw err;
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    // const firstName = req.body.firstName;
    // const lastName = req.body.lastName;
    // const email = req.body.email;

    const newStudent = await Students.findOrCreate({
      where: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      },
    });

    // const newStudent = await Students.create(req.body);
    res.status(201).json(newStudent[0]);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const updatedStudent = await Students.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
      plain: true,
    });

    res.json(updatedStudent[1]);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedStudent = await Students.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).json(deletedStudent);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
