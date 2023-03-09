const UserRoutes = require('express').Router();
const { registerUser, loginUser } = require('../controllers/users.controller');

UserRoutes.post('/register', registerUser);
UserRoutes.post('/login', loginUser);

module.exports = UserRoutes;
