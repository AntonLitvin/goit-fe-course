//  При загрузке страницы у посетителя запрашивается логин через prompt:
  
//     - Если посетитель нажал Cancel — показыать alert с текстом 'Отменено пользователем!'
//     - Если было введено что либо другое, что не совпадает со значением константы ADMIN_LOGIN, 
//        показывать alert с текстом 'Доступ запрещен!'   
//     - Если был введен логин совпадающий со значением константы ADMIN_LOGIN, спрашивать пароль через prompt.
    
//   При вводе пароля:
  
//       - Если нажали Cancel, показывать alert с текстом 'Отменено пользователем!'
//       - Если введен пароль который не совпадает со значением константы ADMIN_PASSWORD,
//         показывать alert с текстом 'Доступ запрещен!'        
//       - Если введён пароль который совпадает со значением константы ADMIN_PASSWORD, 
//         показывать alert с текстом 'Добро пожаловать!'
        
//   🔔 PS: для удобства и чистоты кода сохраните в переменные сообщения отображаемые в alert
// */

const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = 'm4ngo1zh4ackz0r';
const alertCancel='Отменено пользователем!';
const alertInvalidInput='Доступ запрещен!';
const alertRightInput='Добро пожаловать!';

const inputLogin=prompt('Enter your login');

console.log(inputLogin);

if (inputLogin===null){
  alert(alertCancel)
} else if (inputLogin !==ADMIN_LOGIN){
  alert(alertInvalidInput)
} else {
const inputPassword=prompt('Enter your password')
if (inputPassword===null){
  alert(alertCancel)
} else if (inputPassword !==ADMIN_PASSWORD){
  alert(alertInvalidInput)
} else {
alert(alertRightInput) 
}}