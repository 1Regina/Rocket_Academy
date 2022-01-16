import { readFile, writeFile } from 'fs';

const filename = 'styles.css';

const convertColorFormats = (content) => {
  const lines = content.split('\n');
  let newLines = '';

  // this is from stackoverflow, not necessary to completely understand right now
  const convertHexToRGB = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i][2] === 'b') {
      const hexcode = lines[i].slice(20, 27);
      // convertHexToRGB returns an object
      const rgbObject = convertHexToRGB(hexcode);
      newLines += `background-color: rgb(${rgbObject.r}, ${rgbObject.g}, ${rgbObject.b});`;
    } else {
      newLines += lines[i];
    }
    newLines += '\n';
  }
  return newLines;
};

const whenFileIsRead = (error, content) => {
  if (error) {
    console.log('read error', error);
  }

  if (process.argv[2] === 'styles.css') {
    const newContent = convertColorFormats(content);

    writeFile(filename, newContent, (err) => {
      if (err) {
        console.log('error writing', newContent, err);
      } else {
        console.log('success!');
      }
    });
  }
};

readFile(filename, 'utf8', whenFileIsRead);
