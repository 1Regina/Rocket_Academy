import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Progress,
  Container,
  Form,
  ListGroup,
  ListGroupItem,
  Input,
  Label,
} from "reactstrap";
import "./App.css";

const ProgressLoad = () => {
  return <Progress className="my-3" color="warning" striped value={80} />;
};

const LinkList = ({ news }) => {
  // return news.slice(10).map((n, i) => (
  //   <p key={i}>
  //     <a href={n.url}>{n.title}</a>
  //   </p>
  // ));

  return news.slice(10).map((n, i) => (
    <p key={i}>
      <ListGroupItem className="input-group-addon">
        <a href={n.url}>{n.title}</a>
        <Input
          className="d-flex justify-content-end"
          name="readAlready"
          type="checkbox"
          // onChange={handleCheckboxChange}
        />
      </ListGroupItem>
    </p>
  ));
};

//   const handleCheckboxChange = (newRead) => {
//   setRead((readArr) => {
//     console.log([...readArr, newRead])
//     return [...readArr, newRead];
//   });
// };

const App = () => {
  // state
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("react"); // default search topic is react unless there are handleChange
  const [url, setUrl] = useState(
    "http://hn.algolia.com/api/v1/search?query=react"
  );
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const [read, setRead] = useState([]);

  // fetch news
  const fetchNews = () => {
    // set loading true
    setLoading(true);
    fetch(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
      .then((result) => result.json()) // convert result to json
      // .then(data => console.log(data))
      .then((data) => {
        setNews(data.hits);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  // useEffect to control how it is run. without[searchQuery], every typing letter will throw out new results whenever the component mount + when change. but no, we want search only when the searchQuery searchbar changes
  // final change [url] control that useEffect will change only when url change ie when button click
  // basically useEffect will run every time there is a change in the state (ie the url in this case) and what gets executed is fetchNews in this case
  useEffect(() => {
    fetchNews();
  }, [url]);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //prevent the continual default behaviour which is reload with every keystroke
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  };

  const showLoading = () => (loading ? <ProgressLoad /> : "");

  const searchForm = () => (
    <form onSubmit={handleSubmit} className="submit-form">
      <div>
        <input type="text" value={searchQuery} onChange={handleChange} />
      </div>
      <Button color="primary">Search</Button>
    </form>
  );

  // url will change only when button is click
  return (
    <div className="submit">
      <h2 className="App">Read Later</h2>
      {showLoading()}

      {
        searchForm() /* <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleChange} />
        <button>Search</button>
      </form> */
      }
      <br></br>
      <br></br>

      {/* <div className="link-list"> */}
      <div className="articles-wrapper">
        <ListGroup>
          <LinkList
            className="oneLink"
            news={news}

            //     prop={
            //       showNews() /* {news.map((n, i) => (
            //   <p key={i}>{n.title}</p>
            // ))} */
            //     }
          />
        </ListGroup>
      </div>
    </div>
    // </div>
  );
};

// function component
// const App = () => {
//   const [count, setCount] = useState(0); // useState function returns 2 things -- current state value "count" and a function (setCount) that lets us update count state

//   // useEffect is function/hook that takes a fucntion as argument. meant for state change, useEffect will execute
//   useEffect(() => {
//     document.title = `Clicked ${count} times`;
//   });

//   const increment = () => {
//     setCount(count + 1);
//   };

//   return (
//     <div>
//       <h1>Counter App</h1>;
//       <button onClick={increment}>Clicked {count} times</button>
//     </div>
//   );
// };

// class component
// class App extends Component {
//   state = {
//     count: 0,
//   };

//   increment = () => {
//     this.setState({
//       count: this.state.count + 1,
//     });
//   };

//   //componentDidMount and componentDidUdpate is life cycle
//   componentDidMount () {
//     document.title = `Clicked ${this.state.count} times`
//   }

//   componentDidUpdate () {
//     document.title = `Clicked ${this.state.count} times`
//   }

//   render() {
//     return (
//     <div>
//       <h1>Counter App</h1>;
//       <button onClick={this.increment}>Clicked {this.state.count} times</button>
//     </div>
//     )
//   }
// }

export default App;
