const express = require('express');

const { upload } = require('../../middlewares/files.middleware');

const isAuth = require('../../middlewares/auth.middleware');

const {
  getAllteams,
  createTeam,
  updateTeam,
  deleteTeam,
} = require('../controllers/teams.controller');

const TeamsRoutes = express.Router();

TeamsRoutes.get('/', getAllteams);
TeamsRoutes.post('/',[isAuth], upload.single('logo'), createTeam);
TeamsRoutes.patch('/:id', [isAuth],  upload.single('logo'), updateTeam);
TeamsRoutes.delete('/:id',[isAuth], deleteTeam);

module.exports = TeamsRoutes;
