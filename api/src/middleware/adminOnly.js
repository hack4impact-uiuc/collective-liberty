const adminOnly = (req, res, next) => {
  if (req.user) {
    next(req, res);
  }

  return res.status(401).json({
    code: 401,
    message: 'User does not have permission to access this endpoint',
  });
};

module.exports = adminOnly;
