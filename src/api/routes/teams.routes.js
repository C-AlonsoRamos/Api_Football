const express = require('express')

const { upload } = require('../../middlewares/files.middleware')

const isAuth = require('../../middlewares/auth.middleware')

const {
  getAllteams,
  createTeam,
  updateTeam,
  deleteTeam,
} = require('../controllers/teams.controller')

const TeamsRoutes = express.Router()

TeamsRoutes.get('/', getAllteams)
TeamsRoutes.post('/', upload.single('logo'), createTeam)
TeamsRoutes.patch('/:id', upload.single('logo'), updateTeam)
TeamsRoutes.delete('/:id', deleteTeam)

module.exports = TeamsRoutes
