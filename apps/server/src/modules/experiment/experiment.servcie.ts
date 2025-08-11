import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
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

    public static async translateWithPromptTemplate(message: string, sourceLanguage: string, targetLanguage: string): Promise<any> {
        const model = new ChatOpenAI({ model: "gpt-4o-mini" });

        const systemTemplate = `Translate the following from {sourceLanguage} into {targetLanguage}`;

        const promptTemplate = ChatPromptTemplate.fromMessages([
            ["system", systemTemplate],
            ["user", "{input}"],
        ]);

        const promptValue = await promptTemplate.invoke({
            sourceLanguage,
            targetLanguage,
            input: message,
        });
        console.log(promptValue);
        console.log(promptValue.toChatMessages());

        const response = await model.invoke(promptValue);

        return response;
    }


}

export default ExperimentService;