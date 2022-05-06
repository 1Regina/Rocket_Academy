import sequelizePackage from 'sequelize';
// we give the name allConfig to what we're importing from config.js, i.e, our database settings
import allConfig from '../config/config.js';

import initItemModel from './item.mjs';

const { Sequelize } = sequelizePackage;
// in this case, "env" will be development, as we have in our config.js file
// process.env.NODE_ENV will be used later on in the course
const env = process.env.NODE_ENV || 'development';
// this is the same as saying : 
// const config = allConfig['development'] 
const config = allConfig[env];
const db = {};

// initiate a new instance of Sequelize
// note similarity to pool.query

let sequelize = new Sequelize(
// database settings from config.js
  config.database,
  config.username,
  config.password,
  config
);

// here we are putting initItemModel from item.mjs into the object "db" (line 14)
db.Item = initItemModel(sequelize, Sequelize.DataTypes);
// db = {
//    Item: initItemModel(sequelize, Sequelize.DataTypes)
// }

// here we are putting the instance we created in line 28 into the object "db"
db.sequelize = sequelize;
// db = {
//     Item: initItemModel(sequelize, Sequelize.DataTypes),
//    sequelize: sequelize
// }

export default db;