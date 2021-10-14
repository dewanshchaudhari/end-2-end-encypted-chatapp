const app = require('./app');
const http = require('http');
const client = require('./helpers/init_redis');
const webSocketInitiate = require('./helpers/websocket');
const server = http.createServer(app);
const io = require('socket.io')(server, {
	cors: {
		origin: '*',
	},
});
webSocketInitiate(io);

const port = process.env.PORT || 5000;
server.listen(port, () => {
	console.log(`Listening: http://localhost:${port}`);
});
