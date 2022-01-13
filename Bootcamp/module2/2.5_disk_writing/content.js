import { writeFile } from 'fs';

// const content = 'Some content!';
let content = 'Printing 10 numbers:';
for (let i = 0; i < 10; i += 1) {
  // The \n character inserts a newline at that position of the string.
  content += `Random number: ${i}: ${Math.random()}\n`;
}

// We often abbreviate "error" to "err" for concision.
const handleFileWrite = (err) => {
  if (err) {
    console.log(err);
    return;
  }
  // If no error, file written successfully
  console.log('success!');
};

writeFile('test.txt', content, handleFileWrite);


// command to run in terminal -> node content.js