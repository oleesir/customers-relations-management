import Model from '../db/index';


const customers = new Model('customers');


/**
 * @class CustomersController
 */
export default class CustomersController {
  /**
     *@method createCustomer
     *
     * @param {object} req
     * @param {object} res
     *
     * @return {object} status and message
     */
  static async createCustomer(req, res) {
    const { id, firstName: staffFirstName, lastName: staffLastName } = req.decoded;
    const {
      firstName, lastName, email, phoneNumber, address
    } = req.body;


    const [newCustomer] = await customers.create(['first_name', 'last_name', 'staff_id', 'staff_name', 'email', 'status', 'phone_number', 'address'],
      [`'${firstName}','${lastName}','${id}','${staffFirstName} ${staffLastName}','${email}','inactive',${phoneNumber},'${address}'`]);


    const data = {
      firstName: newCustomer.firstName,
      lastName: newCustomer.lastName,
      staffId: newCustomer.id,
      email: newCustomer.email,
      status: newCustomer.status,
      phoneNumber: newCustomer.phoneNumber,
      address: newCustomer.address
    };

    return res.status(201).json({
      status: 201,
      data,
      message: 'Customer was created succesfully'
    });
  }
}
