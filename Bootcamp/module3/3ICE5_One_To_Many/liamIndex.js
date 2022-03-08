import client from './initClient.js';

// make the connection to the server
client.connect();

const action = process.argv[2];

const handleQueryError = (queryError) => {
  console.error('You messed up: ', queryError);
  client.end();
};

const handleEmptyResult = () => {
  console.log('no results!');
  client.end();
};

const whenQueryDone = (error, result) => {
  if (error) {
    handleQueryError(error);
    return;
  }

  if (result.rows.length <= 0) {
    handleEmptyResult;
    return;
  }
};

/**
 * Create Owner:
 * https://bootcamp.rocketacademy.co/3-backend-applications/3.ice-in-class-exercises/3.ice.5-one-to-many#create-owner
 */

if (action === 'create-owner') {
  const ownerToCreate = process.argv[3];

  const query = `INSERT INTO owners (name) VALUES ('${ownerToCreate}')`;
  client.query(query, whenQueryDone);
}

/**
 * Create Cat and Associate Cat with Owner:
 * https://bootcamp.rocketacademy.co/3-backend-applications/3.ice-in-class-exercises/3.ice.5-one-to-many#create-cat-and-associate-cat-with-owner
 */

if (action === 'create-cat') {
  const [, , , ownerId, catName] = process.argv; // array destructuring ;)

  const query = 'INSERT INTO cats (name, owner_id) VALUES ($1, $2)';

  const inputData = [catName, ownerId];
  client.query(query, inputData, whenQueryDone);
}

/**
 * Get List of Cats and Respective Owners:
 * https://bootcamp.rocketacademy.co/3-backend-applications/3.ice-in-class-exercises/3.ice.5-one-to-many#get-list-of-cats-and-respective-owners
 */

if (action === 'cats') {
  const listCatsQuery = 'SELECT * FROM cats;';

  client.query(listCatsQuery, (error, result) => {
    if (error) {
      handleQueryError(error);
      return;
    }
    if (result.rows.length <= 0) {
      handleEmptyResult();
      return;
    }

    console.log('Cats: '); // example output line 1

    const cats = result.rows;
    cats.forEach((cat, index) => {
      const findOwnerQuery = `SELECT * FROM owners WHERE id = ${cat.owner_id}`;

      client.query(findOwnerQuery, (err, res) => {
        const owner = res.rows[0];
        if (err) {
          handleQueryError(err);
          return;
        }
        if (res.rows.length <= 0) {
          handleEmptyResult();
          return;
        }

        console.log(`${index + 1}. ${cat.name}: Owner: ${owner.name}`); // 1. Fluffy: Owner: Jim
      });
    });
    // client.end();
  });
}

/**
 * Get List of Owners and Respective Cats:
 * https://bootcamp.rocketacademy.co/3-backend-applications/3.ice-in-class-exercises/3.ice.5-one-to-many#get-list-of-owners-and-respective-cats
 */

if (action === 'owners') {
  const listOwnersQuery = 'SELECT * FROM owners;';

  client.query(listOwnersQuery, (error, result) => {
    if (error) {
      handleQueryError(error);
      return;
    }
    if(result.rows.length<=0) {
      handleEmptyResult();
      return;
    }
    const owners = result.rows;
    console.log('Owners: '); // example output line 1

    for (const owner of owners) {
     
     
      const findCatQuery = `SELECT * FROM cats WHERE owner_id = ${owner.id};`;

      client.query(findCatQuery, (err, res) => {
        const cats = res.rows;
        if (err) {
          handleQueryError(error);
          return;
        }
        if(result.rows.length<=0) {
          handleEmptyResult();
          return;
        }
        console.log(`${owner.id}. ${owner.name}`);
        console.log('\t -Cats:')
        for (const cat of cats) {
          console.log(`\t\t- ${cat.name}`);
     
        }
      });
    
    }
  });
}

// COMFORTABLE

/**
 * Use Owner's Name to Associate Cat with Owner
 * https://bootcamp.rocketacademy.co/3-backend-applications/3.ice-in-class-exercises/3.ice.5-one-to-many#use-owners-name-to-associate-cat-with-owner
 */

