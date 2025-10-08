import { ProjectModel } from '../../../db/models/project.model.js';

function buildQueryParams(query) {
  const page = Math.max(parseInt(query.page || '1', 10), 1)
  const limit = Math.min(Math.max(parseInt(query.limit || '10', 10), 1), 100)
  const skip = (page - 1) * limit
  const search = (query.search || '').trim()
  const category = (query.category || '').trim()
  const filter = {
    ...(search ? { title: { $regex: search, $options: 'i' } } : {}),
    ...(category ? { category } : {}),
  }
  return { page, limit, skip, filter }
}

export async function listProjects(req, res) {
  const { page, limit, skip, filter } = buildQueryParams(req.query || {})
  const [docs, total] = await Promise.all([
    ProjectModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    ProjectModel.countDocuments(filter)
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

export async function getProject(req, res) {
  const item = await ProjectModel.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  return res.json(item);
}

export async function createProject(req, res) {
  const { title, description, image, category } = req.body || {};
  if (!title || !description || !image || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const doc = await ProjectModel.create({ title, description, image, category });
  return res.status(201).json(doc);
}

export async function updateProject(req, res) {
  const { id } = req.params;
  const { title, description, image, category } = req.body || {};
  const doc = await ProjectModel.findByIdAndUpdate(id, { title, description, image, category }, { new: true });
  if (!doc) return res.status(404).json({ message: 'Not found' });
  return res.json(doc);
}

export async function deleteProject(req, res) {
  const { id } = req.params;
  const deleted = await ProjectModel.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  return res.json({ success: true });
}
