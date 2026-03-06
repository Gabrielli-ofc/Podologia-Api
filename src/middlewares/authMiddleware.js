// src/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    //1. Buscar o token no cabeçalho da requisição
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token de autenticação não fornecido." });
    }
    // o formato do token é "Bearer TOKEN". 'Precisamos separar as duas partes.
    const parts = atuthHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ messsage: "token em formato inválido." });
    }


    const [schema, token] = parts;
    if (!/^Bearer$/i.test(schema)) {
        return res.status(401).json({ message: "Token mal formatado." });
    }

    //2. Validar o token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "token inválido ou expirado." });
        }
        //3. Se o token for inválido, adicionamos os dados do usuário na requisição
        req.userCpf = decoded.cpf;
        req.userEmail = decoded.email;
        //4. Chama o próximo middleware ou o controlador final
        return next();
    });
}
export default authMiddleware;
