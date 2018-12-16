import * as KoaRouter from 'koa-router';
import UserController from '../controllers/userController';
const router = new KoaRouter()
router.get('/admin', UserController.getAllUsers);
router.post('/haha', UserController.testCors);
router.post('/test', UserController.testCors);
export default router;