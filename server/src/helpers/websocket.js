const client = require('./init_redis');
const disconnect = (socket, id) => {
	client.set(id, new Date());
	console.log(`${id} disconnected`);
};
// const sendMessage = (msg, recipients, id, socket) => {
// 	console.log(recipients, id);
// 	recipients.forEach((recipient) => {
// 		const newRecipients = recipients.filter((r) => r !== recipient);
// 		newRecipients.push(id);
// 		socket.broadcast.to(recipient).emit('receive-message', {
// 			recipients: newRecipients,
// 			sender: id,
// 			message: msg,
// 		});
// 	});
// };
const initiate = (io) => {
	io.on('connection', (socket) => {
		const id = socket.handshake.query.userId;
		socket.join(id);
		console.log(`${id} connected`);
		client.set(id, 'active');
		socket.on('disconnect', (s) => disconnect(s, id));
		//socket.on('send-message', ({ message: m, to: recipients }) => sendMessage(m, recipients, id, socket));
		socket.on('send-message', ({ to: recipients, message }) => {
			console.log(recipients);
			recipients.forEach((recipient) => {
				console.log({
					recipients,
					sender: id,
					message,
				});
				const newRecipients = recipients.filter((r) => r !== recipient);
				newRecipients.push(id);
				socket.broadcast.to(recipient).emit('receive-message', {
					from: id,
					message,
				});
			});
		});
		// socket.on('receive-message',)
	});
};
module.exports = initiate;
