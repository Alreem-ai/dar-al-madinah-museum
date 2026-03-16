const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'data.json');
const chunks = [
    'chunk_6_8.json',
    'chunk_9_11.json',
    'chunk_12_14.json',
    'chunk_15_16.json'
];

try {
    console.log(`Loading base data from ${dataFile}...`);
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

    console.log(`Initial artifact count: ${data.artifacts.length}`);

    for (const chunkName of chunks) {
        const chunkPath = path.join(__dirname, chunkName);
        console.log(`Merging ${chunkName}...`);
        const chunkData = JSON.parse(fs.readFileSync(chunkPath, 'utf8'));
        data.artifacts.push(...chunkData);
    }

    console.log(`Final artifact count: ${data.artifacts.length}`);

    if (data.artifacts.length === 16) {
        console.log("Success: 16 artifacts found. Writing to data.json...");
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
        console.log("Done.");
    } else {
        console.log(`Error: Expected 16 artifacts, but found ${data.artifacts.length}.`);
        process.exit(1);
    }
} catch (err) {
    console.error("Error during merge:", err);
    process.exit(1);
}
