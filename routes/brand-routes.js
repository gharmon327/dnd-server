// require Express
const express = require('express')
const { requireToken } = require('../config/auth')
const { handle404 } = require('../lib/custom-errors')

// require the Model we just created
const Brand = require('../models/brand')

// Creating a router for us to make paths on
const router = express.Router()

// INDEX
// GET /brands
router.get('/brands', requireToken, (req, res, next) => {
	Brand.find()
		.then((brands) => {
			return brands.map((brand) => brand)
		})
		.then((brands) => res.status(200).json({ brands: brands }))
		.catch(next)
})

// SHOW
// GET /brands/5a7db6c74d55bc51bdf39793
router.get('/brands/:id', requireToken ,(req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Brand.findById(req.params.id)
		.then(handle404)
		.then((brand) => res.status(200).json({ brand: brand }))
		.catch(next)
})

// CREATE
// POST /brands
router.post('/brands', requireToken, (req, res, next) => {
	Brand.create(req.body.brand)
		.then((brand) => {
			res.status(201).json({ brand: brand })
		})
		.catch(next)
})

// UPDATE
// PATCH /brands/5a7db6c74d55bc51bdf39793
router.patch('/brands/:id', requireToken, (req, res, next) => {
	Brand.findById(req.params.id)
		.then(handle404)
		.then((brand) => {
			return brand.updateOne(req.body.brand)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /brands/5a7db6c74d55bc51bdf39793
router.delete('/brands/:id', requireToken, (req, res, next) => {
	Brand.findById(req.params.id)
		.then(handle404)
		.then((brand) => {
			brand.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// exporting the router to use elsewhere
module.exports = router
