import { Router } from 'express';

import auth from './auth/index';

const router: Router = Router();

router.use(auth);

export default router;
