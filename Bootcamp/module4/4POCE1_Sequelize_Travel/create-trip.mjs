// import the object we created with everything in it from index.mjs
// eslint-disable-next-line import/extensions
import db from './db/models/index.mjs';

// eslint-disable-next-line max-len
// a model is an ES6 class. An instance of the class represents one object from that model (which maps to one row of the table in the database).
// eslint-disable-next-line max-len
//  Although a model is a class, you should not create instances by using the new operator directly. Sequelize provides the create method for this
// https://sequelize.org/master/manual/model-instances.html

const createTrip = async () => {
  try {
    const newTrip = await db.Trip.create({
      name: process.argv[3],
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    console.log('success!');
    console.log(newTrip);
    console.log(newTrip.name);
    return;
    // newTrip.update({ name: 'CNY' });
  } catch (error) {
    console.log(error);
  }
};

createTrip();
