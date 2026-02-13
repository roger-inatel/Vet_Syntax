import { CreateAdminController } from '../controllers/auth/CreateAdminController';
import { LoginController } from '../controllers/auth/LoginController';
import { Router } from 'express';

const routes = Router();

routes.post('/admin', new CreateAdminController().handle);
routes.post('/login', new LoginController().handle);

export default routes;
