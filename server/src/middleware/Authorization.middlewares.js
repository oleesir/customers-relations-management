import Jwt from 'jsonwebtoken';

/**
 * @class Authorization
 */
export default class Authorization {
  /**
 * @method verifyToken
 *
 * @param {object} req
 * @param {object} res
 * @param {func} next
 *
 * @returns {object} status and message
 *
 */
  static verifyToken(req, res, next) {
    const BearerToken = req.headers['x-auth-token'] || req.headers.authorization || req.headers.Authorization;
    const token = BearerToken && BearerToken.replace('Bearer ', '');

    if (!token) return res.status(401).json({ status: 401, message: 'Please provide a token' });

    return Jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') res.status(401).json({ status: 401, error: 'User authorization token is expired' });
        return res.status(401).json({ status: 401, error: 'Invalid token' });
      }
      req.decoded = decoded;
      next();
    });
  }

  /**
   * @method generateToken
   *
   * @param {object} payload
   *
   * @returns {string} JWT
   */
  static generateToken(payload) {
    return Jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1day' });
  }

  /**
   * @method authorizeRoles
   *
   * @param {array} roles
   *
   * @returns {function} middleware to authorize role
   */
  static authorizeRoles(roles) {
    return async (req, res, next) => {
      const { role: userRole } = req.decoded;

      if (!roles.includes(userRole))res.status(403).json({ status: 403, error: 'You don\'t have the permission to perform this action' });

      next();
    };
  }
}
