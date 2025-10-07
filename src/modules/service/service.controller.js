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
  const [items, total] = await Promise.all([
    ServiceModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    ServiceModel.countDocuments(filter)
  ])
  return res.json({ items, page, limit, total })
}

export async function getService(req, res) {
  const item = await ServiceModel.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  return res.json(item);
}

export async function createService(req, res) {
  const { id, title, excerpt, image, description } = req.body || {};
  if (!title || !excerpt || !image || !description) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const doc = await ServiceModel.create({ id, title, excerpt, image, description });
  return res.status(201).json(doc);
}

export async function updateService(req, res) {
  const { id } = req.params;
  const { title, excerpt, image, description } = req.body || {};
  const doc = await ServiceModel.findByIdAndUpdate(id, { title, excerpt, image, description }, { new: true });
  if (!doc) return res.status(404).json({ message: 'Not found' });
  return res.json(doc);
}

export async function deleteService(req, res) {
  const { id } = req.params;
  const deleted = await ServiceModel.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  return res.json({ success: true });
}
