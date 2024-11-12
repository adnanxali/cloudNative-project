const jwt = require('jsonwebtoken');
const jwt_sec="passkey";
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ success: false, msg: 'Access denied, no token provided' });
  }
  try {
    const decoded = jwt.verify(token, jwt_sec);
    req.user = decoded; // Store the decoded user ID for further use
    next();
  } catch (error) {
    res.status(401).json({ success: false, msg: 'Invalid or expired token' });
  }
};
module.exports = verifyToken;