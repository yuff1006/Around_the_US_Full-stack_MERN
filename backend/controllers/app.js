function getHomePage(req, res) {
  res.status(404);
  res.send({ message: 'Requested resource not found' });
}

module.exports = { getHomePage };
