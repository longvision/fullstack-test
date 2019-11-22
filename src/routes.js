import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import SupplierController from './app/controllers/SupplierController';
import ScheduleController from './app/controllers/ScheduleController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/suppliers', SupplierController.store);
routes.put('/suppliers/:supplier_id', SupplierController.update);
routes.delete('/suppliers/:supplier_id', SupplierController.delete);

routes.post('/schedules/:supplier_id', ScheduleController.store);
routes.put('/schedules/:schedule_id', ScheduleController.update);
routes.delete('/schedules/:schedule_id', ScheduleController.delete);

export default routes;
