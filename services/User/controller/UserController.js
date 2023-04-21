import express from 'express';
import controller from '../model/UserModel.js';
import authHelper from '../../Authentication/helper/AuthHelper.js';

const routes = express.Router();

routes.get('/', authHelper, controller.fetchUsers);
routes.get('/:id', authHelper, controller.fetchUser);
routes.delete('/:id', authHelper, controller.deleteUser);


export default routes;