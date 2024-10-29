// Middleware to check if user has role and permission
exports.checkRoleAndPermission = (requiredRoles, requiredPermission) => {
  return (req, res, next) => {
    try {
      // Check if user has the required role
      if (!requiredRoles.includes(req.user.role)) {
        return res.status(403).json({
          status: "error",
          message: "Permission denied. You do not have the required role.",
        });
      }

      // Check if user has the required permission
      if (
        !req.user.permissions ||
        !req.user.permissions.includes(requiredPermission)
      ) {
        return res.status(403).json({
          status: "error",
          message:
            "Permission denied. You do not have the required permission.",
        });
      }

      next();
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  };
};