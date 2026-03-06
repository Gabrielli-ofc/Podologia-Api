import * as podologoService from '../services/podologoService.js';
import Joi from 'joi';

export const podologoCreateSchema = Joi.object({
    cpf: Joi.string().length(11).required(),
    nome: Joi.string().required().max(100),
    endereco: Joi.string().required(),
    telefone: Joi.string().required(),
    especialidade: Joi.string().required(),
});
export const podologoUpdateSchema = Joi.object({
    nome: Joi.string().max(100),
    endereco: Joi.string(),
    telefone: Joi.string(),
    especialidade: Joi.string(),
}).min(1);

export const listarPodologo = async (req, res) => {
    try {
    const podologo = await podologoService.findAll();
    res.status(200).json(podologo);
} catch (err) {
    console.error('Erro ao buscar podologo:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
}
};

export const listarPodologoCbo = async (req, res) => {
    try {
        const {cpf} = req.params;
        const podologo = await podologoService.findByCpf(cpf);
        if (!podologo) {
            return res.status(404).json({ error: 'podologo não encontrado' });
        }
        res.status(200).json(podologo);
    } catch (err) {
        console.error('Erro ao buscar podologo:', err);
        res.status(500).json({ error: 'Erro interno do servidor'});
    }
};


export const adicionarPodologo = async (req, res) => {
    
    try {
        const novoPodologo = await podologoService.create(req.body);
        res.status(201).json({ message: 'Podologo adicionado com sucesso',
            data: novoPodologo });
        } catch (err) {
            console.error('Erro ao adicionar podologo:', err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({  error: 'CPF já cadastrado.' });
            }
            res.status(500).json({ error: 'Erro ao adicionar podologo' })
        }
    };

    export const atualizarPodologo = async (req, res) => {
        try {
            const { cpf } = req.params;
            const update = await podologoService.update(cpf, req.body);
            if (!update) {
                return res.status(404).json({ error: 'Podologo não encontrado' });
            }
            res.status(200).json({ message: 'Podologo atualizado com sucesso'})
            } catch (err) {
                console.error('Erro ao atualizar podologo:', err);
                res.status(500).json({ error: 'Erro ao atualizar podologo' })
            }
    };

    export const deletarPodologo = async (req, res) => {
        try {
            const { cpf } = req.params;
            const deleted = await podologoService.remove(cpf);
            if (!deleted) {
                return res.status(404).json({ error: 'Podologo não encontrado com sucesso' });
           }
           res.status(200).json({ message: 'Podologo deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar podologo:', err);
        res.status(500).json({ error: 'Erro ao deletar podologo'});
    }
    };