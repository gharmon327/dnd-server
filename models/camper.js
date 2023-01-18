const mongoose = require('mongoose')

const Schema = mongoose.Schema

const camperSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        class: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            required: true,
            min: 1,
            max: 50
        }
    },
    {
        timestamps: true
    }
)

// mongosh collection characters 
const Camper = mongoose.model('Camper', camperSchema)

module.exports = Camper