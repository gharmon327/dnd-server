const express = require('express')

const Camper = require('../models/camper')

const router = express.Router()

// INDEX
// GET /camper
router.get('/campers', (req, res, next) => {
    Camper.find()
          .then(campers => {
              return campers.map((camper) => camper)
          })
          .then((camper) => res.status(200).json({ camper: camper }))
          .catch(next)
  })

// SHOW
// GET /campers
router.get('/campers/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Camper.findById(req.params.id)
		.then((camper) => res.status(200).json({ camper: camper }))
		.catch(next)
})

// CREATE
// POST /camper
router.post('/campers', (req, res, next) => {
	Camper.create(req.body.camper)
		.then(camper => {
			res.status(201).json({ camper: camper })
		})
		.catch(next)
})

// UPDATE
// PATCH /campers/
router.patch('/campers/:id', (req, res, next) => {

	Camper.findById(req.params.id)
		.then((camper) => {
			return camper.updateOne(req.body.camper)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /campers/
router.delete('/campers/:id', (req, res, next) => {
	Camper.findById(req.params.id)
		.then((camper) => {
			camper.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router