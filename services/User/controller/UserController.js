import express from 'express';
import controller from '../model/UserModel.js';
import authHelper from '../../Authentication/helper/AuthHelper.js';

const routes = express.Router();

routes.get('/', controller.fetchUsers);
routes.get('/:id', authHelper, controller.fetchUser);
routes.delete('/:id', authHelper, controller.deleteUser);
routes.put('/:id', controller.updateUser);


export default routes;