// src/routes/produtoRoutes.js
import express from 'express';
import * as tratamentoController from '../controllers/tratamentoController.js';
import validate from '../middlewares/validate.js';
import { tratamentoCreateSchema, tratamentoUpdateSchema } from '../controllers/tratamentoController.js';
const router = express.Router();

// O prefixo '/api/produtos' será definido no index.js
router.get('/', tratamentoController.listarTratamento);
// Adiciona o middleware de validação do Joi
router.post('/', validate(tratamentoCreateSchema), tratamentoController.adicionarTratamento);
// Adiciona o middleware de validação do Joi
router.put('/:idtratamentos', validate(tratamentoUpdateSchema), adicionarTratamentoController.atualizarTratamento);
router.delete('/:idtratamentos', tratamentoController.deletarTratamento);

export default router;

