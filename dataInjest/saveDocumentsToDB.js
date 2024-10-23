import { OpenAIEmbeddings } from "@langchain/openai";
import  { Chroma } from "@langchain/community/vectorstores/chroma";
import {KNOWLEDGE_BASE_DB_COLLECTION_NAME} from './consts';


const storeAsVectors = async (splitDocs) => {
    try {
        // Embedding model
        const embeddingsModel = new OpenAIEmbeddings(
        { 
            model: "text-embedding-3-small" 
        });
        const sectionLength = Math.ceil(splitDocs.length / 5); 
        for (let i = 0; i < 5; i++) { 
            const docsToInsert = splitDocs.slice((i * sectionLength), ((i + 1) * sectionLength));
            await Chroma.fromDocuments(docsToInsert, embeddingsModel, {
                collectionName: KNOWLEDGE_BASE_DB_COLLECTION_NAME, 
            });
            console.log(`Finished processing part ${i + 1}`);
        }
        console.log("All parts upserted successfully");
    } catch (e) {
        console.error("Error when inserting documents:", e);
    }
}

export default storeAsVectors;