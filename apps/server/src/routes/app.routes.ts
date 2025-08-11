import { Router } from 'express';
import ExperimentRoutes from "../modules/experiment/experiment.routes";

const router = Router();

router.use('/experiments', ExperimentRoutes);

export default router;