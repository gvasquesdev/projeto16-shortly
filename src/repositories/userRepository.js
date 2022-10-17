import bcrypt from "bcrypt";

import db from "../config/db.js";

async function getUserByEmail(email) {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};

async function createUser(user) {
    const SALT = 10;
    const passwordHash = bcrypt.hashSync(user.password, SALT);

    return db.query(`INSERT INTO users (name,email,password) VALUES ($1,$2,$3)`,
    [user.name, user.email, passwordHash]);
};

async function getUserById(id){
    return db.query(
        `SELECT * FROM users WHERE id = $1`, [id]
    );
};

const userRepository = {
    getUserByEmail,
    createUser,
    getUserById
}

export default userRepository;