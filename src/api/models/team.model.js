const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    foundation: { type: Number, requiered: false, trim: true },

    logo: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
