import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { KNOWLEDGE_BASE_PATH } from "./consts.js";


const loadDocuments = async () => {
    const directoryLoader = new DirectoryLoader(KNOWLEDGE_BASE_PATH, {
        ".pdf": (path) => new PDFLoader(path),
        ".txt": (path) => new TextLoader(path), 
        ".csv": (path) => new CSVLoader(path),
    });
    const loadedDocs = await directoryLoader.load();
    console.log(`${loadedDocs.length} Documents Loaded`);
    return loadedDocs;
}

export default loadDocuments;
