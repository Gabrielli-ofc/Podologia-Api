
    
        import db from '../db/db.js';

export const findAll = async (dia, horario, codAgendamento, estado, valor) => {
    // 1. Define a consulta SQL base
    let sql = 'SELECT * FROM agendamento';
    // 2. Cria um array para as condições WHERE
    const conditions = [];
    // 3. Cria um array para os valores (para prevenir SQL Injection)
    const values = [];
    // 4. Adiciona as cndições dinamicamente
    // Adicionamos o filtro de menor valor
    if (dia) {
        conditions.push('dia = ?');
        values.push(dia);
    }
    
    if (horario) {
        conditions.push('horario = ?');
        values.push(horario);
    }
    // Adicionamos o filtro buscar por id
    if (codAgendamento) {
        conditions.push('codAgendamento = ?');
        values.push(codAgendamento);
    }
    // Adicionamos o filtro de nome
    if (valor) {
        conditions.push('valor >= ?');
        values.push(minValor);
    }

    if (estado) {
        conditions.push('estado = ?');
        values.push(estado);
    }
    

// 5. Se houver condições, anexa elas á consulta SQL 
if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
}
// 6. Execulta a consulta final
const [rows] = await db.query(sql, values);
return rows;
}
// Agora voê pode combinar todos os filtros na mesma URL:
// Buscar por nome (pizza) e preço (entre 30 e 50): GET http://localhost:3333/api/produtos?nome=pizza&minValor=30&maxValor=50
// Buscar por nome (borda) e preço (abaixo de 15): GET http://localhost:3333/api/produtos?nome=borda&maxValor=15
// Buscar por nome (calabresa): GET http://localhost:3333/api/produtos?nome=calabresa


export const create = async (agendamento) => {
    const [result] = await db.query('INSERT INTO agendamento SET ?', [agendamento]);
    return { cod: agendamento};
    };

    export const update = async (codAgendamento, agendamento) => {
        const [result] = await db.query('UPDATE agendamento SET ? WHERE codAgendamento = ?', [agendamento, codAgendamento]);
        // Retorna true se um nalinha foi afetada (produto existia), false casop contrário
        return result.affectedRows > 0;
    };
    export const remove = async (codAgendamento) => {
        const [result] = await db.query('DELETE FROM agendamento WHERE codAgendamento = ?', [codAgendamento]);
        // Retorna true uma linha foi afetada (produto existia), false caso contrário
        return result.affectedRows > 0;
    };

    
    