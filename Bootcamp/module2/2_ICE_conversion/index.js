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
