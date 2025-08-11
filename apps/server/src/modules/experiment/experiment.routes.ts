import { Router } from 'express';
import ExperimentController from './experiment.controller';

const router = Router();

router.post('/translate', ExperimentController.translator);

export default router;