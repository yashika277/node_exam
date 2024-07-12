const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send('Access Denied: No Token Provided!');
  }

  try {
    const verified = jwt.verify(token, 'SECRET');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}

function extractUser(req, res, next) {
    const token = req.cookies.token;
  
    if (token) {
      try {
        const verified = jwt.verify(token, 'SECRET'); 
        req.user = verified;
      } catch (err) {
        req.user = null;
      }
    } else {
      req.user = null;
    }
  
    next();
  }

  function authorizeRoles(...roles) {
    return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).send('Access Denied: You do not have correct privilege to perform this operation');
      }
      next();
    };
  }

module.exports = {
  authenticateToken,
  extractUser,
  authorizeRoles
};
