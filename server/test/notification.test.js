import '@babel/polyfill';
import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import Mailer from 'nodemailer/lib/mailer';
import app from '../src/app';
import Fixtures from './helpers/fixtures';


const {
  adminToken, newEmail, staffToken, newEmailTwo, emptyEmailField,
  emptySubjectField, emptyMessageField, wrongEmailField,
  emptyDeliveryDateField
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

  describe('Send Email', () => {
    it('should allow an admin send an email to a group of customers', (done) => {
      request(app)
        .post(`${URL}/email`)
        .send(newEmail)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          sinon.assert.calledOnce(fakeSendMail);
          sinon.assert.calledWith(fakeSendMail, {
            bcc: ['pelelaki@gmail.com'],
            from: '"Example Team" <olisa-45f86f@inbox.mailtrap.io>',
            html: 'Am running a good test',
            subject: 'hello worldy',
            to: 'uwembleble@gmail.com'
          });

          if (err) return done(err);
          done();
        });
    });

    it('should allow a staff send an email to a group of customers', (done) => {
      request(app)
        .post(`${URL}/email`)
        .send(newEmailTwo)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          sinon.assert.calledTwice(fakeSendMail);
          sinon.assert.calledWith(fakeSendMail, {
            bcc: ['chiben@gmail.com'],
            from: '"Example Team" <olisa-45f86f@inbox.mailtrap.io>',
            html: 'Am running a good test',
            subject: 'hello worldy',
            to: 'ricky@gmail.com'
          });

          if (err) return done(err);
          done();
        });
    });


    it('should not allow a staff send an empty email field to a group of customers', (done) => {
      request(app)
        .post(`${URL}/email`)
        .send(emptyEmailField)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('error')
            .eql([
              '"emails" does not contain 1 required value(s)',
              '"emails" must contain at least 1 items'
            ]);
          if (err) return done(err);
          done();
        });
    });

    it('should not allow a staff send an empty subject field to a group of customers', (done) => {
      request(app)
        .post(`${URL}/email`)
        .send(emptySubjectField)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('error')
            .eql([
              '"subject" is not allowed to be empty'
            ]);
          if (err) return done(err);
          done();
        });
    });

    it('should not allow a staff send an empty message field to a group of customers', (done) => {
      request(app)
        .post(`${URL}/email`)
        .send(emptyMessageField)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('error')
            .eql([
              '"message" is not allowed to be empty'
            ]);
          if (err) return done(err);
          done();
        });
    });

    it('should not allow a staff send an empty date field to a group of customers', (done) => {
      request(app)
        .post(`${URL}/email`)
        .send(emptyDeliveryDateField)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('error')
            .eql([
              '"deliveryDate" must be a valid date'
            ]);
          if (err) return done(err);
          done();
        });
    });


    it('should not allow a staff send message to the wrong group of customers', (done) => {
      request(app)
        .post(`${URL}/email`)
        .send(wrongEmailField)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('message').eql('Message not queued because some of these customers were either not found or do not belong to you');
          expect(res.body).to.have.property('wrongEmails').eql([
            'pulvid@gmail.com', 'benjonny@gmail.com'
          ]);
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Auto Send Email', () => {
    it('should not allow a staff send an empty email field to a group of customers', (done) => {
      request(app)
        .post(`${URL}/autoEmail`)
        .send(emptyEmailField)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('error')
            .eql([
              '"emails" does not contain 1 required value(s)',
              '"emails" must contain at least 1 items'
            ]);
          if (err) return done(err);
          done();
        });
    });

    it('should not allow a staff send an empty subject field to a group of customers', (done) => {
      request(app)
        .post(`${URL}/autoEmail`)
        .send(emptySubjectField)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('error')
            .eql([
              '"subject" is not allowed to be empty'
            ]);
          if (err) return done(err);
          done();
        });
    });

    it('should not allow a staff send an empty message field to a group of customers', (done) => {
      request(app)
        .post(`${URL}/autoEmail`)
        .send(emptyMessageField)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('error')
            .eql([
              '"message" is not allowed to be empty'
            ]);
          if (err) return done(err);
          done();
        });
    });

    it('should not allow a staff send an empty date field to a group of customers', (done) => {
      request(app)
        .post(`${URL}/autoEmail`)
        .send(emptyDeliveryDateField)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('error')
            .eql([
              '"deliveryDate" must be a valid date'
            ]);
          if (err) return done(err);
          done();
        });
    });


    it('should not allow a staff send message to the wrong group of customers', (done) => {
      request(app)
        .post(`${URL}/autoEmail`)
        .send(wrongEmailField)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('message').eql('Message not queued because some of these customers were either not found or do not belong to you');
          expect(res.body).to.have.property('wrongEmails').eql([
            'pulvid@gmail.com', 'benjonny@gmail.com'
          ]);
          if (err) return done(err);
          done();
        });
    });
  });
});
