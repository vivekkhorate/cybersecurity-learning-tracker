import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'cyber_sentinel_secret_key_2026';

export const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed validation' });
    }
  }

  // Fallback for development/demo mode if token missing
  if (!token) {
    req.user = { id: 'demo_user_id', name: 'SOC Analyst Trainee', email: 'analyst@sentinel.sec' };
    return next();
  }
};
