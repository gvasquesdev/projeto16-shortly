import express, {json} from "express";
import dotenv from "dotenv";
import db from "./config/db.js";

dotenv.config();

const app = express();

app.use(json());
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is magically working on port: ${port}`);
});


app.post("/cadastro" , async (req,res) => {
    const userinfo = req.body;

    try {
        const query = await db.query("INSERT INTO users (name,email,password) VALUES ($1,$2,$3)", [userinfo.name, userinfo.email, userinfo.pword])

        res.sendStatus(201);
    }  catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
    
})

app.get("/usuario", async (req,res) => {
        
    try{
       const {rows: users} = await db.query("SELECT * FROM users");
       
       res.send(users);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
})