import { readFile, writeFile } from 'fs';
let filename = process.argv[3];
const changeColors = (content) => {
  let lines = content.split('\n');
  console.log('lines', lines);
  let newlines = '';
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
  const componentToHex = (c) => {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  };
  const rgbToHex = (string) => {
    let array = changeRgbString(string);
    console.log(array);
    return (
      '#' +
      componentToHex(Number(array[0])) +
      componentToHex(Number(array[1])) +
      componentToHex(Number(array[2]))
    );
  };
  const changeRgbString = (string) => {
    let newstring = string.replace('(', '');
    newstring = newstring.replace(')', '');
    newstring = newstring.replace(';', '');
    newstring = newstring.split(',');
    return newstring;
  };
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i][2] == 'b' && process.argv[2] === 'hextorgb') {
      let hexColor = lines[i].slice(20, 27);
      let rgbColor = convertHexToRGB(hexColor);
      newlines += `  background-color: rgb(${rgbColor.r},${rgbColor.g},${rgbColor.b})`;
    } else if (lines[i][2] == 'b' && process.argv[2] === 'rgbtohex') {
      let rgbColor = lines[i].slice(23, 37);
      let hexColor = rgbToHex(rgbColor);
      newlines += `  background-color: ${hexColor}`;
    } else {
      newlines += lines[i];
    }
    newlines += '\n';
  }
  return newlines;
};
const fileRead = (error, content) => {
  if (error) {
    console.log('errror occured');
  }
  if (filename == 'styles.css') {
    const newcontent = changeColors(content);
    console.log(newcontent);
    writeFile(filename, newcontent, (err) => {
      if (err) {
        console.log('error when writing');
      } else {
        console.log('sucessfully saved');
      }
    });
  }
};
readFile(filename, 'utf8', fileRead);
