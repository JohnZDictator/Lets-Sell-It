const express = require('express');

const uploads = require('../../uploads.js');
const { createUser } = require('../controllers/user.controller.js');

const router = express.Router();

router.post('/', uploads.single('file'), createUser);

module.exports = router;