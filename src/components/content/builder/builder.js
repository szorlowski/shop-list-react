import React from 'react';
import './Builder.css';
import Input from "../../layout/input/Input";

const builder = props => {
  const formElementArray = [];
  for(let key in props.fields){
    formElementArray.push({
      id: key,
      config: props.fields[key]
    })
  }

    return (
        <div className="Builder">
            Add new item
          {formElementArray.map(field => (
            <Input
              key={field.id}
              fieldType={field.config.fieldType}
              fieldConfig={field.config.fieldConfig}
              value={field.config.value}
              changed={(event) => props.inputChanged(event, field.id)}
              invalid={!field.config.isValid}
              shouldValidate={field.config.validation}
              touched={field.config.touched}
            />
          ))}
            <button onClick={props.add}>Submit</button>
        </div>
    )
};

export default builder;