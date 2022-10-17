import { nanoid } from "nanoid";
import urlRepository from "../repositories/urlRepository.js";

export async function shorten(req, res) {
    const { id } = res.locals.user;
    const { url } = req.body;

    const characterNum = 8;
    const shortUrl = nanoid(characterNum);

    try {
        await urlRepository.insertShortUrl(url, shortUrl, id);
        res.sendStatus(201).send({shortUrl});
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).send("Ih, deu xabu!");
    };
};

export async function getUrlById (req,res) {
    const { id } = req.params;

    try {
        const foundUrl = await urlRepository.getUrlById(id);
        
        if(foundUrl.rowCount === 0) {
            return res.sendStatus(404).send("Url não encontrada");
        }

        const [url] = foundUrl.rows;
        delete url.visitCount;
        delete url.userId;

        res.send(url);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500).send("Ih, deu xabu!");
    }
};

export async function openShortUrl (req, res) {
    const { shortUrl } = req.params;

    try {
        const result = await urlRepository.getURLbyShortUrl(shortUrl);
        
        if(result.rowCount === 0) {
            return res.sendStatus(404).send("Url não encontrada");
        }

        const [url] = result.rows;
        await urlRepository.insertVisitCount(url.id);
        res.redirect(url.url)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).send("Ih, deu xabu!");
    }
};

export async function deleteUrl (req, res) {
    const { user } = res.locals;
    const { id } = req.params;

    try {
        const result = await urlRepository.getUrlById(id);
        
        if(result.rowCount === 0) {
            return res.sendStatus(404).send("Url não encontrada");
        }

        const {url} = result.rows;
        if (url.userId !== user.id) {
            return res.sendStatus(401).send("Sem autorização");
        }

        await urlRepository.deleteUrlById(id);
        res.sendStatus(204);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500).send("Ih, deu xabu!");
    }
};

