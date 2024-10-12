/**
 * @author Juan David Alcala Sanchez
 * @file Principal file of the general routes control
 * @date 2021-12-10
 * @version 1.0.0
 */

import express from 'express';

import account from '../api/account/routes.js';

const router = express.Router();

router.use('/account', account);

export default router;