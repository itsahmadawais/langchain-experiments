import { Router } from 'express';
import ExperimentController from './experiment.controller';

const router = Router();

router.post('/translate', ExperimentController.translator);
router.post('/translate/stream', ExperimentController.streamTranslator);
router.post('/translate/prompt-template', ExperimentController.translateWithPromptTemplates);

export default router;