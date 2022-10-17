import sessionRepository from "../repositories/sessionRepository.js";
import userRepository from "../repositories/userRepository.js";


export async function tokenValidate(req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer", "");

    if(!token) {
        res.send(401).status("Sem token");
    }

    try {
        const { rows: sessions } = await sessionRepository. getSessionByToken(token);
        const [session] = sessions;
        
        if (!session) {
            return res.sendStatus(401).send("Sessão não encontrada");
        }

        const { rows: users } = await userRepository.getUserById(session.userId);
        const [user] = users;

        if(!user) {
            return res.sendStatus(401).send("Usuário não encontrado");
        }

        res.locals.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).send("Ih, deu xabu");
    }


}