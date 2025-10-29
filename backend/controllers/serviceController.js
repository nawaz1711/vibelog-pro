const Service = require('../models/Service');
const User = require('../models/User');

const getServices = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    let services = await Service.find(query)
      .populate('creatorId', 'name profilePic rating bio skills')
      .sort({ createdAt: -1 })
      .limit(50);
    
    // Filter by price range if provided
    if (minPrice || maxPrice) {
      services = services.filter(service => {
        const prices = service.pricing.map(p => p.price);
        const minServicePrice = Math.min(...prices);
        const maxServicePrice = Math.max(...prices);
        
        if (minPrice && maxPrice) {
          return minServicePrice >= minPrice && maxServicePrice <= maxPrice;
        } else if (minPrice) {
          return minServicePrice >= minPrice;
        } else if (maxPrice) {
          return maxServicePrice <= maxPrice;
        }
        return true;
      });
    }
    
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFeaturedServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate('creatorId', 'name profilePic rating')
      .sort({ rating: -1, orders: -1 })
      .limit(8);
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const { title, category, description, pricing, samples } = req.body;
    const service = new Service({ 
      creatorId: req.user.id, 
      title, 
      category, 
      description, 
      pricing: pricing || [],
      samples: samples || []
    });
    await service.save();
    const populatedService = await Service.findById(service._id)
      .populate('creatorId', 'name profilePic');
    res.status(201).json(populatedService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('creatorId', 'name profilePic bio skills rating socialLinks followers');
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service || service.creatorId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    Object.assign(service, req.body);
    await service.save();
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service || service.creatorId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getServicesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const services = await Service.find({ category })
      .populate('creatorId', 'name profilePic rating')
      .sort({ rating: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  getServices, 
  getFeaturedServices,
  createService, 
  getServiceById, 
  updateService, 
  deleteService,
  getServicesByCategory
};
