import React from 'react';

const Entry = (props) => (
  <div>
    {props.connectionObj.connectionName + ' '}
    {props.connectionObj.employerValue + ' '}
    {props.connectionObj.positionValue + ' '}
    {props.connectionObj.linkedinValue + ' '}
    {props.connectionObj.lastConnectionValue + ' '}
    {props.connectionObj.notesValue + ' '}
  </div>
);

export default Entry;
