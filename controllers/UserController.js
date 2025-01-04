import UserService from '../services/UserService.js';
import RequestHandler from '../utils/RequestHandler.js';

const UserController = {
  register: async (req, res) => {
    try {
      const user = await UserService.register(req.body);
      return RequestHandler.response(res, 201, 'User registered successfully', user);
    } catch (error) {
      return RequestHandler.response(res, 500, error.message);
    }
  },

  login: async (req, res) => {
    try {
      const token = await UserService.login(req.body);
      return RequestHandler.response(res, 200, 'Login successful', { token });
    } catch (error) {
      return RequestHandler.response(res, 500, error.message);
    }
  },

  getProfile: async (req, res) => {
    try {
      const user = await UserService.getUserById(req.user.id);
      return RequestHandler.response(res, 200, 'Profile retrieved', user);
    } catch (error) {
      return RequestHandler.response(res, 500, error.message);
    }
  },
};

export default UserController;