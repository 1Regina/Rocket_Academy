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
console.log(convertKelvin());
// command to run
// node index.js Kelvin farenheit 0 459.67 559.67 859.67 759.67
// node index.js farenheit Kelvin 32 100 10 20 200 1000
// node index.js farenheit Kelvin 0 -273.15 -3.15 -270
// node index.js Kelvin celsius 0 273.15 3.15 270
// node index.js celsius Kelvin 0 -273.15 -3.15 -270

// POST CLASS
// BASE
const hexCode = process.argv[2];
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

// hexCode is process.argv[2], which is the user's input
// console.log('converting hex to rgb...');
// console.log(hexToRgb(hexCode));

// Comfortable
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
  return 'converting rgb to hex... ' + hex;
};

// rgbCode is process.argv[3], which is the user's input
// console.log('converting rgb to hex...');
// console.log(rgbHex(rgbCode));

// Bidirectional conversion
let output;

const convertColor = () => {
  const hexOrRgb = process.argv[2];
  const colorCode = process.argv[3];
  if (hexOrRgb === 'hexToRgb') {
    console.log('converting hex to rgb...');
    output = hexToRgb(colorCode);
  }
  if (hexOrRgb === 'rgbHex') {
    // console.log('converting rgb to hex...');
    output = rgbHex(colorCode);
  }
  return output;
};
// console.log(convertColor());
// try with
// node index.js rgbhex 'rgb(255,255,255)'
// node index.js hexToRgb '#ffffff'

// MORE COMFORTABLE
/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */

const hslToRgb = (h, s, l) => {
  var r, g, b;
  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    let hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return (
    'converting hsl to rgb: ' +
    [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
  );
};
// const h = process.argv[3];
// const s = process.argv[4];
// const l = process.argv[5];
// console.log(hslToRgb(0.12,0.45,0.2));
// console.log(hslToRgb(h, s, l));

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
const rgbToHsl = (r, g, b) => {
  (r /= 255), (g /= 255), (b /= 255);
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return 'converting rgb to hsl: ' + [h, s, l];
};

// const r = process.argv[3];
// const g = process.argv[4];
// const b = process.argv[5];
// console.log(rgbToHsl(r, g, b));

const code1 = process.argv[3];
const code2 = process.argv[4];
const code3 = process.argv[5];
const convertHslOrRgb = () => {
  const hslOrRgb = process.argv[2];
  if (hslOrRgb === 'rgbToHsl') {
    output = rgbToHsl(code1, code2, code3);
  }
  if (hslOrRgb === 'hslToRgb') {
    output = hslToRgb(code1, code2, code3);
  }
  return output;
};
console.log(convertHslOrRgb());

// command to run
// node index.js rgbToHsl 22 250 255
//  node index.js hslToRgb 0.12 0.45 0.2