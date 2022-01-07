//  paths
// console.log('this is process argv!');
// console.log(process.argv);

// argv values are strings. try with $ node index.js 1 1 1 
// console.log('Process argv values are strings!');
// console.log(process.argv[2] + process.argv[3] + process.argv[4]);
// console.log(process.argv[2])

// Convert KM to Miles. try with $ node index.js 76
// console.log('distanceInMiles');
// const distanceInKm = process.argv[2];
// const distanceInMiles = Number(distanceInKm) * 0.62;
// console.log(distanceInMiles);

// Convert Litres to Gallons
console.log('covert litres to gallons');
const qtyLitres = process.argv[2];
const qtyGallon = Number(qtyLitres) * 0.264172;
console.log(qtyGallon);