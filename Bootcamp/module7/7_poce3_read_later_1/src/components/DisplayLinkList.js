import React from 'react';

// renders the list of links on to the screen
const DisplayLinkList = ({ linkList, moveLink }) => (
  <ul>
    {linkList.map((element) => {
      console.log(element);
      return (
        <li className="list-element">
          <a href={element}>{element}</a>
          <div className="checkbox-div">
            <label htmlFor="read" />
            <input
              type="checkbox"
              id="read"
              value={element}
              onChange={moveLink}
            />
          </div>
        </li>
      );
    })}
  </ul>
);

export default DisplayLinkList;