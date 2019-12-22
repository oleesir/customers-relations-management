import Jwt from 'jsonwebtoken';
import moment from 'moment';
import Authorization from '../../src/middleware/Authorization.middlewares';

const { generateToken } = Authorization;
const startDate = new Date();

const todaysDate = moment(startDate, 'YYYY-MM-DD').add('days', 1);
const newUser = {
  firstName: 'yellow',
  lastName: 'color',
  email: 'coloryellow@gmail.com',
  password: 'yellofghjk'
};

const emptyFields = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

const emptyFirstName = {
  ...newUser, firstName: ''
};
const emptyLastName = {
  ...newUser, lastName: ''
};

const nonAlphabetsFirstName = {
  ...newUser, firstName: 'reed32453*'
};

const nonAlphabetsLastName = {
  ...newUser, lastName: 'reed32453*'
};

const emptyEmail = {
  ...newUser, email: ''
};

const invalidEmail = {
  ...newUser, email: 'reedgmail.com'
};

const emptyPassword = {
  ...newUser, password: ''
};

const invalidPasswordLength = {
  ...newUser, password: 'wer'
};

const authUser = {
  email: 'nneka@gmail.com',
  password: 'helloworldtwo'
};

const emptyAuthUser = {
  ...authUser, email: '', password: ''
};

const emptyEmailAuthUser = {
  ...authUser, email: '', password: 'helloworldtwo'
};

const emptyPasswordAuthUser = {
  ...authUser, email: 'nneka@gmail.com', password: ''
};

const wrongUserAuth = {
  ...authUser, email: 'linker@gmail.com', password: 'wertiutoeu'
};

const wrongUserAuthEmail = {
  ...authUser, email: 'linker@gmail.com', password: 'helloworldtwo'
};

const wrongUserAuthPassword = {
  ...authUser, email: 'nneka@gmail.com', password: 'helloworldtwoo'
};

const wrongEmailAuthUser = {
  ...authUser, email: 'nnekagmail.com', password: 'helloworldtwo'
};

const existingEmail = {
  firstName: 'blue',
  lastName: 'ivy',
  email: 'coloryellow@gmail.com',
  password: 'poiuytrewq'
};


const staffPayload = {
  id: 5,
  email: 'ivy@gmail.com',
  firstName: 'Ivy',
  lastName: 'Lee',
  password: 'secret',
  role: 'staff'
};

const adminPayload = {
  id: 1,
  email: 'oleesir@gmail.com',
  firstName: 'Olisa',
  lastName: 'Emeka',
  password: 'secret',
  role: 'admin'
};

const staffToken = generateToken(staffPayload);
const adminToken = generateToken(adminPayload);
const expiredToken = Jwt.sign(staffPayload, process.env.SECRET_KEY, { expiresIn: '1' });


const newCustomer = {
  firstName: 'ben',
  lastName: 'chichi',
  email: 'chiben@gmail.com',
  phoneNumber: '+2341267890542',
  address: 'number 50 townsend'
};

const emptyCustomer = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: ''
};

const emptyCustomerFirstName = {
  ...newCustomer, firstName: ''
};

const emptyCustomerLastName = {
  ...newCustomer, lastName: ''
};

const emptyCustomerEmail = {
  ...newCustomer, email: ''
};

const emptyPhoneNumber = {
  ...newCustomer, phoneNumber: ''
};

const emptyaddress = {
  ...newCustomer, address: ''
};

const rightCustomerId = 4;
const wrongCustomerId = 1;
const invalidCustomerId = '1*/';
const deleteCustomerId = 1;
const deleteWrongCustomerId = 3;
const nonExistingCustomerId = 599098;
const updateCustomerId = 4;
const wrongUpdateCustomerId = 2;

const updateCustomer = {
  firstName: 'zika',
  lastName: 'chuchu',
  email: 'zikachu@gmail.com',
  phoneNumber: '+23464578893554',
  address: 'number 59 griffin'
};

const emptyUpdatedCustomer = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: ''
};

const newEmail = {
  emails: ['uwembleble@gmail.com', 'pelelaki@gmail.com'],
  subject: 'hello worldy',
  message: 'Am running a good test',
  deliveryDate: todaysDate
};

const newSms = {
  phoneNumbers: ['+2348155361655'],
  message: 'testing zone',
  deliveryDate: todaysDate
};

const newEmailTwo = {
  emails: ['ricky@gmail.com', 'chiben@gmail.com'],
  subject: 'hello worldy',
  message: 'Am running a good test',
  deliveryDate: todaysDate
};

const emptyEmailField = {
  emails: [],
  subject: 'hello worldy',
  message: 'Am running a good test',
  deliveryDate: todaysDate
};

const emptySubjectField = {
  emails: ['ricky@gmail.com', 'chiben@gmail.com'],
  subject: '',
  message: 'Am running a good test',
  deliveryDate: todaysDate
};


const emptyMessageField = {
  emails: ['ricky@gmail.com', 'chiben@gmail.com'],
  subject: 'hello worldy',
  message: '',
  deliveryDate: todaysDate
};

const emptyDeliveryDateField = {
  emails: ['ricky@gmail.com', 'chiben@gmail.com'],
  subject: 'hello worldy',
  message: 'Am running a good test',
  deliveryDate: ''
};

const wrongEmailField = {
  emails: ['pulvid@gmail.com', 'benjonny@gmail.com'],
  subject: 'hello worldy',
  message: 'Am running a good test',
  deliveryDate: todaysDate
};

const newAutoEmail = {
  emails: ['pelelaki@gmail.com'],
  // from: '"Example Team" <olisa-45f86f@inbox.mailtrap.io>',
  message: 'Am running a good test',
  subject: 'hello worldy',
  deliveryDate: todaysDate

};


export default {
  newUser,
  emptyFields,
  emptyFirstName,
  emptyLastName,
  nonAlphabetsFirstName,
  nonAlphabetsLastName,
  emptyEmail,
  invalidEmail,
  emptyPassword,
  invalidPasswordLength,
  existingEmail,
  authUser,
  wrongUserAuthPassword,
  emptyAuthUser,
  emptyEmailAuthUser,
  emptyPasswordAuthUser,
  wrongUserAuth,
  wrongUserAuthEmail,
  wrongEmailAuthUser,
  staffToken,
  adminToken,
  newCustomer,
  emptyCustomer,
  emptyCustomerFirstName,
  emptyCustomerLastName,
  emptyCustomerEmail,
  emptyPhoneNumber,
  emptyaddress,
  rightCustomerId,
  wrongCustomerId,
  invalidCustomerId,
  expiredToken,
  deleteCustomerId,
  deleteWrongCustomerId,
  nonExistingCustomerId,
  updateCustomerId,
  updateCustomer,
  wrongUpdateCustomerId,
  newEmail,
  newEmailTwo,
  emptyEmailField,
  emptySubjectField,
  emptyMessageField,
  emptyDeliveryDateField,
  wrongEmailField,
  newAutoEmail,
  emptyUpdatedCustomer,
  newSms
};
