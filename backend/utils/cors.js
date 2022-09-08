const allowedCors = [
  'https://api.around-the-us.students.nomoredomainssbs.ru',
  'https://around-the-us.students.nomoredomainssbs.ru',
  'https://www.around-the-us.students.nomoredomainssbs.ru',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = { allowedCors, DEFAULT_ALLOWED_METHODS };
