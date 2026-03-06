import * as agendamentoService from '../services/agendamentoService.js';
import Joi from 'joi';

export const agendamentoCreateSchema = Joi.object({
    dia: Joi.string().length(11).required(),
    horario: Joi.string().required(),
    valor: Joi.string().required(),

});

export const agendamentoUpdateSchema = Joi.object({
    dia: Joi.string(),
    horario: Joi.string(),
    valor: Joi.string(),
    

}).min(1);

export const listarAgendamento = async (req, res) => {
    try {
    const agendamento = await agendamentoService.findAll(req.body);
    res.status(200).json(agendamento);
} catch (err) {
    console.error('Erro ao buscar agendamento:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
}
};

export const adicionarAgendamento = async (req, res) => {
    try {
        const novoAgendamento = await agendamentoService.create(req.body);
        res.status(201).json({ message: 'agendamento adicionado com sucesso',
            data: novoAgendamento });
        } catch (err) {
            console.error('Erro ao adicionar agendamento:', err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({  error: 'agendamento já cadastrado.' });
            }
            res.status(500).json({ error: 'Erro ao adicionar agendamento' })
        }
    };

    export const atualizarAgendamento = async (req, res) => {
            try {
                const { cpf } = req.params;
                const update = await agendamentoService.update(cpf, req.body);
                if (!update) {
                    return res.status(404).json({ error: 'Agendamento não encontrado' });
                }
                res.status(200).json({ message: 'Agendamento atualizado com sucesso'})
                } catch (err) {
                    console.error('Erro ao atualizar agendamento:', err);
                    res.status(500).json({ error: 'Erro ao atualizar agendamento' })
                }
        };
    
         export const deletarAgendamento = async (req, res) => {
                try {
                    const { cpf } = req.params;
                    const deleted = await agendamentoService.remove(cpf);
                    if (!deleted) {
                        return res.status(404).json({ error: 'Agendamento não encontrado com sucesso' });
                   }
                   res.status(200).json({ message: 'Agendamento deletado com sucesso' });
            } catch (err) {
                console.error('Erro ao deletar agendamento:', err);
                res.status(500).json({ error: 'Erro ao deletar agendamento'});
            }
            };
        