import express from 'express';
import controller from '../model/ProductModel.js';

const routes = express.Router();

routes.get('/', controller.fetchProduct);
routes.get('/:id', controller.fetchSingleProduct);
routes.post('/', controller.postProduct);
routes.delete('/:id', controller.deleteProduct);
routes.put('/:id', controller.updateProduct);

export default routes;