const express = require('express')

const Camper = require('../models/camper')

const startingCampers = [
    {
		firstName: 'Taylor',
		lastName: 'Swift',
		class: 'A',
		size: 40,
	},
	{
		firstName: 'George',
		lastName: 'Washington',
		class: 'Carriage',
		size: 14,
	},
	{
		firstName: 'Jack',
		lastName: 'Johnson',
		class: 'Sprinter',
		size: 22,
	},
]

const router = express.Router()

// /seed/campers
router.get('/campers', (req, res, next) => {
    Camper.deleteMany({})
    .then(() => {
        Camper.create(startingCampers)
            .then(campers => {
                res.status(200).json({ campers: campers })
            })
    })
    .catch(next)
})

module.exports = router