// src/middlewares/roleAuth.js

const roleAuth = (allowedRoles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ 
          status: 403,
          data: null,
          message: 'Forbidden Access/Operation not allowed.',
          error: null 
        });
      }
      next();
    };
  };
  
  module.exports = roleAuth;