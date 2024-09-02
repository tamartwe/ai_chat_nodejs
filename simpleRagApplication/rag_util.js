const findUnion = (arr1, arr2) => {
    // Combine the two arrays and convert to Set to remove duplicates
    const unionSet = new Set([...arr1, ...arr2]);
    // Convert the Set back to an array and return
    return Array.from(unionSet);
}

const findIntersection = (arr1, arr2) => {
    return arr1.filter(value => arr2.includes(value));
}


const removeDuplications = (arrayWithDuplicates) => {
    // Convert the array to a Set to remove duplicates
    const setWithoutDuplicates = new Set(arrayWithDuplicates);
    // Convert the Set back to an array if needed
    const arrayWithoutDuplicates = Array.from(setWithoutDuplicates);
    return arrayWithoutDuplicates;
}


const jaccardSimilarity = (query, document) => {
    const queryArr = query.toLowerCase().split(" ")
    const documentArr = document.toLowerCase().split(" ")

    const queryNoDuplicates = removeDuplications(queryArr);
    const documentNoDuplications = removeDuplications(documentArr)

    const intersection = findIntersection(queryNoDuplicates, documentNoDuplications);
    const union = findUnion(query, document);
    return intersection.length/union.length;

}


export default jaccardSimilarity;