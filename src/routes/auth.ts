import { Router } from "express";
import { verifyToken } from '../middlewares/verifyToken';
import authController from '../controllers/AuthController';

const router = Router();

router.post('/login', authController.login);
router.post('/change-password', [verifyToken], authController.changePassword);

export default router;
