import React, { useState } from 'react';

const Input = (props) => (
  <form className="input_form" width="100">
    <div className="labels">
      {props.displayFields.map((field, idx) => (
        // eslint-disable-next-line jsx-a11y/label-has-for
        <label className="label" id={field} htmlFor={props.fields[idx]}>
          {field}
          {field === 'Last Connection' ? '\nDD/MM/YYYY' : null}
        </label>
      ))}
    </div>
    <div className="inputs">
      <input type="text" id="inputValue" value={props.inputValue} onChange={props.handleConnectionChange} placeholder="Enter name here" />
      <input type="text" id="employerValue" value={props.employerValue} onChange={props.handleEmployerChange} placeholder="Enter employer here" />
      <input type="text" id="positionValue" value={props.positionValue} onChange={props.handlePositionChange} placeholder="Enter position here" />
      <input type="text" id="linkedinValue" value={props.linkedinValue} onChange={props.handleLinkedinChange} placeholder="Enter linkedin here" />
      <input type="text" id="lastConnectionValue" value={props.lastConnectionValue} onChange={props.handleLastConnectionChange} placeholder="Enter last connection here" />
      <input type="text" id="notesValue" value={props.notesValue} onChange={props.handleNotesChange} placeholder="Enter notes here" />
    </div>
    <div className="buttons">
      <button onClick={props.handleSubmit} type="submit" name="send" value="update">Submit</button>
      <button onClick={props.handleSubmit} type="submit" name="send" value="delete">Delete</button>
    </div>
  </form>
);
export default Input;
