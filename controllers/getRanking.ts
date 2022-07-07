import db from "../db/db.js";
import { Request, Response } from "express";

export async function getRanking(req: Request, res: Response) {
    const ranking = await db.query(`SELECT username, wins, losses, draws FROM fighters ORDER BY wins DESC, draws DESC`);
    const returnRanking = {"fighters": ranking.rows};
    res.json(returnRanking);
}