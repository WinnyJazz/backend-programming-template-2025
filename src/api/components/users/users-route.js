const express = require('express');

const usersController = require('./users-controller');
const models = require("../../../models");
const Users = models.Users;

const route = express.Router();

module.exports = (app) => {
  app.use('/users', route);

  // Get list of users
  route.get('/', usersController.getUsers);

  // Create a new user
  route.post('/', usersController.createUser);

  // log in endpoint
  route.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await Users.findOne({ where: { email } }); // <-- ini yang benar!
  
      if (!user || user.password !== password) {
        return res.status(403).json({ message: "INVALID_PASSWORD" });
      }
  
      res.json({ message: "success" });
    } catch (error) {
      console.error(error); // ini bantu debugging juga
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Get user detail
  route.get('/:id', usersController.getUser);

  // Update user
  route.put('/:id', usersController.updateUser);

  // Change password
  route.put('/:id/change-password', usersController.changePassword);

  // Delete user
  route.delete('/:id', usersController.deleteUser);
};