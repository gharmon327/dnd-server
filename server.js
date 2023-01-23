
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const db = require('./config/db')
const PORT = 8001

const camperRoutes = require('./routes/camper-routes')
const requestLogger = require('./lib/request-logger')
const camperSeed = require('./lib/camper-seed')
const brandRoutes = require('./routes/brand-routes')
const noteRoutes = require('./routes/note-routes')
const userRoutes = require('./routes/user-routes')


mongoose.set('strictQuery', true)

mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const app = express()

app.use(cors({ origin: `http://127.0.0.1:5501` }))

app.use(express.json())

app.use(requestLogger)

app.use(camperRoutes)
app.use('/seed', camperSeed)
app.use(brandRoutes)
app.use(noteRoutes)
app.use(userRoutes)


app.listen(PORT, () => {
	console.log('listening on port ' + PORT)
})

module.exports = app