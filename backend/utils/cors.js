const allowedCors = [
  'https://api.around-the-us.students.nomoredomainssbs.ru',
  'http://localhost:3000',
  'https://around-the-us.students.nomoredomainssbs.ru',
  'https://www.around-the-us.students.nomoredomainssbs.ru',
  'http://localhost:3001',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = { allowedCors, DEFAULT_ALLOWED_METHODS };
