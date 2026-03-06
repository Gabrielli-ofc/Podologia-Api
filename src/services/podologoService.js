import db from '../db/db.js';



export const findAll = async (cbo, nome, telefone, cpf, especialidade, endereço) => {
    // 1. Define a consulta SQL base
    let sql = 'SELECT * FROM podologo';
    // 2. Cria um array para as condições WHERE
    const conditions = [];
    // 3. Cria um array para os valores (para prevenir SQL Injection)
    const values = [];
    // 4. Adiciona as cndições dinamicamente
    // Adicionamos o filtro de menor valor
    if (nome) {
        conditions.push('nome = ?');
        values.push(nome);
    }
    
    if (telefone) {
        conditions.push('telefone = ?');
        values.push(telefone);
    }
    // Adicionamos o filtro buscar por id
    if (cbo) {
        conditions.push('cbo = ?');
        values.push(cbo);
    }
    
    // Adicionamos o filtro de nome
    if (especialidade) {
        conditions.push('especialidade >= ?');
        values.push(especialidade);
    }

    if (endereço) {
        conditions.push('estado = ?');
        values.push(endereço);
    }
    
    if (cpf) {
      conditions.push('estado= ? ');
      values.push(cpf)
        
    }

// 5. Se houver condições, anexa elas á consulta SQL 
if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
}
// 6. Execulta a consulta final
const [rows] = await db.query(sql, values);
return rows;
}

export const create = async (podologo) => {
    const [result] = await db.query('INSERT INTO agendamento SET ?',[podologo]);
    return { cod: podologo};
    };

    export const update = async (cbo, podologo) => {
        const [result] = await db.query('UPDATE agendamento SET ? WHERE codAgendamento = ?', [podologo, cbo]);
        // Retorna true se um nalinha foi afetada (produto existia), false casop contrário
        return result.affectedRows > 0;
    };
    export const remove = async (cbo) => {
        const [result] = await db.query('DELETE FROM podologo WHERE cbo = ?', [cbo]);
        // Retorna true uma linha foi afetada (produto existia), false caso contrário
        return result.affectedRows > 0;
    };

    
    