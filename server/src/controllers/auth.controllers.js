import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Encryption from '../utils/encryption';
import Model from '../db/index';

dotenv.config();

const users = new Model('users');

const { hashPassword } = Encryption;


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

    if (existingUser) {
      res.status(409).json({
        status: 409,
        message: 'User already exists'
      });
    }

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

    const token = Jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1day' });

    delete newUser.password;

    const data = {
      token,
      ...newUser
    };

    return res.status(201).json({
      status: 201,
      data,
      message: 'User registered successfully'
    });
  }
}
