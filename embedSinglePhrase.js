import dotenv from "dotenv";

dotenv.config();
import { OpenAIEmbeddings } from "@langchain/openai";

const embeddings = new OpenAIEmbeddings(
    { 
        model: "text-embedding-3-small"
    });
const resultingVector = await embeddings.embedQuery("My name is Tamar");

console.log(resultingVector);

console.log(`This vector has ${resultingVector.length} dimensions`);