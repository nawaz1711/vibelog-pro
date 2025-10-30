const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required roles: ${roles.join(', ')}`
      });
    }

    next();
  };
};

const isAdmin = authorizeRole(['admin']);
const isFreelancer = authorizeRole(['freelancer', 'admin']);
const isClient = authorizeRole(['user', 'freelancer', 'admin']);

module.exports = {
  authorizeRole,
  isAdmin,
  isFreelancer,
  isClient
};
