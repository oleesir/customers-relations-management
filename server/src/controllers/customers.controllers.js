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

  /**
     *@method getSingleCustomer
     *
     * @param {object} req
     * @param {object} res
     *
     * @return {object} status and message
     */
  static async getSingleCustomer(req, res) {
    const { id } = req.params;
    const { role, id: staffId } = req.decoded;

    let findCustomer;

    if (role === 'staff') {
      [findCustomer] = await customers.select(['*'],
        [`id = ${parseInt(id, 10)} AND staff_id = ${staffId}`]);
    } else {
      [findCustomer] = await customers.select(['*'],
        `id=${parseInt(id, 10)}`);
    }

    if (!findCustomer) {
      return res.status(404).json({
        status: 404,
        message: 'Customer does not exists'
      });
    }

    const {
      id: customerId, firstName, lastName, email, phoneNumber, address
    } = findCustomer;

    const data = {
      customerId,
      firstName,
      lastName,
      email,
      phoneNumber,
      address
    };

    return res.status(200).json({
      status: 200,
      data
    });
  }


  /**
     *@method getAllCustomer
     *
     * @param {object} req
     * @param {object} res
     *
     * @return {object} status and message
     */
  static async getAllCustomers(req, res) {
    const { role, id: staffId } = req.decoded;
    const { status } = req.query;

    if (role === 'admin') {
      if (!status) {
        const allCustomers = await customers.selectAll(['*']);
        return res.status(200).json({
          status: 200,
          customers: allCustomers
        });
      }
      const activeCustomers = await customers.select(['*'], [`status='${status}'`]);
      return res.status(200).json({
        status: 200,
        customers: activeCustomers
      });
    }


    if (!status) {
      const allCustomersForStaff = await customers.select(['*'], [`staff_id='${staffId}'`]);
      return res.status(200).json({
        status: 200,
        customers: allCustomersForStaff
      });
    }


    const allActiveCustomersForStaff = await customers.select(['*'], [` staff_id = ${staffId} AND status='${status}'`]);
    return res.status(200).json({
      status: 200,
      customers: allActiveCustomersForStaff
    });
  }

  /**
     *@method deleteCustomer
     *
     * @param {object} req
     * @param {object} res
     *
     * @return {object} status and message
     */
  static async deleteCustomer(req, res) {
    const { id } = req.params;
    const { role, id: staffId } = req.decoded;
    let findCustomer;

    if (role === 'admin') {
      [findCustomer] = await customers.select(['*'], [`id=${parseInt(id, 10)}`]);
    } else {
      [findCustomer] = await customers.select(['*'], [`id=${parseInt(id, 10)} AND staff_id=${staffId}`]);
    }

    if (!findCustomer) {
      return res.status(404).json({
        status: 404,
        message: 'Customer does not exists'
      });
    }

    await customers.delete([`id=${findCustomer.id}`]);

    return res.status(200).json({
      status: 200,
      message: 'Customer deleted successfully'
    });
  }
}
