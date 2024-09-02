
import jaccardSimilarity from './rag_util.js';
import dotenv from "dotenv";

import OpenAI from "openai";

dotenv.config();


// OpenAI API endpoint and authentication key
//const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci/completions';
const API_KEY = process.env.OPENAI_API_KEY;

// Input data - prompt and documents
const initialDocuments = [
    "Take a leisurely walk in the park and enjoy the fresh air.",
    "Visit a local museum and discover something new.",
    "Attend a live music concert and feel the rhythm.",
    "Go for a hike and admire the natural scenery.",
    "Have a picnic with friends and share some laughs.",
    "Explore a new cuisine by dining at an ethnic restaurant.",
    "Take a yoga class and stretch your body and mind.",
    "Join a local sports league and enjoy some friendly competition.",
    "Attend a workshop or lecture on a topic you're interested in.",
    "Visit an amusement park and ride the roller coasters."
]

const openai = new OpenAI({
    apiKey: `${API_KEY}`,
});

const getRelevantDocuments = (query, corpus) => {
    const similarities = [];
    for (const doc of corpus) {
        const similarity = jaccardSimilarity(query, doc);
        similarities.push(similarity);
    }
    const maxNumber = Math.max(...similarities);
    const index = similarities.indexOf(maxNumber);
    return corpus[index];
 
}



// Function to send request to OpenAI API
async function getCombinedResponse(question, prompt, documents) {
    try {
        const response = await openai.completions.create({
            prompt: `${prompt}\nDocuments:\n${documents.join('\n')}\nQuestion: ${question}\nAnswer:`,
            model: 'gpt-3.5-turbo-instruct'
        })
        return response.choices[0].text; // Get the text from the API response
    } catch (error) {
        return error.response.data; // Handle errors
    }
}

const relevantDocs = getRelevantDocuments("I do not like to hike", initialDocuments);
const documents = [];
documents.push(relevantDocs);

// Call the function with prompt and documents
try {
    const response = await getCombinedResponse("I do not like to hike", "Tell me which actiity is recommanded for me", documents);
    console.log(response);
} catch (ex) {
    console.error('Error:', error);
}