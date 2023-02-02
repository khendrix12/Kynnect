/* eslint-disable import/extensions */
/* eslint-disable react/jsx-max-props-per-line */
import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Entry from '../components/Entry.jsx';
import Input from '../components/Input.jsx';
import Table from '../components/Table.jsx';
import GoogleAPIAuth from '../components/GoogleAPIAuth.jsx';
import Login from '../components/Login.jsx';
import ImplicitLogin from '../components/ImplicitLogin.jsx';


const MainContainer = () => {
  const [entries, setEntries] = useState([]);
  const displayFields = ['Name', 'Employer', 'Position', 'Linkedin', 'Last Connection', 'Notes'];
  const fields = ['connectionName', 'employerValue', 'positionValue', 'linkedinValue', 'lastConnectionValue', 'notesValue'];
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('running use effect');
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
      .catch('error in useEffect', console.error);
  }, [inputValue]);
  return (
    <div className="container">
      <ImplicitLogin />
      {/* <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      /> */}
      ;
      <Table data={data} />
      {/* {entries.map((element) => (
        <Entry
          key={element.connectionName}
          connectionObj={element}
        />
      ))} */}
      <Input
        // eslint-disable-next-line react/jsx-max-props-per-line
        handleConnectionChange={handleConnectionChange} inputValue={inputValue}
        handleEmployerChange={handleEmployerChange} employerValue={employerValue}
        handlePositionChange={handlePositionChange} positionValue={positionValue}
        handleLinkedinChange={handleLinkedinChange} linkedinValue={linkedinValue}
        handleLastConnectionChange={handleLastConnectionChange} lastConnectionValue={lastConnectionValue}
        handleNotesChange={handleNotesChange} notesValue={notesValue}
        handleSubmit={handleSubmit}
        displayFields={displayFields}
        fields={fields}
      />
    </div>
  );
};

export default MainContainer;
