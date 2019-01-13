import React from 'react';
import './Item.css';

const item = props => (
    <div className="Item">
        <div>{props.name}</div>
        <div>{props.howMany}</div>
    </div>
);

export default item;