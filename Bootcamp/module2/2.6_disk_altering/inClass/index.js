import { readFile, writeFile } from 'fs';

const handleFileRead = (error, content) => {
  // Handle errors if any
  if (error) {
    console.log('read error', error);
    return;
  }
  // work to be done on contents
  const lines = content.split('\n');
  let example = lines[0].replace('//', '/*');
  lines[0] = example.replace('\n', '');
  lines[0] = lines[0].replace('\r', '');
  lines[0] = lines[0] += ` */`;

  // see effects to contents
  console.log(lines);

  // prepare the contents into a text as input to be presented
  let allLines = '';
  for (let i = 0; i < lines.length; i++) {
    allLines += lines[i] + '\n';
  }
  writeFile(filename, allLines, (writeErr) => {
    // Catch writing error if any
    if (writeErr) {
      console.log('error writing', allLines, writeErr);
      return;
    }
    console.log('success!');
  });
};

const filename = process.argv[2];
readFile(filename, 'utf8', handleFileRead);
