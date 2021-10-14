const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	chatId: {
		type: String,
		required: true,
		unique: true,
	},
	members: {
		type: [String],
		required: true,
	},
	messages: {
		type: [
			{
				chatId: {
					type: String,
					required: true,
					unique: true,
				},
				messageId: {
					type: String,
					required: true,
					unique: true,
				},
				from: {
					type: String,
					required: true,
				},
				to: {
					type: [String],
					required: true,
				},
				message: {
					type: String,
					required: true,
				},
				time: {
					type: String,
					required: true,
				},
			},
		],
		required: true,
	},
});

const Message = mongoose.model('message', MessageSchema);
module.exports = Message;
