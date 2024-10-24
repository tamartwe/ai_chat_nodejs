import { OpenAIEmbeddings } from "@langchain/openai";
import  { Chroma } from "@langchain/community/vectorstores/chroma";
import { KNOWLEDGE_BASE_DB_COLLECTION_NAME } from "../dataInjest/consts.js";

const generateContextRetreiver = async () => {
    const vectorStore = await Chroma.fromExistingCollection(new OpenAIEmbeddings({ model: "text-embedding-3-small" }),
        {collectionName: KNOWLEDGE_BASE_DB_COLLECTION_NAME});
    // wrapper around the vector store to simplify retreiving
    // Top-K = 6
    const retriever = vectorStore.asRetriever({ k: 6, searchType: "similarity" }); 
    return retriever;
}

export default generateContextRetreiver;