if (action === 'c-create-cat') {
  const [, , , ownerName, catName] = process.argv; // array destructuring ;)
  const findOnwerByNameQuery = `SELECT * FROM owners WHERE name = '${ownerName}';`;

  client.query(findOnwerByNameQuery, (error, result) => {
    if (error) {
      handleQueryError(error);
      return;
    }
    if (result.rows.length <= 0) {
      handleEmptyResult();
      return;
    }

    const { id: ownerId } = result.rows[0];
    const inputData = [catName, ownerId];

    const createCatQuery = 'INSERT INTO cats (name, owner_id) VALUES ($1, $2)';

    client.query(createCatQuery, inputData, (err, res) => {
      if (err) {
        handleQueryError(error);
        return;
      }

      console.log('Inserted');
    });
    // client.end();
  });
}

// MORE COMFORTABLE

/**
 * Get Owners with Specific Number of Cats
 * https://bootcamp.rocketacademy.co/3-backend-applications/3.ice-in-class-exercises/3.ice.5-one-to-many#get-owners-with-specific-number-of-cats
 */

if (action === 'mc-owners') {
  const numberOfCats = process.argv[3];

  const findOnwerByNameQuery = `SELECT owner_id, count(*) FROM cats GROUP BY owner_id HAVING count(*) = ${numberOfCats}`;

  client.query(findOnwerByNameQuery, (error, result) => {
    if (error) {
      handleQueryError(error);
      return;
    }
    if (result.rows.length <= 0) {
      handleEmptyResult();
      return;
    }

    result.rows.forEach((row) => {
      const findOnwerQuery = `SELECT * FROM owners WHERE id=${row.owner_id};`;

      client.query(findOnwerQuery, (err, res) => {
        const owner = res.rows[0];

        console.log(`${owner.name} has ${numberOfCats} cats !`);
      });
    });
  });
}

/**
 * Get Owners with Range of Numbers of Cats
 * https://bootcamp.rocketacademy.co/3-backend-applications/3.ice-in-class-exercises/3.ice.5-one-to-many#get-owners-with-range-of-numbers-of-cats
 */

if (action === 'mc-owners-range') {
  const rawInput = process.argv[3].split('');
  const symbol = Number(rawInput[1])
    ? rawInput.shift()
    : rawInput.splice(0, 2).join(''); // '>' or '<' but also could be '=>'

  const numberOfCats = rawInput.join('');

  const findOnwerByNameQuery = `SELECT owner_id, count(*) FROM cats GROUP BY owner_id HAVING count(*) ${symbol} ${numberOfCats}`;
  client.query(findOnwerByNameQuery, (error, result) => {
    if (error) {
      handleQueryError(error);
      return;
    }
    if (result.rows.length <= 0) {
      handleEmptyResult();
      return;
    }

    result.rows.forEach((row) => {
      const findOnwerQuery = `SELECT * FROM owners WHERE id=${row.owner_id};`;

      client.query(findOnwerQuery, (err, res) => {
        const owner = res.rows[0];

        console.log(`${owner.name} has ${row.count} cats !`);
      });
    });
  });
}

/**
 * Get Other Cats Owned by Given Cat's Owner
 * https://bootcamp.rocketacademy.co/3-backend-applications/3.ice-in-class-exercises/3.ice.5-one-to-many#get-other-cats-owned-by-given-cats-owner
 */

if (action === 'other-cats') {
  const catName = process.argv[3];

  const catQuery = `SELECT owner_id FROM cats WHERE name = '${catName}' GROUP BY owner_id;`;

  client.query(catQuery, (error, result) => {
    if (error) {
      handleQueryError(error);
      return;
    }
    if (result.rows.length <= 0) {
      handleEmptyResult();
      return;
    }

    const { owner_id } = result.rows[0];
    const getAllCatsBySameOwnerQuery = `SELECT * FROM cats WHERE owner_id = ${owner_id}`;

    client.query(getAllCatsBySameOwnerQuery, (err, res) => {
      if (err) {
        handleQueryError(err);
        return;
      }
      if (res.rows.length <= 0) {
        handleEmptyResult();
        return;
      }

      const allCatsBySameOwner = res.rows;
      console.log(`${catName}'s owner also owns: `);

      allCatsBySameOwner.forEach((cat, index) => {
        console.log(`${index + 1}. ${cat.name}`);
      });
    });
  });
}