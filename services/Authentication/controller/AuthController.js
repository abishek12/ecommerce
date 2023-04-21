import express from 'express';
import controller from '../model/AuthModel.js';

const routes = express.Router();

routes.post('/login', controller.login);
routes.post('/register', controller.register);

export default routes;