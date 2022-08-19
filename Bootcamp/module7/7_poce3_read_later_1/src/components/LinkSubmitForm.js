import React, { useState } from 'react';
import DisplayReadLinks from './DisplayReadLinks.js';
import DisplayLinkList from './DisplayLinkList.js';

const LinkSubmitForm = () => {
  const [link, setLink] = useState('');
  const [linkList, setlinkList] = useState([]);
  const [readLinks, setReadLinks] = useState([]);

  // when submit button is clicked
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(link);
    if (link) {
      console.log('link exists!!');
      linkList.push(link);
      setlinkList([...linkList]);
      console.log(linkList);
      setLink('');
    } else {
      console.log('nothing entered');
    }
  };

  const moveLink = (event) => {
    const read = event.target.value;
    console.log(read);
    readLinks.push(read);
    setReadLinks([...readLinks]);
    console.log('read links', readLinks);

    const newList = linkList.filter((element) => element !== read);
    console.log(newList);
    setlinkList([...newList]);
    console.log(linkList);
  };

  return (
    <div className="submit">
      <form className="submit-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="link">Link :   </label>
          <input
            type="text"
            name="link"
            id="link"
            value={link}
            onChange={(event) => {
              setLink(event.target.value);
            }}
          />
        </div>
        <button type="submit">Add link !</button>
      </form>
      <div className="link-list">
        <h2>List of unread links</h2>
        <DisplayLinkList linkList={linkList} moveLink={moveLink} />
      </div>
      <div className="read-links">
        <h2>List of read links</h2>
        <DisplayReadLinks readLinks={readLinks} />
      </div>
    </div>
  );
};

export default LinkSubmitForm;