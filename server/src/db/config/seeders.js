import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const { ADMIN_PASSWORD, STAFF_PASSWORD } = process.env;
const adminPassword = bcrypt.hashSync(ADMIN_PASSWORD, 10);
const staffPassword = bcrypt.hashSync(STAFF_PASSWORD, 10);

export default `

  INSERT INTO users (first_name, last_name, email ,password, role)
  VALUES('Olisa', 'Emeka', 'oleesir@gmail.com' ,'${adminPassword}', 'admin'); 
  INSERT INTO users (first_name, last_name, email ,password, role)
  VALUES('Nneka', 'Oguah', 'nneka@gmail.com' ,'${staffPassword}', 'staff'); 
  INSERT INTO users (first_name, last_name, email ,password, role)
  VALUES('James', 'Udoh', 'james@gmail.com' ,'${staffPassword}', 'staff'); 
  INSERT INTO users (first_name, last_name, email ,password, role)
  VALUES('Amaka', 'Emodi', 'amaka@gmail.com' ,'${adminPassword}', 'staff'); 
  INSERT INTO users (first_name, last_name, email ,password, role)
  VALUES('Ivy', 'Lee', 'ivy@gmail.com' ,'${staffPassword}', 'staff'); 

  INSERT INTO customers (first_name, last_name, email , staff_id, staff_name, address, phone_number, status)
  VALUES('Gordon', 'Brown', 'gordonb@gmail.com' , 2, 'Nneka Oguah','number 39 akoka modupe lane','+2349034340224','active'); 
  INSERT INTO customers (first_name, last_name, email , staff_id, staff_name, address, phone_number, status)
  VALUES('Ben', 'Jonny', 'benjonny@gmail.com' , 3, 'James Udoh','unilag road akoka lane','+2348155361655','active'); 
  INSERT INTO customers (first_name, last_name, email , staff_id, staff_name, address, phone_number, status)
  VALUES('Blessing', 'Uwem', 'uwembleble@gmail.com' , 2, 'Nneka Oguah','number 7 akoka modupe lane','+2347456392534','inactive'); 
  INSERT INTO customers (first_name, last_name, email , staff_id, staff_name, address, phone_number, status)
  VALUES('Nicholas', 'Anelka', 'anelkanic@gmail.com' , 5, 'Ivy Lee','number 8 akoka modupe lane','+2347568903467','inactive'); 
  INSERT INTO customers (first_name, last_name, email , staff_id, staff_name, address, phone_number, status)
  VALUES('Abedi', 'Pele', 'pelelaki@gmail.com' , 2, 'Nneka Oguah','number 9 akoka modupe lane','+2346789876453','active'); 
  INSERT INTO customers (first_name, last_name, email , staff_id, staff_name, address, phone_number, status)
  VALUES('Ronaldo', 'Ricky', 'ricky@gmail.com' , 5, 'Ivy Lee','number 10 akoka modupe lane','+2346345278945','active'); 
  INSERT INTO customers (first_name, last_name, email , staff_id, staff_name, address, phone_number, status)
  VALUES('Vidic', 'Pulsic', 'pulvid@gmail.com' , 3, 'James Udoh','number 11 akoka modupe lane','+2341234332512','active');  


  INSERT INTO notifications (staff_id, subject, message, emails, status , delivery_date)
  VALUES(2, 'hello world', 'hello you are now getting better with backend', ARRAY['gordonb@gmail.com', 'benjonny@gmail.com', 'iverenshaguy@gmail.com'], 'undelivered' , '2019-12-03 10:05:19.148088'); 
  INSERT INTO notifications (staff_id, subject, message, emails, status , delivery_date)
  VALUES(3, 'hello world', 'hello you are now getting better with backend',  ARRAY['benjonny@gmail.com'], 'undelivered' , '2019-12-15 10:05:19.148088'); 
  INSERT INTO notifications (staff_id, subject, message, emails, status , delivery_date)
  VALUES(2, 'hello world', 'hello you are now getting better with backend', ARRAY['uwembleble@gmail.com'], 'delivered' , '2019-12-03 10:05:19.148088'); 
  INSERT INTO notifications (staff_id, subject, message, emails, status , delivery_date)
  VALUES(5, 'hello world', 'hello you are now getting better with backend', ARRAY['anelkanic@gmail.com'], 'delivered' , '2019-12-03 10:05:19.148088'); 
  INSERT INTO notifications (staff_id, subject, message, emails, status , delivery_date)
  VALUES(2, 'hello world', 'hello you are now getting better with backend', ARRAY['pelelaki@gmail.com'], 'delivered' , '2019-12-03 10:05:19.148088');  
  INSERT INTO notifications (staff_id, subject, message, emails, status , delivery_date)
  VALUES(5, 'hello world', 'hello you are now getting better with backend', ARRAY['ricky@gmail.com'], 'undelivered' , '2019-12-15 10:05:19.148088');  
  INSERT INTO notifications (staff_id, subject, message, emails, status , delivery_date)
  VALUES(3, 'hello world', 'hello you are now getting better with backend', ARRAY['pulvid@gmail.com'], 'delivered' , '2019-12-03 10:05:19.148088'); 

  INSERT INTO sms_notifications (staff_id,message, phone_number, status , delivery_date)
  VALUES(2,'hello you are now getting better with backend',ARRAY['+2349528396531','+2349856743642'], 'undelivered' , '2019-12-03 10:05:19.148088'); 
  INSERT INTO sms_notifications (staff_id,message, phone_number, status , delivery_date)
  VALUES(3,'hello you are now getting better with backend',ARRAY['+2347456392534','+2347568903467'], 'undelivered' , '2019-12-15 10:05:19.148088'); 
  
`;
