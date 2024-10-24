import fs from 'fs';
import simpleGit from 'simple-git';
import { KNOWLEDGE_BASE_DIR, KNOWLEDGE_BASE_REPO_URL } from './consts.js';

const git = simpleGit();

const getOrCreateDataSource = async () => {
    console.log("Running git clone or git pull to fetch data");
    if (!fs.existsSync(KNOWLEDGE_BASE_DIR)) {
        console.log("Running for the first time - executing git clone...");
        await git.clone(KNOWLEDGE_BASE_REPO_URL, KNOWLEDGE_BASE_DIR);
    } else {
        console.log("Updating local data - running git pull...");
        const gitWithRepo = simpleGit(KNOWLEDGE_BASE_DIR);await gitWithRepo.pull();
        console.log("Pull completed.");
    }

    console.log("Git done.");
}

export default getOrCreateDataSource;
