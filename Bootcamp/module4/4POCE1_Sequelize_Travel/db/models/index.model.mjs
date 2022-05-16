import sequelizePackage from 'sequelize';
import allConfig from '../../config/config.js';

import initTripModel from './trip.mjs';
import initAttractionModel from './attraction.mjs';
import initCategoryModel from './category.mjs';

const { Sequelize } = sequelizePackage;
const env = process.env.NODE_ENV || 'development';

// in this case, "env" will be development, as we have in our config.js file
// this is the same as saying :
// const config = allConfig['development']
const config = allConfig[env];
const db = {};

// initiate a new instance of Sequelize
// note similarity to pool.query
const sequelize = new Sequelize(
  // database settings from config.js
  config.database,
  config.username,
  config.password,
  config,
);

// For Base
// put initTripModel from trip.mjs into the object "db" (line 14)
// put initAttractionModel from attraction.mjs into the object "db" (line 14)
db.Trip = initTripModel(sequelize, Sequelize.DataTypes);
db.Attraction = initAttractionModel(sequelize, Sequelize.DataTypes);

// A    belongsTo     B
db.Attraction.belongsTo(db.Trip);
// A      hasMany      B
db.Trip.hasMany(db.Attraction);

// For Comfortable
// db.Attraction = initAttractionModel(sequelize, Sequelize.DataTypes);
db.Category = initCategoryModel(sequelize, Sequelize.DataTypes);
// A    belongsTo     B
db.Attraction.belongsTo(db.Category);
// A      hasMany      B
db.Category.hasMany(db.Attraction);

// here we are putting the instance we created in line 28 and line 29 into the object "db"
db.sequelize = sequelize;
// db = {
//     Trip: initTripModel(sequelize, Sequelize.DataTypes),
//     Attraction: initAttractionModel(sequelize, Sequelize.DataTypes),
//    sequelize: sequelize
// }

export default db;
