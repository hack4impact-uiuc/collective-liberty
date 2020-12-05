const enums = require('../models/enums');

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === enums.USER_ROLE.Admin) {
    return next();
  }

  return res.status(401).json({
    code: 401,
    message: 'User does not have permission to access this endpoint',
  });
};

module.exports = adminOnly;
