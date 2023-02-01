import React, { useState, useEffect } from 'react';
import Entry from '../components/Entry.jsx';


const MainContainer = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('before');
      const dbEntries = await fetch('http://localhost:8080/entry');
      const response = await dbEntries.json();
      // console.log('dbentries', response);
      // console.log('dbentries', response);
      // const json = await dbEntries.response.json();
      setEntries(response);
    };
    fetchData()
      .catch(console.error);
  }, []);
  return (
    <div className="container">
      {entries.map((element) => (
        <Entry
          key={element.connectionName}
          connectionName={element.connectionName}
        />
      ))}
    </div>
  );
};

export default MainContainer;
