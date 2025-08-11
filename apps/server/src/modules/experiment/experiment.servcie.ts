import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

class ExperimentService {
    public static async translator(message: string, sourceLanguage: string, targetLanguage: string): Promise<any> {
        const model = new ChatOpenAI({ model: "gpt-4o-mini" });

        const messages = [
            new SystemMessage(`You are a helpful assistant that translates ${sourceLanguage} to ${targetLanguage}.`),
            new HumanMessage(message),
        ];

        return await model.invoke(messages);
    }

}

export default ExperimentService;