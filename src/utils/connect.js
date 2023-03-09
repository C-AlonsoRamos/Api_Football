const mongoose = require('mongoose')

const dotenv = require('dotenv')

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

const connect = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI, {
      userNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const { name, host } = db.connection
    console.log(`Connected to DB: ${name}, inhost ${host}`)
  } catch (error) {
    console.log('error connecting to DB', error)
  }
}

module.exports = connect