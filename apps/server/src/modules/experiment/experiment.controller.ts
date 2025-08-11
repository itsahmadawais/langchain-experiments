import { Request, Response } from "express";
import ExperimentService from "./experiment.servcie";

class ExperimentController {
    public static async translator(req: Request, res: Response): Promise<Response> {
        try {
            const { message, sourceLanguage, targetLanguage } = req.body;
            if (!message || !sourceLanguage || !targetLanguage) {
                return res.status(400).json({ error: 'message, sourceLanguage, targetLanguage are required' });
            }

            const response = await ExperimentService.translator(message, sourceLanguage, targetLanguage);

            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    public static async streamTranslator(req: Request, res: Response): Promise<Response> {
        try {
            const { message, sourceLanguage, targetLanguage } = req.body;
            if (!message || !sourceLanguage || !targetLanguage) {
                return res.status(400).json({ error: 'message, sourceLanguage, targetLanguage are required' });
            }

            const response = await ExperimentService.streamTranslator(message, sourceLanguage, targetLanguage);

            return res.status(200).json({
                kwargs: {
                    content: response
                }
            });
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

export default ExperimentController;