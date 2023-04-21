import express from 'express';
import controller from '../model/CategoryModel.js';

const routes = express.Router();

routes.get('/', controller.fetchCategory);
routes.get('/:id', controller.fetchSingleCat);
routes.post('/', controller.postCat);
routes.delete('/:id', controller.deleteCat);
routes.put('/:id', controller.updateCat);

export default routes;