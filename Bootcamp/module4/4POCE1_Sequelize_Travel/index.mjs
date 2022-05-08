import db from './db/models/index.model.js';

const action = process.argv[2];

const addCategory = (category) => {
  db.Category.create({
    name: category,
  })
    .then((item) => {
      console.log('success!');
      console.log(item);
      console.log(item.id);
      return item;
    })
    .catch((error) => console.log(error));
};

const createAttractionWithCategory = async (
  tripName,
  attractionName,
  categoryName
) => {
  // create new trip
  const trip = await db.Trip.create({
    name: tripName,
  });
  const tripId = trip.id;

  // create new category
  const category = await db.Category.findOne({
    where: {
      name: categoryName,
    },
  });
  const categoryId = category.id;

  // create new attraction
  const attaction = await db.Attraction.create({
    name: attractionName,
    tripId,
    categoryId,
  });

  console.log('attraction created!');
  return attaction;
};

const categoryTrip = async (tripName, categoryName) => {
  const trip = await db.Trip.findOne({
    where: {
      name: tripName,
    },
  });

  const category = await db.Category.findOne({
    where: {
      name: categoryName,
    },
  });

  const attactions = await db.Attraction.findAll({
    where: {
      tripId: trip.id,
      categoryId: category.id,
    },
  });

  return attactions;
};

switch (action) {
  case 'add-category':
    const category = process.argv[3];
    addCategory(category);
    break;
  case 1:
    const trip = process.argv[3];
    const attraction = process.argv[4];
    const category = process.argv[5];
    createAttractionWithCategory(trip, attraction, category);
    break;
  case 'category-trip':
    const trip = process.argv[3];
    const category = process.argv[4];
    categoryTrip(trip, category);
    break;
  default:
    console.log('no matching action found');
}