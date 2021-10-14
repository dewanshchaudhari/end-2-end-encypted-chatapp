const createError = require('http-errors');
function notFound(req, res, next) {
	next(createError.NotFound(`🔍 - Not Found - ${req.originalUrl}`));
}

function errorHandler(err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		error: {
			status: err.status || 500,
			message: err.message,
			stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
		},
	});
}

module.exports = {
	notFound,
	errorHandler,
};
