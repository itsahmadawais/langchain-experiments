import { Request, Response } from "express";
import SemanticSearchEngineService from "./semanticSearchEngine.service";

class SemanticSearchEngineController {
    public static async documentLoader(req: Request, res: Response): Promise<Response> {
        try {
            await SemanticSearchEngineService.loader();
            return res.status(200).json({});
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

export default SemanticSearchEngineController;