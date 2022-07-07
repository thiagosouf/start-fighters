import db from "../db/db.js";
import { Request, Response } from "express";
import axios from "axios";
import {checkUser, insertUserWin, insertUserLose, insertUserDraw, updateLose, updateWin, updateDraw}  from "../repositories/battleRepository.js"



export async function postBattle(req: Request, res: Response){
    try{
    const { firstUser, secondUser } = req.body;
    if(firstUser === secondUser){
        return res.status(400).send("Usuários iguais");
    }


    
        const response = await axios.get(`https://api.github.com/users/${firstUser}/repos`);
        const firstUserRepos = response.data;
        
        const response2 = await axios.get(`https://api.github.com/users/${secondUser}/repos`);
        const secondUserRepos = response2.data;
        
        const firstUserStargazers = firstUserRepos.map(repo => repo.stargazers_count).reduce((a:number,b:number) => a+b,0)
        const secondUserStargazers = secondUserRepos.map(repo => repo.stargazers_count).reduce((a:number,b:number) => a+b,0);

        const draw = firstUserStargazers === secondUserStargazers ? true : false;
        const winner = draw ? null : firstUserStargazers > secondUserStargazers ? firstUser : secondUser;
        const loser = draw ? null : firstUserStargazers > secondUserStargazers ? secondUser : firstUser;

        console.log(winner);
        console.log(loser);
        console.log(draw);
        
        if (!draw){
            const user = await checkUser(winner);
            const user2 = await checkUser(loser);
            if (user.rows.length === 0){
                await insertUserWin(winner);
            
        } else {
            await updateWin(winner);
        }
        if (user2.rows.length === 0){
            await insertUserLose(loser);
            
        } else {
            await updateLose(loser);
        }
    }else{
        const user = await checkUser(firstUser);
        const user2 = await checkUser(secondUser);
        if (user.rows.length === 0){
            await insertUserDraw(firstUser);
        } else {
            await updateDraw(firstUser);
        }
        if (user2.rows.length === 0){
            await insertUserDraw(secondUser);
        } else {
            await updateDraw(secondUser);
        }
    }

        res.json({
            winner,
            loser,
            draw
            });

    }
    catch(err){
        res.status(400).json({
            message: "Usuário não encontrado"
        });
}}