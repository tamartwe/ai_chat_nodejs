import { DirectoryLoader } from "langchain/document_loaders/fs/directory";

import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";

const KNOWLEDGE_BASE_PATH = "./handbook/content"; 


const loadDocuments = async () => {
    const directoryLoader = new DirectoryLoader(KNOWLEDGE_BASE_PATH, {
        ".pdf": (path) => new PDFLoader(path),
        ".md": (path) => new TextLoader(path), 
        ".txt": (path) => new TextLoader(path), 
        ".csv": (path) => new CSVLoader(path),
    });
    const loadedDocs = await directoryLoader.load();
    console.log(`I have loaded ${loadedDocs.length} documents!`);
    return loadedDocs;
}

export default loadDocuments;