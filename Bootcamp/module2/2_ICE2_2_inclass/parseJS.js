import { readFile } from 'fs';

const showComments = (filename) => {
  // Define callback function to run after retrieving file contents in readFile
  const handleFileRead = (error, content) => {
    // console.log('running inside of handleFileRead');

    // Handle errors if any
    if (error) {
      console.log('read error', error);
      return;
    }

    // console.log('content', content);

    const lines = content.split('\n');
    // console.log(lines);
    const example = lines[0].replace(/\/\/|\r/g, '');
    // const examples = lines[0].replace(/\/\/|\r|\n/g, ''); if have newline between them

    console.log(`Line 1: ${example}`);
  };

  // console.log('about to call readFile');

  readFile(filename, 'utf8', handleFileRead);
};

export default showComments;
