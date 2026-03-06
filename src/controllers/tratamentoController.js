import * as tratamentoService from '../services/tratamentoServices.js';
import Joi from 'joi';

export const tratamentoCreateSchema = Joi.object({
    tipo: Joi.string().length(11).required(),
    valor: Joi.string().required(),
    : Joi.string().required(),
});

export const tratamentoUpdateSchema = Joi.object({
    tipo: Joi.string(),
    valor: Joi.string(),
    : Joi.string(),
}).min(1);

export const listarTratamento = async (req, res) => {
    try {
    const agendamento = await agendamentoService.findAll();
    res.status(200).json(agendamento);
} catch (err) {
    console.error('Erro ao buscar agendamento:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
}
};

export const adicionarTratamento= async (req, res) => {
    try {
        const novoTratamento = await tratamentoService.create(req.body);
        res.status(201).json({ message: 'tratamento adicionado com sucesso',
            data: novoTratamento });
        } catch (err) {
            console.error('Erro ao adicionar tratamento:', err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({  error: 'tratamento já cadastrado.' });
            }
            res.status(500).json({ error: 'Erro ao adicionar tratamento' })
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
        