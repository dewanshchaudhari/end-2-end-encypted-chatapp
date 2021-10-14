const express = require('express');
const router = express.Router();
const Message = require('../models/Messages.model');
router.get('/', async (req, res, next) => {
	const message = await Message.findOne({ members: req.body.id });
	if (!message) res.json({});
	res.json(message);
});

module.exports = router;
