module.exports = (err, req, res, next) => {
  console.log(err);
  res.status(500).send(err ? err.message : 'An error occured on the server');
};
