import db from "../config/db.js";

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const query = await db.query(
      "INSERT INTO users (name,email,password) VALUES ($1,$2,$3)",
      [name, email, password]
    );

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
