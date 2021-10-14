const express = require('express');
const app = express();

const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();
require('./helpers/init_mongodb');
require('./helpers/init_redis');
const middlewares = require('./middlewares');
const api = require('./api');

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
	res.json({
		message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
	});
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
