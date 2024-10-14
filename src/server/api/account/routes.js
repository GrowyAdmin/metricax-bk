import { Router } from 'express';
import passport from 'passport';

import controllerGET from './controllers/controllerGET.js';
import controllerPOST from './controllers/controllerPOST.js';

const router = Router();

router.get('/email/:EMAIL', controllerGET.getUserByEmail)

router.post('/signin', controllerPOST.signIn);
router.get('/logout', controllerPOST.logout);
router.post('/signup', passport.authenticate('local.signup', { session: false,}), controllerPOST.signUp);
// router.post('/signup', passport.authenticate('jwt', { failureRedirect: '/login',session: false }), controllerPOST.signUp);

export default router;