import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents"; 
import createPrompt from "./llmBot/prompUtility.js";
import generateContextRetreiver from "./llmBot/contextRetreiver.js";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


dotenv.config(); 

const llm = new ChatOpenAI({ model: "gpt-4o" });
const prompt = await createPrompt();
const ragChain = await createStuffDocumentsChain({llm,prompt});
const retriever = await generateContextRetreiver();

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

// POST request handler
app.post('/api/question', async (req, res) => {
  const userQuestion = req.body.userQuestion;
  if (!userQuestion) {
    return res.status(400).json({ error: 'User question required' });
  }
  const retrievedChunks = await retriever.invoke(userQuestion);
  const response = await ragChain.invoke({
      question: userQuestion.trim(),
      context: retrievedChunks,
  });
   res.status(200).json({ answer: response });
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});