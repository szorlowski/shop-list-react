import React from 'react';
import './Item.css';

const item = props => {
  return (
    <div className="Item">
      <div>{props.name}</div>
      <div>{props.howMany}</div>
      {props.id !== 'EMPTY' ?  <div className={"Cancel"} onClick={() => props.onDelete(props.id)}>X</div> : null}
    </div>
  )
};

export default item;