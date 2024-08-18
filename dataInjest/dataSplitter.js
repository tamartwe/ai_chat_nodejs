import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const splitDocuments = async (loadedDocs) => {
    const textSplitter = new RecursiveCharacterTextSplitter({ 
        chunkSize: 1000, // size in characters
        chunkOverlap: 200
    });
    
    const splitDocs = await textSplitter.splitDocuments(loadedDocs);
    
    console.log(`Finished splitting documents! We have ${splitDocs.length} chunks altogether!`);
    return splitDocs;
}

export default splitDocuments;

