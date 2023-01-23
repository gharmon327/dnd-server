const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		// field - email has unique: true
		email: {
			type: String,
			required: true,
			// if there is a doc with this email dont create it, its already in use
			unique: true,
		},
		// hashed password results being saved
		password: {
			type: String,
			required: true,
		},
		// notice how not required...
		// start off without a token then save one later
		token: String,
	},
	{
		timestamps: true,
		toJSON: {
			transform: (_doc, user) => {
				delete user.password
				return user
			},
		},
	}
)

module.exports = mongoose.model('User', userSchema)
