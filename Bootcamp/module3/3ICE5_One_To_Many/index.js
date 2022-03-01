const pg = require ('pg');
const {Client} = pg; 

// set the way we will connect to the server
const pgConnectionConfigs = {
  user: 'regina',
  host: 'localhost',
  database: 'cat_owners', // where meal_tracker table resides
  port: 5432,
}

// create the var we'll use
const client = new Client (pgConnectionConfigs) ; 

// make the correction to the server
client.connect();

// create the query done callback
const whenQueryDone = (error, result) => {
    // this error is anything that goes wrong with the query
    if (error) {
      console.log('error', error);
    } else {
      // rows key has the data
      // BASIE
      console.log(`report results`, result.rows);
      /////@@@@@@@/////
      
    }
    // close the connection
    client.end();
};

const command = process.argv[2];
// const ownerName = process.argv[3];

if (command === 'create-owner'){
  const ownerName = process.argv[3];

  console.log(`ownerName`, typeof ownerName, ownerName)
  sqlQuery =  `INSERT INTO owners (name) VALUES ('${ownerName}')`;

  client.query(sqlQuery, whenQueryDone);
}
if (command === 'create-cat'){
  const ownerId = process.argv[3];
  const catName = process.argv[4];

  sqlQuery = `INSERT INTO cats (owner_id, name) VALUES ('${ownerId}', '${catName}')`;
  client.query(sqlQuery, whenQueryDone);
}


const whenListAll = (error, result) => {
    // this error is anything that goes wrong with the query
    if (error) {
      console.log('error', error);
    } else {
      // rows key has the data
      // BASIE
      let allCats = result.rows

      console.log(`report results`, result.rows);
      console.log(`Cats \n\n`, )
        for (i = 0; i < allCats.length; i +=1) {
          // console.log(`${i+1} allCats[i].name: Owners: allCats.owner`) 
          console.log(`${allCats[i].id}. ${allCats[i].name}`);
       }
    }
  }



if (command === "cats"){

  // write the SQL query
  const catsQuery = 'SELECT * FROM cats';
  // run the SQL query
  client.query(catsQuery, (catsQueryError, catsQueryResult) =>  {
     // this error is anything that goes wrong with the query
     if (catsQueryError) {
       console.error('cats query error', catsQueryError);
       client.end();
       return;
     }
     // if no error, results of the output is in array
     console.log(`catsQueryResults aaa`, catsQueryResult.rows)

    // return early if no results
    if (catsQueryResult.rows.length <= 0) {
      console.log('no results!');
      client.end();
      return;
    }
    
    console.log(`the size of catsQueryResult is`, `${catsQueryResult.rows.length}`)
    for (i = 0; i< catsQueryResult.rows.length; i+=1) {
      console.log(`owner id`, `${i}`, `${catsQueryResult.rows[i].owner_id}`)
      // MAGIC NOT HAPPENING: use the result of the 1st query in the 2nd
      let ownerQuery = `SELECT name FROM owners WHERE id=${catsQueryResult.rows[i].owner_id}`;
      console.log(`magical` ,`${i}`)
      console.log(`owner query `, ownerQuery)
      client.query(ownerQuery, (ownerQueryError, ownerQueryResult) => {
        //this error is anything that goes wrong with the query
        if (ownerQueryError) {
          console.error(`owner query error`, ownerQueryError);
          client.end();
          return;
        }
        // output the desired format
        console.log(`Cats: \n '${i+1}'. '${catsQueryResult.rows[i]}' : Owner: '${ownerQueryResult}' `)
        // let ownerCat = ownerQueryResult
        // return ownerCat
      })    
    }  

      client.end();
  } 
  ) 
}



