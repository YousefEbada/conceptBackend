import { ServiceModel } from '../../../db/models/service.model.js';

function buildQueryParams(query) {
  const page = Math.max(parseInt(query.page || '1', 10), 1)
  const limit = Math.min(Math.max(parseInt(query.limit || '10', 10), 1), 100)
  const skip = (page - 1) * limit
  const search = (query.search || '').trim()
  const filter = search ? { title: { $regex: search, $options: 'i' } } : {}
  return { page, limit, skip, filter }
}

export async function listServices(req, res) {
  const { page, limit, skip, filter } = buildQueryParams(req.query || {})
  const [docs, total] = await Promise.all([
    ServiceModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    ServiceModel.countDocuments(filter)
  ])
  return res.json({ 
    docs, 
    page, 
    limit, 
    total,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page < Math.ceil(total / limit),
    hasPrevPage: page > 1
  })
}

export async function getService(req, res) {
  const item = await ServiceModel.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  return res.json(item);
}

export async function createService(req, res) {
  try {
    const { title, excerpt, description } = req.body || {};
    if (!title || !excerpt || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }
    
    const doc = await ServiceModel.create({ 
      title, 
      excerpt, 
      description,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    });
    return res.status(201).json(doc);
  } catch (error) {
    console.error('Create service error:', error);
    return res.status(500).json({ message: 'Error creating service' });
  }
}

export async function updateService(req, res) {
  try {
    const { id } = req.params;
    const { title, excerpt, description } = req.body || {};
    
    const updateData = { title, excerpt, description };
    
    // If new image is uploaded, update image data
    if (req.file) {
      updateData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }
    
    const doc = await ServiceModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    return res.json(doc);
  } catch (error) {
    console.error('Update service error:', error);
    return res.status(500).json({ message: 'Error updating service' });
  }
}

export async function deleteService(req, res) {
  const { id } = req.params;
  const deleted = await ServiceModel.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  return res.json({ success: true });
}
