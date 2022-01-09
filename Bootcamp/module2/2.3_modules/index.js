import {
  add,
  kilometersToMiles,
  celciusToFahrenheit,
  kilogramsToPounds as kgToPounds, // rename function with as
} from './modules/importMany.js';

import { circleArea } from './modules/area.js';
import { calculateBill } from './modules/tripCost.js';

//DEFAULT 
// For default exports, the imported variable's name does not need to
// match the exported variable's name in the source module.
// For example, we could replace the following "plus" with "foo".
import someFunction from './modules/maths.js'; // dont use { } to import exported default function
import * as maths from './modules/maths.js';


console.log(`addition`, add(2, 2));
console.log(`convert kilometersToMiles`, kilometersToMiles(3));
console.log(`convert celciusToFahrenheit ` + celciusToFahrenheit(3));
console.log(`convert kilogramsToPounds ` + kgToPounds(3));
console.log(`circleArea`, circleArea(2));
// console.log(`unexported PI`, PI); // Leads to error
console.log(`plus from maths`, someFunction(2, 2));
console.log(`* as maths for subtract` , maths.subtract(5,2))