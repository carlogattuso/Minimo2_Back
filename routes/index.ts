import { Router } from 'express';

import {studentRouter} from './student';
import {subjectRouter} from './subject';

const router: Router = Router();

/**
 * API School Service
 */

router.use('/student', studentRouter);
router.use('/subject', subjectRouter);

export default router;
