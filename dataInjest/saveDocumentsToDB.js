import  { Chroma } from "@langchain/community/vectorstores/chroma";
import { OpenAIEmbeddings } from "@langchain/openai";

// In production use Async Generators, Iterators, Streams for efficient data processing

const storeAsVectors = async (splitDocs) => {
    try {
        const embeddingsModel = new OpenAIEmbeddings(
        { 
            model: "text-embedding-3-small" 
        });
        // break document chunks array into 5 parts to ensure successful ingestion
        // without exceeding database and node memory constraints
        const partSize = Math.ceil(splitDocs.length / 5); 
        
        for (let i = 0; i < 5; i++) { 
            const startIndex = i * partSize;
            const endIndex = (i + 1) * partSize;
            const splitDocsPart = splitDocs.slice(startIndex, endIndex);
            // upsert all document chunks from this part
            await Chroma.fromDocuments(splitDocsPart, embeddingsModel, {
                collectionName: "knowledge-base-1", 
            });
            console.log(`Finished upserting Part ${i + 1}`);
        }
        console.log("All parts upserted successfully");
    } catch (e) {
        console.error("Error during upsert:", e);
    }
}

export default storeAsVectors;