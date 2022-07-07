import db from "../db/db.js";

export async function checkUser(name: string) {
    return db.query (`SELECT * FROM fighters WHERE username = $1`, [name]);
}

export async function insertUserWin(name: string) {
    return db.query (`INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, $2, $3, $4)`, [name, 1, 0, 0]);
}

export async function insertUserLose(name: string) {
    return db.query (`INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, $2, $3, $4)`, [name, 0, 1, 0]);
}

export async function updateWin(name: string) {
    return db.query (`UPDATE fighters SET wins = wins + 1 WHERE username = $1`, [name]);
}

export async function updateLose(name: string) {
    return db.query (`UPDATE fighters SET losses = losses + 1 WHERE username = $1`, [name]);
}

export async function updateDraw(name: string) {
    return db.query (`UPDATE fighters SET draws = draws + 1 WHERE username = $1`, [name]);
}

export async function insertUserDraw(name: string) {
    return db.query(`INSERT INTO fighters (username, wins, losses, draws) VALUES ($1,$2,$3,$4)`, [name, 0, 0, 1])
}


