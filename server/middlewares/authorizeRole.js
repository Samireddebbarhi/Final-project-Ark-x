const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      res.status(401);
      throw new Error(
        `role:${req.user.role} is not allowed to acces this resouce`
      );
    }
    next();
  };
};

module.exports = authorizeRoles;
