import "./App.css";

function App() {
  const element = (
    <div>
      <h1>Hello World</h1>
      <h2>This is a react demo</h2>
      <p>Done by RC</p>
    </div>
  );

  const myRandomNum = Math.random() * 10;

  // Value of message depends on value of myRandomNum
  let message;
  if (myRandomNum > 5) {
    message = <p>Wow past 5!!</p>;
  } else {
    message = <p>Not that big of a num :(</p>;
  }

  const isLoggedIn = true;

  const numberArray = [1, 2, 3, 4, 5, "rocket", "rc"];

  const students = [
    {
      id: 1,
      name: "Ämelia",
    },
    {
      id: 2,
      name: "Äqif",
    },
    {
      id: 3,
      name: "Bernice",
    },
    {
      id: 4,
      name: "Regina",
    },
    {
      id: 5,
      name: "Richie",
    },
    {
      id: 6,
      name: "Liam",
    },
  ];

  const handleClick = () => {
    console.log("This is clicked");
  };
  return (
    <div className="App">
      {element}

      {message}

      <div className={`logged-status ${isLoggedIn ? "blue" : "red"}`}>
        The user is <b>{isLoggedIn ? "currently" : "not"}</b> logged in.
        <p>
          {isLoggedIn ? "The user is logged in" : "The user is not logged in"}
        </p>
      </div>

      <ul>
        {numberArray.map((item) => {
          return <li key={`${item}`}>{item}</li>;
        })}
      </ul>
      <hr />

      <h1>Students</h1>
      <ul>
        {students.map((item, index) => {
          return (
            <div key={`row-${item.id}-${index}`} className="student-block">
              <h3>{item.id}</h3>
              <h3 className="blue">{item.name}</h3>
            </div>
          );
        })}
      </ul>

      <hr />
      <h1>Students ALSO</h1>
      <ul>
        {students.map((item) => {
          return (
            <div key={`${item.id}`} className="student-block">
              <h3>{item.id}</h3>
              <h3 className="blue">{item.name}</h3>
            </div>
          );
        })}
      </ul>

      <button onClick={handleClick} onMouseEnter={handleClick}>
        A button
      </button>
    </div>
  );
}

export default App;
