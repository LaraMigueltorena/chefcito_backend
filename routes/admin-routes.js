const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controller');

router.get('/', adminController.getAll);
router.get('/:id', adminController.getById);
router.post('/', adminController.create);
router.put('/:id', adminController.update);
router.delete('/:id', adminController.delete);

module.exports = router;
