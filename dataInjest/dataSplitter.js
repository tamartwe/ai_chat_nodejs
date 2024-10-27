import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const splitDocuments = async (loadedDocs) => {
    /*const textSplitter = new RecursiveCharacterTextSplitter({ 
        chunkSize: 1000, 
        chunkOverlap: 200
    });*/
    
    const textSplitter = new RecursiveCharacterTextSplitter({ 
        chunkSize: 1500, 
        chunkOverlap: 100
    });

    const splitDocs = await textSplitter.splitDocuments(loadedDocs);
    console.log(`Documents splitted to ${splitDocs.length} chunks`);
    return splitDocs;
}

export default splitDocuments;

