import * as tratamentoService from '../services/tratamentoServices.js';
import Joi from 'joi';

export const tratamentoCreateSchema = Joi.object({
    tipo: Joi.string().length(11).required(),
    valor: Joi.number().positive().required()
});

export const tratamentoUpdateSchema = Joi.object({
    tipo: Joi.string(),
    valor: Joi.number().positive(),
});

export const listarTratamento = async (req, res) => {
    try {
    const tratamento = await tratamentoService.findAll(req.body);
    res.status(200).json(tratamento);
} catch (err) {
    console.error('Erro ao buscar tratamento:', err);
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

    export const atualizarTratamento = async (req, res) => {
            try {
                const { cpf } = req.params;
                const update = await tratamentoService.update(cpf, req.body);
                if (!update) {
                    return res.status(404).json({ error: 'tratamento não encontrado' });
                }
                res.status(200).json({ message: 'tratamento atualizado com sucesso'})
                } catch (err) {
                    console.error('Erro ao atualizar tratamento:', err);
                    res.status(500).json({ error: 'Erro ao atualizar tratamento' })
                }
        };
    
         export const deletarTratamento = async (req, res) => {
                try {
                    const { cpf } = req.params;
                    const deleted = await tratamentoService.remove(cpf);
                    if (!deleted) {
                        return res.status(404).json({ error: 'tratamento não encontrado com sucesso' });
                   }
                   res.status(200).json({ message: 'tratamento deletado com sucesso' });
            } catch (err) {
                console.error('Erro ao deletar tratamento:', err);
                res.status(500).json({ error: 'Erro ao deletar tratamento'});
            }
            };
        