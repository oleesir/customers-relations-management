import dotenv from 'dotenv';
import Encryption from '../utils/encryption';
import Model from '../db/index';
import Authorization from '../middleware/Authorization.middlewares';

dotenv.config();

const users = new Model('users');

const { hashPassword, comparePassword } = Encryption;
const { generateToken } = Authorization;

/**
 * @class AuthController
 */
export default class AuthController {
/**
 * @method signup
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {object} status and message
 */
  static async signup(req, res) {
    const {
      firstName, lastName, email, password
    } = req.body;

    const [existingUser] = await users.select(['email'], [`email = '${email}'`]);

    if (existingUser) res.status(409).json({ status: 409, message: 'User already exists' });

    const hash = hashPassword(password);
    const [newUser] = await users.create(['first_name', 'last_name', 'email', 'password', 'role'],
      [`'${firstName}','${lastName}','${email}','${hash}','staff'`]);

    const payload = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role
    };

    const token = generateToken(payload);
    const data = { token, ...newUser };

    return res.status(201).json({ status: 201, data, message: 'User registered successfully' });
  }

  /**
 * @method signin
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {object} status and message
 */
  static async signin(req, res) {
    const { email, password } = req.body;
    const [findUser] = await users.select(['*'], `email = '${email}'`);

    if (!findUser) res.status(401).json({ status: 401, message: 'Email or password is incorrect' });

    if (findUser) {
      const {
        id,
        firstName,
        lastName,
        role
      } = findUser;

      const verifyPassword = comparePassword(password, findUser.password);

      if (!verifyPassword) res.status(401).json({ status: 401, message: 'Email or password is incorrect' });

      const payload = {
        id, firstName, lastName, role
      };

      const token = generateToken(payload);
      const data = { ...payload, token };

      return res.status(200).json({ status: 200, data, message: 'Login successful' });
    }
    return res.status(401).json({ status: 401, message: 'Email or password is incorrect' });
  }
}
