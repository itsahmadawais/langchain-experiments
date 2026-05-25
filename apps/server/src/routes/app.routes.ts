import { Router } from 'express';
import ExperimentRoutes from "../modules/experiment/experiment.routes";
import SemanticSearchEngineRoutes from "../modules/semanticSearchEngine/semanticSearchEngine.routes";

const router = Router();

router.use('/experiments', ExperimentRoutes);
router.use('/document', SemanticSearchEngineRoutes)

export default router;