console.log('works!');

// Celsius-Fahrenheit Converter
// const celsius  = process.argv[2];
// const farenheit = (Number(celsius ) * 9/5) +32;
// console.log(farenheit);

// Bi-Directional Temperature Converter
const source = process.argv[2];
const target = process.argv[3];

// if (source === 'celsius' && target === 'farenheit') {
//   output0 = (Number(process.argv[4]) * 9) / 5 + 32;
//   output1 = (Number(process.argv[5]) * 9) / 5 + 32;
//   output2 = (Number(process.argv[6]) * 9) / 5 + 32;
// }
// if (source === 'farenheit' && target === 'celsius') {
//   output0 = ((Number(process.argv[4]) - 32) * 5) / 9;
//   output1 = ((Number(process.argv[5]) - 32) * 5) / 9;
//   output2 = ((Number(process.argv[6]) - 32) * 5) / 9;
// }
// console.log(output0, output1, output2);

//Bi-Directional Temperature Converter with Kelvin
if (source === 'Kelvin' && target === 'farenheit') {
  output0 = ((Number(process.argv[4]) - 273.15) * 9) / 5 + 32;
  output1 = ((Number(process.argv[5]) - 273.15) * 9) / 5 + 32;
  output2 = ((Number(process.argv[6]) - 273.15) * 9) / 5 + 32;
}
if (source === 'farenheit' && target === 'Kelvin') {
  output0 = ((Number(process.argv[4]) - 32) * 5) / 9 + 273.15;
  output1 = ((Number(process.argv[5]) - 32) * 5) / 9 + 273.15;
  output2 = ((Number(process.argv[6]) - 32) * 5) / 9 + 273.15;
}

if (source === 'Kelvin' && target === 'celsius') {
  output0 = Number(process.argv[4]) - 273.15;
  output1 = Number(process.argv[5]) - 273.15;
  output2 = Number(process.argv[6]) - 273.15;
}
if (source === 'celsius' && target === 'Kelvin') {
  output0 = Number(process.argv[4]) + 273.15;
  output1 = Number(process.argv[5]) + 273.15;
  output2 = Number(process.argv[6]) + 273.15;
}
// console.log(output0, output1, output2);

// FANCY with loops
let result;
const convertKelvin = () => {
  for (i = 4; i < process.argv.length; i++) {
    if (source === 'Kelvin' && target === 'farenheit') {
      result = ((Number(process.argv[i]) - 273.15) * 9) / 5 + 32;
    }

    if (source === 'farenheit' && target === 'Kelvin') {
      result = ((Number(process.argv[i]) - 32) * 5) / 9 + 273.15;
    }

    if (source === 'Kelvin' && target === 'celsius') {
      result = Number(process.argv[i]) - 273.15;
    }
    if (source === 'celsius' && target === 'Kelvin') {
      result = Number(process.argv[i]) + 273.15;
    }
    console.log(result);
  }
  return 'All is well';
};
// console.log(convertKelvin());

// POST CLASS
// BASE
const hexCode = process.argv[2];
const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// hexCode is process.argv[2], which is the user's input
// console.log('converting hex to rgb...');
// console.log(hexToRgb(hexCode));

// Comfortable
const hexOrRgb = process.argv[2];
const rgbCode = process.argv[3];

const componentFromStr = (numStr, percent) => {
  var num = Math.max(0, parseInt(numStr, 10));
  return percent
    ? Math.floor((255 * Math.min(100, num)) / 100)
    : Math.min(255, num);
};

const rgbHex = (rgb) => {
  var rgbRegex =
    /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
  var result,
    r,
    g,
    b,
    hex = '';
  if ((result = rgbRegex.exec(rgb))) {
    r = componentFromStr(result[1], result[2]);
    g = componentFromStr(result[3], result[4]);
    b = componentFromStr(result[5], result[6]);

    hex = '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  return hex;
};

// rgbCode is process.argv[3], which is the user's input
// console.log('converting rgb to hex...');
// console.log(rgbHex(rgbCode));

// Bidirectional conversion
let output 
const colorCode = process.argv[3];
const convertColor = () => {
  if (hexOrRgb === 'hexToRgb') {
    console.log('converting hex to rgb...');
    output = hexToRgb(colorCode);
  }
  if (hexOrRgb === 'rgbHex') {
    console.log('converting rgb to hex...');
    output = rgbHex(colorCode);
  }
  return output;
};
console.log(convertColor());
