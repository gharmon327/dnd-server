const express = require('express')
const router = express.Router()

const Brand = require('../models/brand')
const { handle404 } = require('../lib/custom-errors')
const { requireToken } = require('../config/auth')

// CREATE
// POST to /notes
router.post('/notes', requireToken, (req, res, next) => {
    const brandID = req.body.note.brandID

    console.log(req.user)

    const note = req.body.note
    // adding an owner field 
    // note.owner = req.user._id

    // find the brand that i want to add note to 
    // once found push the note to the mongoose array
    // send status of 201 created if success,
    // next if failure
    Brand.findById(brandID)
        .then(handle404)
        .then(brand => {
            brand.notes.push(note)

            // have to save the doc when modified 
            return brand.save()
        })
        .then(brand => {
            res.status(201).json({ brand: brand })
        })
        .catch(next)
})

// UPDATE
// PATCH /notes/:id
router.patch('/notes/:noteId', requireToken, (req, res, next) => {
    const brandID = req.body.note.brandID

    const noteBody = req.body.note 

    Brand.findById(brandID)
        .then(handle404)
        .then(brand => {
            // finding the note by ID
            const note = brand.notes.id(req.params.noteId)
            // setting the new note content to be the content passed in 
            note.set(noteBody)
            // saving it
            // I have motified the doc I need to save it
            return brand.save()
        })
        .then(()=> res.sendStatus(204))
        .catch(next)
})

// DELETE
// DELETE route /note/:noteId
router.delete('/notes/:noteId',requireToken, (req, res, next) => {
    const brandID = req.body.note.brandID

    Brand.findById(brandID)
    .then(handle404)
    .then(brand => {
        // finding the correct note to remove
        // .remove() we delete it
        brand.notes.id(req.params.noteId).remove()

        return brand.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})


module.exports = router