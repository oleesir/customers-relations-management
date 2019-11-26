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
    const BearerToken = req.header['x-auth-token'] || req.header.Authorization;
    const token = BearerToken && BearerToken.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        status: 401,
        message: 'Please provide a token'
      });
    }


    return Jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ status: 401, error: 'User authorization token is expired' });
        }
        return res.status(401).json({ status: 401, error: 'Invalid token' });
      }
      req.decoded = decoded;
      next();
    });
  }
}
