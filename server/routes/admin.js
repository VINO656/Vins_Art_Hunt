const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const adminAuth = require('../middleware/auth');

// POST update password
router.post('/update-password', adminAuth, (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword) {
    return res.status(400).json({ error: 'New password is required' });
  }

  const envPath = path.join(__dirname, '..', '.env');
  try {
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Check if ADMIN_PASSWORD exists in the file
    if (envContent.includes('ADMIN_PASSWORD=')) {
      envContent = envContent.replace(/ADMIN_PASSWORD=.*/g, `ADMIN_PASSWORD=${newPassword}`);
    } else {
      envContent += `\nADMIN_PASSWORD=${newPassword}\n`;
    }

    fs.writeFileSync(envPath, envContent, 'utf8');
    process.env.ADMIN_PASSWORD = newPassword;

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Failed to update password' });
  }
});

module.exports = router;
