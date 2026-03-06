 import db from '../db/db.js';

export const findAll = async (idtratamentos, tipo, valorTratamento) => {
    // 1. Define a consulta SQL base
    let sql = 'SELECT * FROM tratamento';
    // 2. Cria um array para as condições WHERE
    const conditions = [];
    // 3. Cria um array para os valores (para prevenir SQL Injection)
    const values = [];
    // 4. Adiciona as cndições dinamicamente
    // Adicionamos o filtro de menor valor
    if (idtratamentos) {
        conditions.push('idtratamentos = ?');
        values.push(idtratamentos);
    }
    
    if (tipo) {
        conditions.push('tipo = ?');
        values.push(`%${nome.toLowerCase()}%`);
    }
    // Adicionamos o filtro buscar por id

   if (valorTratamento) {
    conditions.push('tipo = ?');
    values.push(valorTratamento);
    
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


export const create = async (tratamento) => {
    const [result] = await db.query('INSERT INTO tratamento SET ?', tratamento);
    return { cod: idtratamentos};
    };

    export const update = async (idtratamentos, tratamento) => {
        const [result] = await db.query('UPDATE tratamento SET ? WHERE idtratamentos = ?', [tratamento, idtratamentos]);
        // Retorna true se um nalinha foi afetada (produto existia), false casop contrário
        return result.affectedRows > 0;
    };
    export const remove = async (idtratamentos) => {
        const [result] = await db.query('DELETE FROM tratamento WHERE idtratamentos = ?', [idtratamentos]);
        // Retorna true uma linha foi afetada (produto existia), false caso contrário
        return result.affectedRows > 0;
    };

    