const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheme = new Schema({
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
	},
	lastSeen: {
		type: String,
		required: true,
	},
});
userScheme.pre('save', async function (next) {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;
		next();
	} catch (error) {
		next(error);
	}
});
userScheme.methods.isValidPassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		throw error;
	}
};
const User = mongoose.model('user', userScheme);
module.exports = User;
