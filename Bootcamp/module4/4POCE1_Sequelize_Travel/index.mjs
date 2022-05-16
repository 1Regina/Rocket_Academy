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

// comfortable
const addCategory = async (category) => {
  try {
    await db.Category.create({
      name: category,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
    await console.log('success!');
    return;
  } catch (error) {
    console.log(error);
  }
};

const createAttractionWithCategory = async (trip, attraction, category) => {
  try {
    // create new trip
    const newTrip = await db.Trip.create({
      name: trip,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
    const tripId = newTrip.id;
    // find the category
    const newCategory = await db.Category.findOne({
      where: {
        name: category,
      },
    });
    const catId = newCategory.id;
    // create attraction
    const newAttraction = await db.Attraction.create({
      name: attraction,
      trip_id: tripId,
      category_id: catId,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
    await console.log(newAttraction.get({ plain: true }));
    return;
  } catch (error) {
    console.log(error);
  }
};

const getAllAttractions = async (trip, category) => {
  try {
    const tripInfo = await db.Trip.findOne({
      where: {
        name: trip,
      },
    });
    // const tripID = tripInfo.id;

    const categoryInfo = await db.Category.findOne({
      where: {
        name: category,
      },
    });
    // const catID = categoryInfo.id;
    const attractions = await db.Attraction.findAll({
      where: {
        trip_id: tripInfo.id,
        category_id: categoryInfo.id,
      },
    });
    // await console.log(attractions.map((el) => el.get({ plain: true })));
    await console.log(JSON.stringify(attractions));
  } catch (error) {
    console.log(error);
  }
};

switch (action) {
  case 'create':
    const nameTrip = process.argv[3];
    createTrip(nameTrip);
    break;
  case 'add-attrac': // base
    const aTrip = process.argv[3];
    const nameAttraction = process.argv[4];
    createTripAttaction(aTrip, nameAttraction);
    break;
  case 'trip':
    const tripName = process.argv[3];
    findTripItinery(tripName);
    break;

    // comfortable
  case 'add-category':
    const newCategory = process.argv[3];
    addCategory(newCategory);
    break;
  case 'add-attrac-comfortable':
    const trip = process.argv[3];
    const attraction = process.argv[4];
    const category = process.argv[5];
    createAttractionWithCategory(trip, attraction, category);
    break;
  case 'category-trip':
    const tripCat = process.argv[3];
    const catTrip = process.argv[4];
    getAllAttractions(tripCat, catTrip);
    break;
  default:
    console.log('no matching action found');
}
