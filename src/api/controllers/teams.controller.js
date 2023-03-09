const Team = require('../models/team.model')
const { deleteImgCloudinary } = require('../../middlewares/files.middleware')

const getAllteams = async (req, res, next) => {
  try {
    if (req.query.page && !isNaN(parseInt(req.query.page))) {
      const numTeams = await Team.countDocuments()

      let page = parseInt(req.query.page)

      let limit = req.query.limit ? parseInt(req.query.limit) : 10

      let numPages =
        numTeams % limit > 0 ? numTeams / limit + 1 : numTeams / limit

      if (page > numPages || page < 1) {
        page = 1
      }

      const skip = (page - 1) * limit

      const allTeams = await Team.find().skip(skip).limit(limit)

      return res.status(200).json({
        info: {
          total: numTeams,
          page: page,
          limit: limit,
          next:
            numPages >= page + 1
              ? `/api/teams?page=${page + 1}&limit=${limit}`
              : null,
          prev: page != 1 ? `/api/teams?page=${page - 1}&limit=${limit}` : null,
        },
        results: allTeams,
      })
    } else {
      const allTeams = await Team.find().limit(10)
      const numTeams = await Team.countDocuments()

      return res.status(200).json({
        info: {
          total: numTeams,
          page: 1,
          limit: 10,
          next: numTeams > 10 ? `/api/teams?page=2&limit=10` : null,
          prev: null,
        },
        results: allTeams,
      })
    }
  } catch (error) {
    return next('Cannot find teams', error)
  }
}

const createTeam = async (req, res, next) => {
  try {
    const team = new Team({
      ...req.body,
      logo: req.file
        ? req.file.path
        : 'https://res.cloudinary.com/dy4mossqz/image/upload/v1678118078/utils/Placeholder_view_vector.svg_z87jyu.png',
    })
    const createdTeam = await team.save()
    return res.status(201).json(createdTeam)
  } catch (error) {
    return next(error)
  }
}

const updateTeam = async (req, res, next) => {
  try {
    const { id } = req.params
    const newTeam = new Team(req.body)
    newTeam._id = id
    const originalTeam = await Team.findById(id)
    if (req.file) {
      deleteImgCloudinary(originalTeam.logo)
      newTeam.logo = req.file.path
    }
    await Team.findByIdAndUpdate(id, newTeam)
    return res.status(200).json(newTeam)
  } catch (error) {
    return next(error)
  }
}

const deleteTeam = async (req, res, next) => {
  try {
    const { id } = req.params
    const team = await Team.findByIdAndDelete(id)
    if (team.logo) {
      deleteImgCloudinary(team.logo)
      return res.status(200).json(team)
    }
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getAllteams,
  updateTeam,
  deleteTeam,
  createTeam,
}
