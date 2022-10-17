import db from "../config/db.js";

async function createSession(user, token) {
    const userId = user.id;

    return db.query(
        `INSERT INTO sessions (token, "userId) VALUES ($1,$2)`,
        [token, userId]
    )
}

const sessionRepository = {
    createSession
}

export default sessionRepository;