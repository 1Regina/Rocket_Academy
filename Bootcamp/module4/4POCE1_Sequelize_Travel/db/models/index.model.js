import { Sequelize } from 'sequelize';
import allConfig from '../../config/config.js';

import initAttractionModel from './attraction.mjs';
import initCategoryModel from './category.mjs';

const env = process.env.NODE_ENV || 'development';
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

// here we are putting initItemModel from item.mjs into the object "db" (line 14)
db.Attraction = initAttractionModel(sequelize, Sequelize.DataTypes);
db.Category = initCategoryModel(sequelize, Sequelize.DataTypes);

// A    belongsTo     B
db.Attraction.belongsTo(db.Category);
// A      hasMany      B
db.Category.hasMany(db.Item);

// here we are putting the instance we created in line 28 into the object "db"
db.sequelize = sequelize;
// db = {
//     Item: initItemModel(sequelize, Sequelize.DataTypes),
//    sequelize: sequelize
// }

export default db;
