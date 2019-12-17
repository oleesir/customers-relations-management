import cron from 'node-cron';
import Model from '../db/index';
import { transporter, bccMailOptions } from './mailer';


const notifications = new Model('notifications');

export const sendMail = async () => {
  // get notifications to be sent from db
  const notificationsToSend = await notifications.select(['*'], ['delivery_date BETWEEN (now() - \'5 minutes\'::interval) AND now() AND status = \'undelivered\'']);

  if (notificationsToSend.length > 0) {
    const notificationPromises = notificationsToSend.map(async (notification) => {
      const { subject, emails, message } = notification;
      const [firstCustomer, ...restCustomers] = emails;

      await transporter.sendMail(
        bccMailOptions({
          to: firstCustomer,
          bcc: restCustomers,
          subject,
          html: message
        })
      );

      const [result] = await notifications.update(['status=\'delivered\''], [`id='${notification.id}'`]);

      return result;
    });

    await Promise.all(notificationPromises);
  }
};

const scheduler = async () => {
  cron.schedule('*/5 * * * *', async () => {
    await sendMail();
  });
};


export default scheduler;
