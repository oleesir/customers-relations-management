import nodemailer from 'nodemailer';

/**
 * create transporter method
 */
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '26fdd55cbd69c7',
    pass: '8ac614886118b2'
  }
});

/**
   * Creates a method to return the mail options for the transporter
     *
     * @param {string} to
     * @param {string} subject
     * @param {string} html
     *
     * @return {void}
     */
const mailOptions = ({ to, subject, html }) => ({
  from: '"Example Team" <olisa-45f86f@inbox.mailtrap.io>',
  to,
  subject,
  html
});

const bccMailOptions = ({
  to, bcc, subject, html
}) => ({
  from: '"Example Team" <olisa-45f86f@inbox.mailtrap.io>',
  to,
  bcc,
  subject,
  html
});

export {
  transporter, mailOptions, bccMailOptions
};
