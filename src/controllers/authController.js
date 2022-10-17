import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import sessionRepository from "../repositories/sessionRepository.js";

import userRepository from "../repositories/userRepository.js";

export async function signUp (req, res) {
  const user = req.body;

  try {
    const { name, email, password } = user;
    
    const checkEmailExists = await userRepository.getUserByEmail(user.email);

    if(checkEmailExists.rowCount > 0) {
        return res.sendStatus(409).send("E-mail do usuário já existe");
    };
    
    const createUser = await userRepository.createUser(user)

    res.sendStatus(201).send("Usuário criado com sucesso!");

  } catch (err) {
    console.log(err);
    return res.sendStatus(500).send("Ih, deu xabu");
  }
}


export async function signIn (req, res) { 
  const {email, password} = req.body;
  const { rows: users } = await userRepository.getUserByEmail(email);
  const [user] = users;

  if(!user) {
    return res.sendStatus(404).send("Usuário não existe");
  }

  if(bcrypt.compareSync(password, user.password)) {
    const token = uuid();
    await sessionRepository.createSession(user,token);
  }
}