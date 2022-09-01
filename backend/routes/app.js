const router = require('express').Router();

const { getHomePage } = require('../controllers/app');

router.get('/', getHomePage);

module.exports = router;
