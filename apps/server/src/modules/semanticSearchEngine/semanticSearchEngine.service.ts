import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import path from "path";


class SemanticSearchEngineService {
    public static async loader() {
        const filePath = path.join(__dirname, '../../data/pdf-test.pdf');
        const loader = new PDFLoader(filePath);
        const docs = await loader.load();
        console.log(docs.length);
        console.log(docs[0].pageContent.slice(0, 200));
        console.log(docs[0].metadata);

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const allSplits = await textSplitter.splitDocuments(docs);

        console.log('All Splits', allSplits.length);
    }
}

export default SemanticSearchEngineService;
