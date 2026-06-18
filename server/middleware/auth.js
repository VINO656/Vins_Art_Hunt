require('dotenv').config();

const adminAuth = (req, res, next) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const providedPassword = req.headers['x-admin-password'];

  if (!adminPassword) {
    console.error('SERVER ERROR: ADMIN_PASSWORD is not set in .env');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (!providedPassword || providedPassword !== adminPassword) {
    return res.status(401).json({ error: 'Unauthorized: Invalid Admin Password' });
  }

  next();
};

module.exports = adminAuth;
