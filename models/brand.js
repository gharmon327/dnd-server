// require mongoose
const mongoose = require('mongoose')
const noteSchema = require('./note')

// Getting the Schema from Mongoose
const Schema = mongoose.Schema

// Creating a new campaign Schema
const brandSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		// when you see arrays in JS think of many
		notes: [noteSchema]
	},
	{
		timestamps: true,
	}
)


const Brand = mongoose.model('Brand', brandSchema)

module.exports = Brand
