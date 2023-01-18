const mongooseBaseName = 'dnd-'

// if this is a development environment the database name will be dnd-campaign-tracker-developement
// if this is a test env the database name will be dnd-campaign-tracker-test
const database = {
    development: `mongodb://localhost/${mongooseBaseName}-development`,
    test:`mongodb://localhost/${mongooseBaseName}-test`,
}

const localDb = process.env.TESTENV ? database.test : database.development

const currentDb = process.env.DB_URI || localDb

module.exports = currentDb