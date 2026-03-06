// src/routes/produtoRoutes.js
import express from 'express';
import * as agendamentoController from '../controllers/agendamentoController.js';
import validate from '../middlewares/validate.js';
import { agendamentoCreateSchema, agendamentoUpdateSchema } from '../controllers/agendamentoController.js';
const router = express.Router();

// O prefixo '/api/produtos' será definido no index.js
router.get('/', agendamentoController.listarAgendamento);
// Adiciona o middleware de validação do Joi
router.post('/', validate(agendamentoCreateSchema), agendamentoController.adicionarAgendamento);
// Adiciona o middleware de validação do Joi
router.put('/:codAgendamento', validate(agendamentoUpdateSchema), adicionarAgendamentoController.atualizarAgendamento);
router.delete('/:codAgendamento', agendamentoController.deletarAgendamento);

export default router;

