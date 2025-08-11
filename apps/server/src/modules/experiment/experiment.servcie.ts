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

    public static async streamTranslator(message: string, sourceLanguage: string, targetLanguage: string): Promise<any> {
        const model = new ChatOpenAI({ model: "gpt-4o-mini" });

        const messages = [
            new SystemMessage(`You are a helpful assistant that translates ${sourceLanguage} to ${targetLanguage}.`),
            new HumanMessage(message),
        ];

        const stream = await model.stream(messages);
        let result: string = "";

        const chunks = [];
        for await (const chunk of stream) {
            result += chunk.content;
            chunks.push(chunk);
            console.log(`${chunk.content}|`);
        }

        console.log(chunks);
        return result;
    }

}

export default ExperimentService;