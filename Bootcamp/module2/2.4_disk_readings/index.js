// Import readFile function from global fs module. fs stands for file system.
import { readFile } from 'fs';

console.log('done importing from fs');

// Define callback function to run after retrieving file contents in readFile
const handleFileRead = (error, content) => {
  console.log('running inside of handleFileRead');

  // Handle errors if any
  if (error) {
    console.log('read error', error);
    return;
  }

  console.log('content', content);
};

console.log('about to call readFile');

// 2nd param 'utf8' specifies the file encoding.
// Read more about UTF8 here: https://en.wikipedia.org/wiki/UTF-8
readFile('mystuff.txt', 'utf8', handleFileRead);

console.log('done calling readFile');


// newlines case
const handleFileReadWithNewLines = (error, content) => {
  // Split the content of our file by lines
  const lines = content.split('\n');

  // For each line, log the line number and the content of that line
  for (let i = 0; i < lines.length; i += 1) {
    console.log(`Line ${i + 1}: ${lines[i]}`);
  }
};

readFile('mystuff.txt', 'utf8', handleFileReadWithNewLines);