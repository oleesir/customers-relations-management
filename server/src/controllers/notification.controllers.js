import Model from '../db/index';
import { transporter, bccMailOptions } from '../utils/mailer';

const customers = new Model('customers');
const notifications = new Model('notifications');

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
}
