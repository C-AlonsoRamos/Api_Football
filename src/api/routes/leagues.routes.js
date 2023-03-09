const express = require('express');

const LeaguesRoutes = express.Router();

const isAuth = require('../../middlewares/auth.middleware');

const {
  getAllLeagues,
  createLeague,
  editLeague,
} = require('../controllers/leagues.controller');

LeaguesRoutes.get('/', getAllLeagues);
LeaguesRoutes.post('/', [isAuth], createLeague);
LeaguesRoutes.put('/:id', [isAuth], editLeague);

module.exports = LeaguesRoutes;
