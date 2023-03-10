const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connect = require('./src/utils/connect')
const { configCloudinary } = require('./src/middlewares/files.middleware')
dotenv.config()
configCloudinary()

const PORT = process.env.PORT
const server = express()
connect()
server.use(cors({ origin: '*', credentials: true }))

server.use(express.json({ limit: '5mb' }))
server.use(express.urlencoded({ limit: '5mb', extended: true }))

const TeamsRoutes = require('./src/api/routes/teams.routes')
server.use('/api/teams', TeamsRoutes)

const LeaguesRoutes = require('./src/api/routes/leagues.routes')
server.use('/api/leagues', LeaguesRoutes)

const UsersRoutes = require('./src/api/routes/users.routes')
server.use('/api/users', UsersRoutes)

server.use('*', (req, res, next) => {
  const error = new Error('Route not found')
  return next(error)
})

server.disable('x-powered-by')

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

module.exports = server
