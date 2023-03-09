const League = require('../models/league.model');

const getAllLeagues = async (req, res, next) => {
  try {
    const leagues = await League.find().populate('teams');
    return res.status(200).json({
      info: 'All Leagues',
      results: leagues,
    });
  } catch (error) {
    return next('leagues not found', error);
  }
};

const createLeague = async (req, res, next) => {
  try {
    const newLeague = new League(req.body);
    const createdLeague = await newLeague.save();
    return res.status(200).json(createdLeague);
  } catch (error) {
    return next('Failed creating league', error);
  }
};

const editLeague = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newLeague = new League(req.body);
    newLeague._id = id;
    const foundLeague = await League.findById(id);
    newLeague.teams = [...newLeague.teams, ...foundLeague.teams];
    const updatedLeague = await League.findByIdAndUpdate(id, newLeague);
    return res.status(201).json(newLeague);
  } catch (error) {
    return next('Error updating League', error);
  }
};

module.exports = { getAllLeagues, createLeague, editLeague };
