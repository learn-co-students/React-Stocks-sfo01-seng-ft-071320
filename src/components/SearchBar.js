import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input name="toggle" type="radio" value="Alphabetically" checked={null} onChange={(e) => {props.onSortStocks(e)}} />
        Alphabetically
      </label>
      <label>
        <input name="toggle" type="radio" value="Price" checked={null} onChange={(e) => {props.onSortStocks(e)}}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={(e) => {props.onFilterStocks(e)}}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
