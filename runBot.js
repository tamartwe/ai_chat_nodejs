import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents"; 
import countDocuments from "./dataAccessLayer/countDocsInDb.js";
import createPrompt from "./llmBot/prompUtility.js";
import generateContextRetreiver from "./llmBot/contextRetreiver.js";


dotenv.config(); 

const documentsCount = await countDocuments();

const llm = new ChatOpenAI({ model: "gpt-4o" });
const prompt = await createPrompt();
const ragChain = await createStuffDocumentsChain({llm,prompt});
const retriever = await generateContextRetreiver();

try {
    const USER_QUESTION = `
        what is the difference between a DRI and a manager ?
    
    `;
    const retrievedChunks = await retriever.invoke(USER_QUESTION);
    const response = await ragChain.invoke({
        question: USER_QUESTION.trim(),
        context: retrievedChunks,
    });
    console.log(response);
   for (const doc of retrievedChunks) {
       const src = doc.metadata.source;
       console.log(src);
    }
} catch (e) {
    console.log(e);
}