import { Router } from 'express';

import controllerGET from './controllers/controllerGET.js';

const router = Router();

router.get('/email/:EMAIL', controllerGET.getUserByEmail)

export default router;