import jwt from 'jsonwebtoken';

export function requireAuth(allowedRoles = []) {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ')
        ? authHeader.substring('Bearer '.length)
        : null;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // expected payload: { id, email, role }
      req.user = { id: payload.id, email: payload.email, role: payload.role };
      if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
}


