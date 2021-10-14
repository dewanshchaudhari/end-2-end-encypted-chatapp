const express = require('express');
const AuthRoute = require('../auth/Auth.route');
const router = express.Router();
router.use('/', AuthRoute);

module.exports = router;
