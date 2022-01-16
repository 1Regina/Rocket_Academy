import { readFile, writeFile } from 'fs';

const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return 'converting hex to rgb...' + result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

console.log(`testing now`, hexToRgb('#ffffff'));
const handleFileRead = (error, content) => {
  // Handle errors if any
  if (error) {
    console.log('read error', error);
    return;
  }
  // work to be done on contents

  const lines = content.split('\n');
  let newLines = '';
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('#')) {
      let code = lines[i].slice(20, 27);
      console.log(`code is`, code);
      let hexcode = "'" + code + "'";
      console.log(`hexcode is`, hexcode);
      console.log(`hexcode type is`, typeof hexcode);
      let rgbObject = hexToRgb(hexcode);
      console.log(`rgbObject is`, rgbObject);
      // }
      newLines += `background-color: rgb(${rgbObject.r}, ${rgbObject.g}, ${rgbObject.b});`;
      lines[i] = lines[i].replace('\r', '');
      console.log(`background change`, newLines);
    } else {
      newLines += lines[i];
      lines[i] = lines[i].replace('\r', '');
      console.log(`same Lines`, newLines);
    }

    // lines[i] = lines[i].replace('\n', '');
    // lines[i] = lines[i].replace('\r', '');
    newLines += '\n';
    // see effects to contents
    console.log(`newLines`, newLines);
    return newLines;
  }

  // prepare the contents into a text as input to be presented
  // let allLines = '';
  // for (let i = 0; i < lines.length; i++) {
  //   allLines += lines[i] + '\n';
  // }
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
