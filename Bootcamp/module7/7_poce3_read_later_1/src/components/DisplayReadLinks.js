import React from 'react';

const DisplayReadLinks = ({ readLinks }) => (
  <ul>
    {readLinks.map((element) => {
      console.log(element);
      return (
        <li>
          <a href={element}>{element}</a>
        </li>
      );
    })}
  </ul>
);

export default DisplayReadLinks;