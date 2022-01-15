import { readFile, writeFile } from 'fs';

const filename = 'alter.txt';

/**
 * Split text by lines, add a number to the end of each line, return new text.
 * @param text - Original string
 * @returns modified string
 */
const addToEndOfLine = (text) => {
  // Split text into array where each element is new line.
  const lines = text.split('\n');

  // newText stores the modified text.
  let newText = '';

  for (let i = 0; i < lines.length; i += 1) {
    // Add the original line in text to newText
    newText += lines[i];

    // Add a random number to the end of this line
    newText += `${Math.random()}\n`;
  }

  // Return modified text
  return newText;
};

/**
 * Process content and write new content back to original file
 * @param readErr - Reading error if any
 * @param content - Original file content
 * @returns undefined
 */
const handleFileRead = (readErr, content) => {
  // Log original file content
  console.log(content);

  // Catch reading error if any
  if (readErr) {
    console.log('reading error', readErr);
  }

  // Process content
  const newContent = addToEndOfLine(content);

  // Write processed content back to the file, replacing old content
  writeFile(filename, newContent, (writeErr) => {
    // Catch writing error if any
    if (writeErr) {
      console.log('error writing', newContent, writeErr);
      return;
    }
    console.log('success!');
  });
};

readFile(filename, 'utf-8', handleFileRead);

// COMMAND to run in terminal node index.js