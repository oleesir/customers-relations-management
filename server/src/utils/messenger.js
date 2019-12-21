import Twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();
const {
  TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER
} = process.env;

const twilio = Twilio(
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN
);

const messageOptions = ({ to, body }) => ({
  to,
  from: TWILIO_NUMBER,
  body
});


export {
  twilio, messageOptions
};
