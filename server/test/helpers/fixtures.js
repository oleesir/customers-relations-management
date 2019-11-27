import Jwt from 'jsonwebtoken';

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
  wrongEmailAuthUser
};
