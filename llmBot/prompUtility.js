import { PromptTemplate } from "@langchain/core/prompts";


const createPrompt = async ()=> {
    const template = `You are an assistant for question-answering tasks. Use the following pieces context to answer the question. If you don't know the answer, just say that you don't know. Never make up an answer.  
    Context: {context}
    Question: {question}`;

    return PromptTemplate.fromTemplate(template);
}

export default createPrompt;