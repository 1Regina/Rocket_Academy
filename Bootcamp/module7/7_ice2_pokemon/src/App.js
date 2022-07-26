import "./App.css";
import pokemon from "./react-pokedex.json";
// const Pokemon = ({prop}) => {
//   const { names, national_id, abilities, types } = prop;
//   const template = (
//     <div className='pokemonEntry'>
//       <h1>{names.en}</h1>
//       <h2>
//         National Id: {national_id}
//       </h2>
//       <h3>Type</h3>
//       {types.map((type) => (
//         <p>{type}</p>
//       ))}
//       <h3>Abilities</h3>
//       {abilities.map((ability) => (
//         <p>
//           Name: {ability.name}
//         </p>
//       ))}
//     </div>
//   );
//   return template;
// };
// const MainApp = () => {
//   const { pokedex } = pokemon;
//   console.log(pokedex)
//   const mainContainer = (
//     <div>
//     {pokedex.map((poke) => (
//       <Pokemon prop={poke} />
//     ))}
//     </div>
//   );
//   return mainContainer;
// };
// function App() {
//   return (
//     <div className="App">
//       <MainApp/>
//     </div>
//   );
// }
// export default App;

const Pokemon = ({ pokemon }) => {
  const { names, national_id, abilities, types } = pokemon;
  const template = (
    <div className="pokemonEntry">
      <h1>{names.en}</h1>
      <h2>National Id: {national_id}</h2>
      <h3>Type</h3>
      {types.map((type) => (
        <p key={`${national_id}-${type}`}>{type}</p>
      ))}
      <h3>Abilities</h3>
      {abilities.map((ability) => (
        <p key={`${national_id}-${ability.name}`}>Name: {ability.name}</p>
      ))}
    </div>
  );
  return template;
};
const PokedexEntries = () => {
  const { pokedex } = pokemon; // object destructuring. aka pokedexEntries={pokedexEntriesArray}  in qn
  console.log(pokedex);
  const mainContainer = (
    <div>
      {pokedex.map((poke) => (
        <div key={poke.national_id}>
          <Pokemon pokemon={poke} />
        </div>
      ))}
    </div>
  );
  return mainContainer;
};
function App() {
  return (
    <div className="App">
      <PokedexEntries />
    </div>
  );
}
export default App;
