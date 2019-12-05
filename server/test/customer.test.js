
import '@babel/polyfill';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';
import Fixtures from './helpers/fixtures';

const {
  staffToken, newCustomer, emptyCustomer, emptyCustomerFirstName,
  emptyCustomerLastName, emptyCustomerEmail, emptyPhoneNumber,
  emptyaddress, rightCustomerId, wrongCustomerId, adminToken,
  expiredToken, deleteCustomerId, deleteWrongCustomerId,
  nonExistingCustomerId, updateCustomerId, updateCustomer,
  wrongUpdateCustomerId
} = Fixtures;
const URL = '/api/v1';

describe('Customer Routes', () => {
  describe('Create Customer', () => {
    it('should create a form for a customer', (done) => {
      request(app)
        .post(`${URL}/customers`)
        .send(newCustomer)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(201)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('message').equal('Customer was created succesfully');
          if (err) return done(err);
          done();
        });
    });

    it('should not create customer with empty fields', (done) => {
      request(app)
        .post(`${URL}/customers`)
        .send(emptyCustomer)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body.error[0]).to.equal('"firstName" is not allowed to be empty');
          expect(res.body.error[1]).to.equal('"lastName" is not allowed to be empty');
          expect(res.body.error[2]).to.equal('"email" is not allowed to be empty');
          expect(res.body.error[3]).to.equal('"phoneNumber" is not allowed to be empty');
          expect(res.body.error[4]).to.equal('"address" is not allowed to be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should not create customer with empty firstName field', (done) => {
      request(app)
        .post(`${URL}/customers`)
        .send(emptyCustomerFirstName)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body.error[0]).to.equal('"firstName" is not allowed to be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should not create customer with empty lastName field', (done) => {
      request(app)
        .post(`${URL}/customers`)
        .send(emptyCustomerLastName)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body.error[0]).to.equal('"lastName" is not allowed to be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should send an error message if token is not provided', (done) => {
      request(app)
        .post(`${URL}/customers`)
        .send(newCustomer)
        .set('Authorization', `Bearer ${''}`)
        .expect(401)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('message').equal('Please provide a token');
          if (err) return done(err);
          done();
        });
    });


    it('should send an error message if token is not expired', (done) => {
      request(app)
        .post(`${URL}/customers`)
        .send(newCustomer)
        .set('Authorization', `Bearer ${expiredToken}`)
        .expect(401)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('error').equal('User authorization token is expired');
          if (err) return done(err);
          done();
        });
    });

    it('should not create customer with empty email field', (done) => {
      request(app)
        .post(`${URL}/customers`)
        .send(emptyCustomerEmail)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body.error[0]).to.equal('"email" is not allowed to be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should not create customer with empty phoneNumber field', (done) => {
      request(app)
        .post(`${URL}/customers`)
        .send(emptyPhoneNumber)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body.error[0]).to.equal('"phoneNumber" is not allowed to be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should not create customer with empty address field', (done) => {
      request(app)
        .post(`${URL}/customers`)
        .send(emptyaddress)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body.error[0]).to.equal('"address" is not allowed to be empty');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Get Customer', () => {
    it('should allow a staff get a single customer', (done) => {
      request(app)
        .get(`${URL}/customers/${rightCustomerId}`)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(200);
          expect(res.body.data).to.have.property('customerId').eql(rightCustomerId);
          if (err) return done(err);
          done();
        });
    });


    it('should not get a customerId that does not belong to a customer', (done) => {
      request(app)
        .get(`${URL}/customers/${wrongCustomerId}`)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(404);
          expect(res.body).to.have.property('message').to.eql('Customer does not exists');
          if (err) return done(err);
          done();
        });
    });

    it('should get any account for admin', (done) => {
      request(app)
        .get(`${URL}/customers/${rightCustomerId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(200);
          expect(res.body.data).to.have.property('customerId').eql(rightCustomerId);
          if (err) return done(err);
          done();
        });
    });
  });


  describe('Get all Customers', () => {
    it('should get all customers for an admin', (done) => {
      request(app)
        .get(`${URL}/customers`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(200);
          expect(res.status).to.equal(200);
          if (err) return done(err);
          done();
        });
    });

    it('should get all customers registered by a staff', (done) => {
      request(app)
        .get(`${URL}/customers`)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(200);
          expect(res.status).to.equal(200);
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Delete Account', () => {
    it('should allow an admin to delete an account', (done) => {
      request(app)
        .delete(`${URL}/customers/${deleteCustomerId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(200);
          expect(res.body).to.have.property('message').to.eql('Customer deleted successfully');
          expect(res.status).to.equal(200);
          if (err) return done(err);
          done();
        });
    });

    it('Should not a customer that was not created by an authorized staff', (done) => {
      request(app)
        .delete(`${URL}/customers/${deleteWrongCustomerId}`)
        .set('Authorization', `Bearer ${staffToken}`)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(404);
          expect(res.body).to.have.property('message').to.eql('Customer does not exists');
          if (err) return done(err);
          done();
        });
    });


    it('should not delete a non-existing customer', (done) => {
      request(app)
        .delete(`${URL}/customers/${nonExistingCustomerId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(404);
          expect(res.body).to.have.property('message').to.eql('Customer does not exists');
          expect(res.status).to.equal(404);
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Update Customer', () => {
    it('should allow a staff to update a customer', (done) => {
      request(app)
        .patch(`${URL}/customers/${updateCustomerId}`)
        .set('Authorization', `Bearer ${staffToken}`)
        .send(updateCustomer)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(200);
          expect(res.body).to.have.property('message').eql('Customer updated successfully');
          if (err) return done(err);
          done();
        });
    });

    it('should not allow a staff edit an account he or she did not create', (done) => {
      request(app)
        .patch(`${URL}/customers/${wrongUpdateCustomerId}`)
        .set('Authorization', `Bearer ${staffToken}`)
        .send(updateCustomer)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(404);
          expect(res.body).to.have.property('message').to.eql('Customer does not exists');
          if (err) return done(err);
          done();
        });
    });


    it('should not allow a staff edit a non existing customer', (done) => {
      request(app)
        .patch(`${URL}/customers/${nonExistingCustomerId}`)
        .set('Authorization', `Bearer ${staffToken}`)
        .send(updateCustomer)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql(404);
          expect(res.body).to.have.property('message').to.eql('Customer does not exists');
          if (err) return done(err);
          done();
        });
    });
  });
});
