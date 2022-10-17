import { Router } from "express";

import { deleteUrl, getUrlById, openShortUrl, shorten } from "../controllers/urlController.js";
import { bodyValidate } from "../middlewares/bodyValidate.js";
import urlSchema from "../schemas/urlSchema.js";

const urlRouter = Router();

urlRouter.post('urls/shorten', bodyValidate(urlSchema), tokenValidate, shorten);
urlRouter.get('urls/:id', getUrlById);
urlRouter.get('urls/open/:shortUrl', openShortUrl);
urlRouter.delete('urls/:id', tokenValidate, deleteUrl);

export default urlRouter;