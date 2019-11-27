import bcrypt from 'bcrypt';


const saltRounds = 10;

/**
 * @class Encryption
 */
export default class Encryption {
  /**
     * @method hashPassword
     *
     * @param {string} myPlaintextPassword
     *
     * @returns {string} encryptedpassword
     */
  static hashPassword(myPlaintextPassword) {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(myPlaintextPassword, salt);
  }

  /**
   * @method comparePassword
   *
   * @param {string} password
   * @param {string} hash
   *
   * @returns {string} hashPassword
   */
  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}
