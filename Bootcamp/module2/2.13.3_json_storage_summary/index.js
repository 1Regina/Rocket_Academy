import { add, edit } from './jsonFileStorage.js';

// If the user specifies add functionality
if (process.argv[2] === 'add') {
  // Name and address are 2nd and 3rd parameters respectively
  const name = process.argv[3];
  const address = process.argv[4];

  // Create JS Object of data to store in DB
  const person = {
    name: name,
    address: address,
  };

  // Tell jsonFileStorage to store new person in the people array in data.json.
  // The callback is optional, and allows us to perform logic with updated data,
  // e.g. update the UI.
  add('data.json', 'people', person, (err) => {
    if (!err) {
      console.log('Done!');
    }
  });
}
if (process.argv[2] === 'edit') {
  // recall edit(filename, readCallback, writeCallback) that edit has 3 inputs
  edit(
    // first input of edit is filename
    'data.json',
    // 2nd input = my first callback/function argument "readCallback" in edit
    (err, jsonContentObj) => {
      // If no error, edit the content
      if (!err) {
        jsonContentObj['people'][0].name = 'Terminator';
      }
    },
    // 3rd input = my 2nd callback/function argument "writeCallback" in edit
    (err) => {
      // If no error, just concern
      if (!err) {
        console.log('lihllhihibhaidy');
      }
    }
  );
}
