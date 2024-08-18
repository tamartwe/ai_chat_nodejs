import dotenv from 'dotenv';

//import getOrCreateDataSource from './cloneDataSource.js'

import loadDocuments from './dataLoader.js';

import splitDocuments from './dataSplitter.js';

import storeAsVectors from './saveDocumentsToDB.js';

dotenv.config();

//const openaiApiKey = process.env.OPENAI_API_KEY;

//await getOrCreateDataSource();

const injestDosuments = async () => {
    const loadedDocuments = await loadDocuments();

    const splitDocs = await splitDocuments(loadedDocuments);

    await storeAsVectors(splitDocs);

}

export default injestDosuments;

