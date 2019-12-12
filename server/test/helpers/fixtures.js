import Jwt from 'jsonwebtoken';
import Authorization from '../../src/middleware/Authorization.middlewares';

const { generateToken } = Authorization;

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
  phoneNumber: '2341267890542',
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
  // phoneNumber: '',
  address: 'number 59 griffin'
};

const newEmail = {
  emails: ['uwembleble@gmail.com', 'pelelaki@gmail.com'],
  subject: 'hello worldy',
  message: 'Am running a good test',
  deliveryDate: '2019-12-14'
};

const newEmailTwo = {
  emails: ['ricky@gmail.com', 'chiben@gmail.com'],
  subject: 'hello worldy',
  message: 'Am running a good test',
  deliveryDate: '2019-12-14'
};

const emptyEmailField = {
  emails: [],
  subject: 'hello worldy',
  message: 'Am running a good test',
  deliveryDate: '2019-12-14'
};

const emptySubjectField = {
  emails: ['ricky@gmail.com', 'chiben@gmail.com'],
  subject: '',
  message: 'Am running a good test',
  deliveryDate: '2019-12-14'
};


const emptyMessageField = {
  emails: ['ricky@gmail.com', 'chiben@gmail.com'],
  subject: 'hello worldy',
  message: '',
  deliveryDate: '2019-12-14'
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
  deliveryDate: '2019-12-14'
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
  wrongEmailField
};
