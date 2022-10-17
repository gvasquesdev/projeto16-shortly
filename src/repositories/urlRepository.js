import db from "../config/db.js";

async function insertShortUrl(url, shortUrl, userId) {
    return db.query(
        `INSERT INTO urls(url,"shortUrl","userId") VALUES ($1,$2,$3)`,
        [url,shortUrl,userId]
    );
};

async function getUrlById(id) {
    return db.query(
        `SELECT * FROM urls WHERE id= $1`, [id]
    );
};

async function deleteUrlById(id) {
    return db.query(`
        DELETE FROM urls WHERE id = $1`, [id]
    );
};

async function getURLbyShortUrl(shortUrl) {
    return db.query(` 
    SELECT * FROM urls WHERE "shortUrl = $1`, [shortUrl] 
    );
};

async function insertVisitCount(urlId) {
   return db.query(`
        UPDATE urls SET "visitCount" += 1
        WHERE id = $1`, [urlId]
    );
};


const urlRepository = {
    insertShortUrl,
    getUrlById,
    deleteUrlById,
    getURLbyShortUrl,
    insertVisitCount
};

export default urlRepository;