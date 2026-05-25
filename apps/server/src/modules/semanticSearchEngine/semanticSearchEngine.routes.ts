import { Router } from 'express';
import SemanticSearchEngineController from './semanticSearchEngine.controller';

const router = Router();

router.get('/loader', SemanticSearchEngineController.documentLoader);

export default router;