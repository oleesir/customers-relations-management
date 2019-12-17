import '@babel/polyfill';
import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import Mailer from 'nodemailer/lib/mailer';
import moment from 'moment';
import app from '../src/app';
import Fixtures from './helpers/fixtures';

import Model from '../src/db/index';
import { sendMail } from '../src/utils/schedules';

const notifications = new Model('notifications');


const {
  adminToken, newAutoEmail
} = Fixtures;
const URL = '/api/v1/notifications';


describe('Email Routes', () => {
  const sandbox = sinon.sandbox.create();
  const fakeSendMail = sinon.fake.resolves();

  before(() => {
    sandbox.replace(Mailer.prototype, 'sendMail', fakeSendMail);
  });

  after(() => {
    sandbox.restore();
  });


  describe('Automated Email', () => {
    it('should schedule the notification', (done) => {
      request(app)
        .post(`${URL}/autoEmail`)
        .send(newAutoEmail)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .end(async (err, res) => {
          console.log(res.body);

          if (err) return done(err);
          done();
        });
    });

    it('should send a scheduled notification when the sendMail function is called', async () => {
      const deliveryDate = moment().subtract(2, 'minutes').format();
      const [notification] = await notifications.create(['message', 'subject', 'emails', 'staff_id', 'delivery_date'],
        [`'${newAutoEmail.message}','${newAutoEmail.subject}',ARRAY['${newAutoEmail.emails.join("','")}'],'${1}','${deliveryDate}'`]);
      const notificationId = notification.id;

      await sendMail();

      const [scheduledNotification] = await notifications.select(['*'], [`id= ${notificationId}`]);

      expect(scheduledNotification.status).to.equal('delivered');

      sinon.assert.callCount(fakeSendMail, 3);
      sinon.assert.calledWith(fakeSendMail, {
        bcc: ['pelelaki@gmail.com'],
        from: '"Example Team" <olisa-45f86f@inbox.mailtrap.io>',
        html: 'Am running a good test',
        subject: 'hello worldy',
        to: 'uwembleble@gmail.com'
      });
    });
  });
});
