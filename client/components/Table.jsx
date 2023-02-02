import React, { useState, useEffect } from 'react';

const Table = (props) => {
  // Data
  const dataColumns = props.data.columns;
  const { displayFields } = props.data;
  const dataRows = props.data.rows;

  const tableHeaders = (
    <thead>
      <tr>
        {displayFields.map((column) => <th>{column}</th>)}
      </tr>
    </thead>
  );

  const tableBody = dataRows.map((row) => (
    <tr>
      {dataColumns.map((column) => {
        if (column === 'linkedinValue') {
          return <td><a href={row[column]} target="_blank" rel="noreferrer">{row[column]}</a></td>;
        }
        if (column === 'lastConnectionValue') {
          const date = new Date(row[column]);
          return <td>{date.toDateString()}</td>;
        }
        return <td>{row[column]}</td>;
      })}
    </tr>
  ));

  // Decorate with Bootstrap CSS
  return (
    <table className="styled-table" width="100%">
      {tableHeaders}
      <tbody>
        {tableBody}
      </tbody>
    </table>
  );
};

export default Table;
