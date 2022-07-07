import {Router} from 'express';
import {postBattle} from '../controllers/postBattle.js';
import {getRanking} from '../controllers/getRanking.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import schemas from '../schemas/battleSchema.js';

const router = Router();

console.log("aqui")
router.post('/battle', validateSchema(schemas) ,postBattle);
router.get('/ranking', getRanking);

export default router;