const express = require('express');
const { getServices, getFeaturedServices, createService, getServiceById, updateService, deleteService, getServicesByCategory } = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/featured', getFeaturedServices);
router.get('/category/:category', getServicesByCategory);
router.get('/', getServices);
router.post('/', protect, createService);
router.get('/:id', getServiceById);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

module.exports = router;
