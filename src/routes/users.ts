import { Router } from "express";
import { verifyToken } from '../middlewares/verifyToken';
import { checkRole } from '../middlewares/checkRole';
import userController from '../controllers/UserController';

const router = Router();

router.get('/', userController.getUsers);

router.get('/:id',  [verifyToken, checkRole(['ADMIN'])], userController.getUserById);

router.post('/', [verifyToken, checkRole(['ADMIN'])], userController.createUser);

export default router;
