import React from 'react';
import './Builder.css';
import Input from "../../layout/input/Input";

const builder = props => {
    return (
        <div className="Builder">
            Add new item
            <Input/>
            <button onClick={props.add}>Submit</button>
        </div>
    )
};

export default builder;