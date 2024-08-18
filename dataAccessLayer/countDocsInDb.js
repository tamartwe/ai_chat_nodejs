import { ChromaClient } from "chromadb";

const client = new ChromaClient();

const countDocuments = async () => {
    const collection = await client.getCollection({ name: "knowledge-base-1" });

    return collection.count();
}

export default countDocuments;

