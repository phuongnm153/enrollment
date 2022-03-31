const express = require('express');
const ClassController = require("../controllers/class.controller");
const EnrollmentController = require("../controllers/enrollment.controller");

const router = express.Router();

router.get('/class/', ClassController.index);
router.post('/class/create', ClassController.create);
router.get('/enroll/', EnrollmentController.index);
router.post('/enroll/create', EnrollmentController.create);
router.put('/enroll/confirm/:id', EnrollmentController.confirm);

module.exports = router;