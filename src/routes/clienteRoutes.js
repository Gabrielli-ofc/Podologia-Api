import express from 'express';
import * as clienteController from '../controllers/clienteController.js';
import validate from '../middlewares/validate.js';
import { clienteCreateSchema, clienteUpdateSchema } from '../controllers/clienteController.js';

import authMiddleware from '../middlewares/authMiddleware.js'; // 1. importa o middleware
const router = express.Router();

router.post('/', validate(clienteCreateSchema), clienteController.adicionarCliente);
//router.use(authMiddleware);// //descomentar para funcionar
router.get('/', clienteController.listarClientes);

router.get('/:cpf', clienteController.listarClienteCpf);

router.put('/:cpf', validate(clienteUpdateSchema), clienteController.atualizarCliente);
router.delete('/:cpf', clienteController.deletarCliente);

export default router;

