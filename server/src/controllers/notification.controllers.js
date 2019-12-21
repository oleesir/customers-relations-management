import Model from '../db/index';
import { transporter, bccMailOptions } from '../utils/mailer';
import { twilio, messageOptions } from '../utils/messenger';

const customers = new Model('customers');
const notifications = new Model('notifications');
const sms_notifications = new Model('sms_notifications');

/**
 * @class NotificationsController
 */
export default class NotificationController {
  /**
     *@method sendEmailToGroup
     *
     * @param {object} req
     * @param {object} res
     *
     * @return {object} status and message
     */
  static async sendEmailToGroup(req, res) {
    const { role, id: staffId } = req.decoded;
    const {
      subject, message, emails, deliveryDate
    } = req.body;
    let foundCustomers;

    if (role === 'admin') {
      foundCustomers = await customers.select(['*'], [`email IN ('${emails.join("','")}')`]);
    } else {
      foundCustomers = await customers.select(['*'], [`email IN ('${emails.join("','")}') AND staff_id=${staffId}`]);
    }

    const foundCustomersEmail = foundCustomers.map((customer) => customer.email);

    if (foundCustomersEmail.length !== emails.length) {
      return res.status(400).json({
        status: 400,
        message: 'Message not queued because some of these customers were either not found or do not belong to you',
        wrongEmails: emails.filter((email) => !foundCustomersEmail.includes(email))
      });
    }

    if (foundCustomersEmail.length > 0) {
      try {
        const [notification] = await notifications.create(['message', 'subject', 'emails', 'staff_id', 'delivery_date'],
          [`'${message}','${subject}',ARRAY['${emails.join("','")}'],'${staffId}','${deliveryDate}'`]);
        const [firstCustomer, ...restCustomers] = notification.emails;

        await transporter.sendMail(
          bccMailOptions({
            to: firstCustomer,
            bcc: restCustomers,
            subject,
            html: message
          })
        );

        notification.status = 'delivered';
        await notifications.update(['status=\'delivered\''], [`id='${notification.id}'`]);

        return res.status(200).json({
          status: 200,
          data: {
            message: 'Email sent successfully',
            delivery_date: deliveryDate,
            message_id: notification.id,
            status: notification.status,
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  /**
     *@method automatedEmailToGroup
     *
     * @param {object} req
     * @param {object} res
     *
     * @return {object} status and message
     */
  static async sendScheduleEmailToGroup(req, res) {
    const { role, id: staffId } = req.decoded;
    const {
      subject, message, emails, deliveryDate
    } = req.body;
    let foundCustomers;

    if (role === 'admin') {
      foundCustomers = await customers.select(['*'], [`email IN ('${emails.join("','")}')`]);
    } else {
      foundCustomers = await customers.select(['*'], [`email  IN ('${emails.join("','")}') AND staff_id=${staffId}`]);
    }

    const foundCustomersEmail = foundCustomers.map((customer) => customer.emails);

    if (foundCustomersEmail.length !== emails.length) {
      return res.status(400).json({
        status: 400,
        message: 'Message not queued because some of these customers were either not found or do not belong to you',
        wrongEmails: emails.filter((email) => !foundCustomersEmail.includes(email))
      });
    }

    if (foundCustomersEmail.length > 0) {
      const [notification] = await notifications.create(['message', 'subject', 'emails', 'staff_id', 'delivery_date'],
        [`'${message}','${subject}',ARRAY['${emails.join("','")}'],'${staffId}','${deliveryDate}'`]);

      return res.status(200).json({
        status: 200,
        data: {
          message: 'Email queued',
          delivery_date: deliveryDate,
          message_id: notification.id,
          status: notification.status,
        }
      });
    }
  }

  /**
     *@method sendSmsToCustomer
     *
     * @param {object} req
     * @param {object} res
     *
     * @return {object} status and message
     */
  static async sendSmsToCustomer(req, res) {
    const { role, id: staffId } = req.decoded;
    const {
      message, deliveryDate, phoneNumbers
    } = req.body;
    let foundCustomers;

    if (role === 'admin') {
      foundCustomers = await customers.select(['*'], [`phone_number IN ('${phoneNumbers.join("','")}')`]);
    } else {
      foundCustomers = await customers.select(['*'], [`phone_number IN ('${phoneNumbers.join("','")}') AND staff_id=${staffId}`]);
    }

    const foundCustomersPhoneNumber = foundCustomers.map((customer) => customer.phoneNumber);

    if (foundCustomersPhoneNumber.length !== phoneNumbers.length) {
      return res.status(400).json({
        status: 400,
        message: 'Message not queued because some of these customers were either not found or do not belong to you',
        wrongPhoneNumbers: phoneNumbers
          .filter((phoneNumber) => !foundCustomersPhoneNumber.includes(phoneNumber))
      });
    }

    if (foundCustomersPhoneNumber.length > 0) {
      try {
        const [notification] = await sms_notifications.create(['message', 'phone_number', 'staff_id', 'delivery_date'],
          [`'${message}',ARRAY['${phoneNumbers.join("','")}'],'${staffId}','${deliveryDate}'`]);

        const handleMessage = async () => {
          const messaging = await twilio.messages.create(
            messageOptions({
              to: notification.phone_number,
              body: message
            })
          );
          return messaging;
        };

        handleMessage();
        await sms_notifications.update(['status=\'delivered\''], [`id='${notification.id}'`]);

        return res.status(200).json({
          status: 200,
          data: {
            message: 'Sms sent successfully',
            content: message

          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
}
