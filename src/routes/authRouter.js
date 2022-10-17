import { Router } from "express";
import { bodyValidate } from "../middlewares/bodyValidate.js";
import { signUp, signIn } from "../controllers/authController.js";
import userSchema from "../schemas/userSchema.js";
import loginSchema from "../schemas/loginSchema.js";

const authRouter = Router();

authRouter.post("/signup", bodyValidate(userSchema), signUp);
authRouter.post("/signin", bodyValidate(loginSchema), signIn);


export default authRouter;