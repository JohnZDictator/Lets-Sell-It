const express = require('express');

const { createRole, getRoles, getRole, updateRole, deleteRole, grantRole, revokeRole } = require('../controllers/role.controller.js');

const verifyToken = require('../middlewares/verifyToken.middleware.js');
const { isAdmin } = require('../middlewares/authorization.middleware.js');

const router = express.Router();

router.post('/', verifyToken, isAdmin, createRole);
router.get('/', verifyToken, isAdmin, getRoles);
router.get('/:id', verifyToken, isAdmin, getRole);
router.put('/:id', verifyToken, isAdmin, updateRole);
router.delete('/:id', verifyToken, isAdmin, deleteRole);

router.post('/grantRole', verifyToken, isAdmin, grantRole);
router.post('/revokeRole', verifyToken, isAdmin, revokeRole);

module.exports = router;