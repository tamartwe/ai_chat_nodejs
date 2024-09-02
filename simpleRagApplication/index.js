import jaccardSimilarity from "./rag_util.js";


const returnResponse = (query, corpus) => {
    const similarities = [];
    for (const doc of corpus) {
        const similarity = jaccardSimilarity(query, doc);
        similarities.push(similarity);
    }
    const maxNumber = Math.max(...similarities);
    const index = similarities.indexOf(maxNumber);
    return corpus[index];
 
}
  
const corpusOfDocuments = [
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


const userInput = "I like to hike";

const returnText = returnResponse(userInput, corpusOfDocuments);

console.log(returnText);



