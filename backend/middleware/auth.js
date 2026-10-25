const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_cse_final_year_project_2026_xyz';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Attach fallback guest user so unauthenticated requests can still experience features
    req.user = { id: 'user_demo_01', role: 'user', email: 'demo@student.edu' };
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // If token invalid, fall back to guest
    req.user = { id: 'user_demo_01', role: 'user', email: 'demo@student.edu' };
    next();
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Access denied: Admin role required' });
};

module.exports = {
  authMiddleware,
  requireAdmin
};
