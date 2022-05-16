// import the object we created with everything in it from index.mjs
// eslint-disable-next-line import/extensions
import db from './db/models/index.model.js';

// eslint-disable-next-line max-len
// a model is an ES6 class. An instance of the class represents one object from that model (which maps to one row of the table in the database).
// eslint-disable-next-line max-len
//  Although a model is a class, you should not create instances by using the new operator directly. Sequelize provides the create method for this
// https://sequelize.org/master/manual/model-instances.html

db.Category.create({
  name: process.argv[3],
})
  .then((item) => {
    console.log('success!');
    console.log(item);
    console.log(item.name);

    item.update({ name: 'Aqif' });
  })
  .catch((error) => console.log(error));
