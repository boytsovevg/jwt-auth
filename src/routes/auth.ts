import { Router } from "express";

const router = Router();

router.post('/login', (req, res) => res.status(200).json({access: 'login'}));
router.post('/change-password', () => {});

export default router;