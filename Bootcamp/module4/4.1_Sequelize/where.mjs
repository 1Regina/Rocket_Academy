import db from './models/index.mjs';

db.Item.findAll({
  where: {
    name: [process.argv[2]],
  },
})
  .then((items) => console.log(items[0]))
  .catch((error) => console.log(error));