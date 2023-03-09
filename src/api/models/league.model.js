const mongoose = require('mongoose');

const LeagueSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  },
  {
    timestamps: true,
  }
);

const Leagues = mongoose.model('Leagues', LeagueSchema);

module.exports = Leagues;
