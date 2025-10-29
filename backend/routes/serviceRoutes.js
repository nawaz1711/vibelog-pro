const express = require('express');
const { getServices, getFeaturedServices, createService, getServiceById, updateService, deleteService, getServicesByCategory } = require('../controllers/serviceController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/featured', getFeaturedServices);
router.get('/category/:category', getServicesByCategory);
router.get('/', getServices);
router.post('/', auth, createService);
router.get('/:id', getServiceById);
router.put('/:id', auth, updateService);
router.delete('/:id', auth, deleteService);

module.exports = router;
