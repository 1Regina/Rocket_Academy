import { readFile, writeFile } from 'fs';

/**
 * Add a JS Object to an array of Objects in a JSON file
 * @param {string} filename - Name of JSON file
 * @param {object} jsonContentObj - The content to write to the JSON file
 * @param {function} callback - The callback function to execute on error or success
 *                              Callback takes write error as 1st param and JS Object as 2nd param.
 * @returns undefined
 */
export function write(filename, jsonContentObj, callback) {
  // Convert content object to string before writing
  const jsonContentStr = JSON.stringify(jsonContentObj);

  // Write content to DB
  writeFile(filename, jsonContentStr, (writeErr) => {
    if (writeErr) {
      console.error('Write error', jsonContentStr, writeErr);
      // Allow each client app to handle errors in their own way
      callback(writeErr, null);
      return;
    }
    console.log('Write success!');
    // Call client-provided callback on successful write
    callback(null, jsonContentStr);
  });
}

/**
 * Add a JS Object to an array of Objects in a JSON file
 * @param {string} filename - Name of JSON file
 * @param {function} callback - The callback function to execute on error or success
 *                              Callback takes read error as 1st param and JS Object as 2nd param.
 * @returns undefined
 */
export function read(filename, callback) {
  const handleFileRead = (readErr, jsonContentStr) => {
    if (readErr) {
      console.error('Read error', readErr);
      // Allow client to handle error in their own way
      callback(readErr, null);
      return;
    }

    // Convert file content to JS Object
    const jsonContentObj = JSON.parse(jsonContentStr);

    // Call client callback on file content
    callback(null, jsonContentObj);
  };

  // Read content from DB
  readFile(filename, 'utf-8', handleFileRead);
}

/**
 * Add a JS Object to an array of Objects in a JSON file
 * @param {string} filename - Name of JSON file
 * @param {function} callback - The callback function to execute on error or success
 *                              Callback takes read error as 1st param and JS Object as 2nd param.
 * @returns undefined
 */
export function edit(filename, readCallback, writeCallback) {
  // Read contents of target file and perform callback on JSON contents
  read(filename, (readErr, jsonContentObj) => {
    // Exit if there was a read error
    if (readErr) {
      console.error('Read error in Edit', readErr);
      readCallback(readErr, null);
      return;
    }

    // Perform custom edit operations here.
    // jsonContentObj mutated in-place because object is mutable data type.
    readCallback(null, jsonContentObj);

    // Write updated content to target file.
    write(filename, jsonContentObj, writeCallback);
  });
}

// /**
//  * Add a JS Object to an array of Objects in a JSON file
//  * @param {string} filename - Name of JSON file
//  * @param {string} key - The key in the JSON file whose value is the target array
//  * @param {string} input - The value to append to the target array
//  * @param {function} callback - The callback function to execute on error or success
//  *                              Callback takes read or write error as 1st param and written string as 2nd param.
//  * @returns undefined
//  */
// export function add(filename, key, input, callback) {
//   edit(
//     filename,
//     (err, jsonContentObj) => {
//       // Exit if there was an error
//       if (err) {
//         console.error('Edit error in Add', err);
//         callback(err);
//         return;
//       }

//       // Exit if key does not exist in DB
//       if (!(key in jsonContentObj)) {
//         console.error('Key does not exist');
//         // Call callback with relevant error message to let client handle
//         callback('Key does not exist');
//         return;
//       }

//       // Add input element to target array
//       jsonContentObj[key].push(input);
//     },
//     // Pass callback to edit to be called after edit completion
//     callback
//   );
// }

// to do 2POCE6
// add an object to an array of objects in a JSON file
// `callback` takes 2 parameters: 1) JSON content, 2) read or write error if any
export function add(filename, key, input, callback) {
  // set the file read callback
  const handleFileRead = (readErr, jsonContent) => {
    // check for reading errors
    if (readErr) {
      console.log(`reading error`, readErr);
      callback(null, readErr);
      return;
    }
     // parse the string into a JavaScript object
     const content = JSON.parse(jsonContent);

    // check for the key, if it doesn't exist, exit out
    if (!(key in content)){
      // create your own error message
      const errorMessage = "key doesn't exist";
      // call the callback
      callback(null, errorMessage);
      return;
    }
    content[key].push(input);

    // turn it into a string
    const outputContent = JSON.stringify(content);

    // write into the file
    writeFile(filename, outputContent, (writingError) => {
      if(writingError) {
        console.log(`write error`, outputContent, writingError);
        callback (null, writingError);
        return;
      }

      // success file writing
      console.log(`successfully written!`)
      callback(outputContent, null)
    })
  }
  // read the file
  readFile(filename, 'utf-8', handleFileRead);
}