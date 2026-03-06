import express from 'express';
import * as podologoController from '../controllers/podologoController.js';
import validate from '../middlewares/validate.js';
import { podologoCreateSchema, podologoUpdateSchema } from '../controllers/podologoController.js';

import authMiddleware from '../middlewares/authMiddleware.js'; // 1. importa o middleware
const router = express.Router();

router.post('/', validate(podologoCreateSchema), podologoController.adicionarPodologo);
//router.use(authMiddleware);// //descomentar para funcionar
router.get('/', podologoController.listarPodologo);

router.get('/:cbo', podologoController.listarPodologoCbo);

router.put('/:cbo', validate(podologoUpdateSchema), podologoController.atualizarPodologo);
router.delete('/:cbo', podologoController.deletarPodologo);

export default router;

