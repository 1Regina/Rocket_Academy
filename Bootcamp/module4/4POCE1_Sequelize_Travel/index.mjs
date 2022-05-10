/* eslint-disable no-case-declarations */
// import the object we created with everything in it from index.mjs
// eslint-disable-next-line import/extensions
import db from './db/models/index.model.mjs';

// eslint-disable-next-line max-len
// a model is an ES6 class. An instance of the class represents one object from that model (which maps to one row of the table in the database).
// eslint-disable-next-line max-len
//  Although a model is a class, you should not create instances by using the new operator directly. Sequelize provides the create method for this
// https://sequelize.org/master/manual/model-instances.html

const action = process.argv[2];

const createTrip = async (nameTrip) => {
  try {
    const newTrip = await db.Trip.create({
      name: nameTrip, // process.argv[3],
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    await console.log('success!');
    // await console.log(newTrip);
    // await console.log(newTrip.name);
    // to just get the dataValues
    // await console.log(newTrip.get({ plain: true }));
    return;
    // newTrip.update({ name: 'CNY' });
  } catch (error) {
    console.log(error);
  }
};

const createAttraction = async (nameAttraction) => {
  try {
    // const attraction = process.argv[3];
    const newAttraction = await db.Attraction.create({
      name: nameAttraction,
    });
    await console.log(newAttraction.get({ plain: true }));
  } catch (error) {
    console.log(error);
  }
};

const createTripAttaction = async (nameTrip, nameAttraction) => {
  try {
    const theTrip = await db.Trip.findOne({
      where: {
        name: nameTrip,
      },
    });
    // console.log(theTrip.get({ plain: true }));
    const tripID = await theTrip.id;
    await db.Attraction.create({
      name: nameAttraction,
      trip_id: tripID,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
    console.log('success');
  } catch (error) {
    console.log(error);
  }
};

const findTripItinery = async (tripName) => {
  try {
    const tripInfo = await db.Trip.findOne({
      where: {
        name: tripName,
      },
    });
    const tripID = tripInfo.id;
    const allAttractions = await db.Attraction.findAll({
      where: {
        trip_id: tripID,
      },
    });
    await console.log(allAttractions);
    // await console.log(allAttractions.get({ plain: true }));
    for (let i = 0; i < allAttractions.length; i += 1) {
      console.log(allAttractions[i].name);
    }
  } catch (error) {
    console.log(error);
  }
};

switch (action) {
  case 'create':
    const nameTrip = process.argv[3];
    createTrip(nameTrip);
    break;
  case 'add-attrac':
    const aTrip = process.argv[3];
    const nameAttraction = process.argv[4];
    createTripAttaction(aTrip, nameAttraction);
    break;
  case 'trip':
    const tripName = process.argv[3];
    findTripItinery(tripName);
    break;
  default:
    console.log('no matching action found');
}
