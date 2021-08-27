const express = require('express');

const uploads = require('../../services/uploads.js');
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/user.controller.js');

const router = express.Router();

// router.post('/', uploads.single('file'), createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;