// import '@babel/polyfill';
// import { expect } from 'chai';
// import request from 'supertest';
// import sinon from 'sinon';
// // import Mailer from 'nodemailer/lib/mailer';
// // import Twilio from 'twilio';
// import dotenv from 'dotenv';
// import mock from 'mock-require';
// import app from '../src/app';
// import Fixtures from './helpers/fixtures';

// dotenv.config();
// // const { TWILIO_NUMBER } = process.env;

// mock('twilio', () => ({
//   messages: {
//     create: sinon.stub()
//   },
// }));


// const {
//   adminToken, newSms
// } = Fixtures;
// const URL = '/api/v1/notifications';


// describe('SMS Routes', () => {
//   // const sandbox = sinon.sandbox.create();
//   // const fakeSendSms = sinon.fake.resolves();

//   // const twilioStub = {
//   //   messaging: sinon.stub(),
//   //   remove: sinon.stub()
//   // };
//   // sinon.stub(myAwesomeModule, 'sendS').returns(twilioStub);

//   // before(() => {
//   //   console.log(Twilio());
//   //   sandbox.replace(Twilio.prototype.messages, 'handleMessage', {});
//   // });

//   // after(() => {
//   //   sandbox.restore();
//   // });

//   describe('Send Sms', () => {
//     it('should allow an admin send an sms to a group of customers', (done) => {
//       request(app)
//         .post(`${URL}/sms`)
//         .send(newSms)
//         .set('Authorization', `Bearer ${adminToken}`)
//         .expect(200)
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           // sinon.assert.calledOnce(fakeSendSms);
//           // sinon.assert.calledWith(fakeSendSms, {
//           //   to: ['+2349034340224'],
//           //   from: TWILIO_NUMBER,
//           //   body: 'hello test'
//           // });
//           if (err) return done(err);
//           done();
//         });
//     });

// it('should allow a staff send an email to a group of customers', (done) => {
//   request(app)
//     .post(`${URL}/email`)
//     .send(newEmailTwo)
//     .set('Authorization', `Bearer ${staffToken}`)
//     .expect(200)
//     .end((err, res) => {
//       expect(res.status).to.equal(200);
//       sinon.assert.calledTwice(fakeSendMail);
//       sinon.assert.calledWith(fakeSendMail, {
//         bcc: ['chiben@gmail.com'],
//         from: '"Example Team" <olisa-45f86f@inbox.mailtrap.io>',
//         html: 'Am running a good test',
//         subject: 'hello worldy',
//         to: 'ricky@gmail.com'
//       });

//       if (err) return done(err);
//       done();
//     });
// });


// it('should not allow a staff send an empty email field to a group of customers', (done) => {
//   request(app)
//     .post(`${URL}/email`)
//     .send(emptyEmailField)
//     .set('Authorization', `Bearer ${staffToken}`)
//     .expect(400)
//     .end((err, res) => {
//       expect(res.status).to.equal(400);
//       expect(res.body).to.have.property('error')
//         .eql([
//           '"emails" does not contain 1 required value(s)',
//           '"emails" must contain at least 1 items'
//         ]);
//       if (err) return done(err);
//       done();
//     });
// });

// it('should not allow a staff send an empty subject field to a group of customers', (done) => {
//   request(app)
//     .post(`${URL}/email`)
//     .send(emptySubjectField)
//     .set('Authorization', `Bearer ${staffToken}`)
//     .expect(400)
//     .end((err, res) => {
//       expect(res.status).to.equal(400);
//       expect(res.body).to.have.property('error')
//         .eql([
//           '"subject" is not allowed to be empty'
//         ]);
//       if (err) return done(err);
//       done();
//     });
// });

// it('should not allow a staff send an empty message field to a group of customers', (done) => {
//   request(app)
//     .post(`${URL}/email`)
//     .send(emptyMessageField)
//     .set('Authorization', `Bearer ${staffToken}`)
//     .expect(400)
//     .end((err, res) => {
//       expect(res.status).to.equal(400);
//       expect(res.body).to.have.property('error')
//         .eql([
//           '"message" is not allowed to be empty'
//         ]);
//       if (err) return done(err);
//       done();
//     });
// });

// it('should not allow a staff send an empty date field to a group of customers', (done) => {
//   request(app)
//     .post(`${URL}/email`)
//     .send(emptyDeliveryDateField)
//     .set('Authorization', `Bearer ${staffToken}`)
//     .expect(400)
//     .end((err, res) => {
//       expect(res.status).to.equal(400);
//       expect(res.body).to.have.property('error')
//         .eql([
//           '"deliveryDate" must be a valid date'
//         ]);
//       if (err) return done(err);
//       done();
//     });
// });


// it('should not allow a staff send message to the wrong group of customers', (done) => {
//   request(app)
//     .post(`${URL}/email`)
//     .send(wrongEmailField)
//     .set('Authorization', `Bearer ${staffToken}`)
//     .expect(400)
//     .end((err, res) => {
//       expect(res.status).to.equal(400);
//       expect(res.body).to.have.property('message').eql('Message not queued because some of these customers were either not found or do not belong to you');
//       expect(res.body).to.have.property('wrongEmails').eql([
//         'pulvid@gmail.com', 'benjonny@gmail.com'
//       ]);
//       if (err) return done(err);
//       done();
//     });
// });
// });

// describe('Auto Send Email', () => {
//   it('should not allow a staff send an empty email field to a group of customers', (done) => {
//     request(app)
//       .post(`${URL}/autoEmail`)
//       .send(emptyEmailField)
//       .set('Authorization', `Bearer ${staffToken}`)
//       .expect(400)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('error')
//           .eql([
//             '"emails" does not contain 1 required value(s)',
//             '"emails" must contain at least 1 items'
//           ]);
//         if (err) return done(err);
//         done();
//       });
//   });

//   it('should not allow a staff send an empty subject field to a group of customers', (done) => {
//     request(app)
//       .post(`${URL}/autoEmail`)
//       .send(emptySubjectField)
//       .set('Authorization', `Bearer ${staffToken}`)
//       .expect(400)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('error')
//           .eql([
//             '"subject" is not allowed to be empty'
//           ]);
//         if (err) return done(err);
//         done();
//       });
//   });

//   it('should not allow a staff send an empty message field to a group of customers', (done) => {
//     request(app)
//       .post(`${URL}/autoEmail`)
//       .send(emptyMessageField)
//       .set('Authorization', `Bearer ${staffToken}`)
//       .expect(400)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('error')
//           .eql([
//             '"message" is not allowed to be empty'
//           ]);
//         if (err) return done(err);
//         done();
//       });
//   });

//   it('should not allow a staff send an empty date field to a group of customers', (done) => {
//     request(app)
//       .post(`${URL}/autoEmail`)
//       .send(emptyDeliveryDateField)
//       .set('Authorization', `Bearer ${staffToken}`)
//       .expect(400)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('error')
//           .eql([
//             '"deliveryDate" must be a valid date'
//           ]);
//         if (err) return done(err);
//         done();
//       });
//   });


//   it('should not allow a staff send message to the wrong group of customers', (done) => {
//     request(app)
//       .post(`${URL}/autoEmail`)
//       .send(wrongEmailField)
//       .set('Authorization', `Bearer ${staffToken}`)
//       .expect(400)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message').eql('Message not queued because some of these customers were either not found or do not belong to you');
//         expect(res.body).to.have.property('wrongEmails').eql([
//           'pulvid@gmail.com', 'benjonny@gmail.com'
//         ]);
//         if (err) return done(err);
//         done();
//       });
//   });
// });
// });
