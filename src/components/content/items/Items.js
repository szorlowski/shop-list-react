import React from 'react';
import './Items.css';
import Item from "./item/item";

const Items = props => {
    return (
        <div className="Items">
            {props.items.map(i => (
                <Item name={i.name} howMany={i.howMany}/>
            ))}
        </div>
    )
};

export default Items;