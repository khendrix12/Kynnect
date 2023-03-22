import React, { useState, useEffect, useContext } from 'react';
import Input from '../components/Input.jsx';
import Table from '../components/Table.jsx';
import { AuthContext } from '../components/AuthContext.jsx';


const MainContainer = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const [entries, setEntries] = useState([]);
  const displayFields = ['Name', 'Employer', 'Position', 'Linkedin', 'Last Connection', 'Notes', 'Next Connection'];
  const fields = ['connectionName', 'employerValue', 'positionValue', 'linkedinValue', 'lastConnectionValue', 'notesValue', 'nextConnectionValue'];
  const data = {
    rows: entries,
    columns: fields,
    displayFields,
  };


  const [inputValue, setInputValue] = useState('');
  const handleConnectionChange = (event) => {
    console.log('handle change');
    setInputValue(event.target.value);
  };

  const [employerValue, setEmployerValue] = useState('');
  const handleEmployerChange = (event) => {
    console.log('handle change');
    setEmployerValue(event.target.value);
  };

  const [positionValue, setPositionValue] = useState('');
  const handlePositionChange = (event) => {
    console.log('handle change');
    setPositionValue(event.target.value);
  };

  const [linkedinValue, setLinkedinValue] = useState('');
  const handleLinkedinChange = (event) => {
    console.log('linkedin change');
    setLinkedinValue(event.target.value);
  };

  const [lastConnectionValue, setLastConnectionValue] = useState('');
  const handleLastConnectionChange = (event) => {
    console.log('handle change');
    setLastConnectionValue(event.target.value);
  };

  const [notesValue, setNotesValue] = useState('');
  const handleNotesChange = (event) => {
    console.log('handle change');
    setNotesValue(event.target.value);
  };
  const [nextConnectionValue, setNextConnectionValue] = useState('');
  const handleNextConnectionChange = (event) => {
    console.log('handle change');
    setNextConnectionValue(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('val', event.target.value);
    console.log('linkedin val', linkedinValue);
    let method;
    if (event.target.value === 'update') {
      method = 'POST';
    } else {
      method = 'DELETE';
    }

    try {
      const response = await fetch('http://localhost:8080/entry', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          connectionName: inputValue,
          employerValue,
          positionValue,
          linkedinValue,
          lastConnectionValue,
          notesValue,
          nextConnectionValue,
          email: isAuthenticated.email,
        }),
      });
      const result = await response.json();
      console.log(result);
      setInputValue('');
      setEmployerValue('');
      setPositionValue('');
      setLinkedinValue('');
      setLastConnectionValue('');
      setNotesValue('');
      setNextConnectionValue('');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('running use effect');
    const fetchData = async () => {
      console.log('before');
      const dbEntries = await fetch('http://localhost:8080/getEntry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          connectionName: inputValue,
          employerValue,
          positionValue,
          linkedinValue,
          lastConnectionValue,
          notesValue,
          nextConnectionValue,
          email: isAuthenticated.email,
        }),
      });
      const response = await dbEntries.json();

      setEntries(response);
    };
    fetchData()
      .catch('error in useEffect', console.error);
  }, [inputValue]);
  return (
    <div className="container">

      <Table data={data} />
      <Input
        handleConnectionChange={handleConnectionChange}
        inputValue={inputValue}
        handleEmployerChange={handleEmployerChange}
        employerValue={employerValue}
        handlePositionChange={handlePositionChange}
        positionValue={positionValue}
        handleLinkedinChange={handleLinkedinChange}
        linkedinValue={linkedinValue}
        handleLastConnectionChange={handleLastConnectionChange}
        lastConnectionValue={lastConnectionValue}
        handleNotesChange={handleNotesChange}
        notesValue={notesValue}
        handleNextConnectionChange={handleNextConnectionChange}
        nextConnectionValue={nextConnectionValue}
        handleSubmit={handleSubmit}
        displayFields={displayFields}
        fields={fields}
      />
    </div>
  );
};

export default MainContainer;
