import db from '../db/db.js';
import bcrypt from 'bcrypt';

export const findAll = async () => {
    const [result] = await db.query('SELECT * FROM cliente');
    return result;
};

export const findBySenha = async (senha) => {
        const sql = 'SELECT * FROM cliente WHERE senha = ?';
        const [rows] = await db.query(sql, [senha]);
    };

export const findByCpf = async (cpf) => {
    const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?' , [cpf]);
       return result.length > 0 ? result[0] : null;
    };

    export const findByNome = async (nome) => {
        const sql = 'SELECT * FROM cliente WHERE nome = ?';
        const [rows] = await db.query(sql, [nome]);
    };

    export const findByTelefone = async (telefone) => {
        const sql = 'SELECT * FROM cliente WHERE telefone = ?';
        const [rows] = await db.query(sql, [telefone]);
    };

    export const findByEndereco = async (endereco) => {
        const sql = 'SELECT * FROM cliente WHERE endereco = ?';
        const [rows] = await db.query(sql, [endereco])
    };

    export const findByDataNasc = async (dataNasc) => {
        const sql = 'SELECT * FROM cliente WHERE dataNasc = ?';
        const [rows] = await db.query(sql, [dataNasc])
    };

    export const findByClienteDoenca = async (clienteDoenca) => {
        const sql = 'SELECT * FROM cliente WHERE clienteDoenca = ?';
        const [rows] = await db.query(sql, [clienteDoenca])
    };
    

export const create = async (senha) => {


            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(senha.senha, saltRounds);
            

        const newCliente = {
            ...senha,
            senha: hashedPassword,
        };

        await db.query('INSERT INTO cliente SET ?', newCliente);

        delete newCliente.senha;
        return newCliente;
        };

        export const update = async (cpf, senha) => {
            if (senha.senha) {
                const saltRounds = 10;
                senha.senha = await bcrypt.hash(senha.senha,
                saltRounds);
            }
        const [result] = await db.query('UPDATE cliente SET ? WHERE cpf = ?',
            [senha, cpf]);
        return result.affectedRows > 0;
        };

        export const remove = async (cpf) => {
            const [result] = await db.query('DELETE FROM cliente WHERE cpf = ?', [cpf]);
            return result.affectedRows > 0;
        };
    

    