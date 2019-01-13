import React, {Component} from 'react';
import Items from "./items/Items";
import Builder from "./builder/builder"
import "./Content.css"

class Content extends Component {
  state = {
    items: [
      {name: 'Chleb', howMany: 2},
      {name: 'Bulka', howMany: 3},
      {name: 'Mleko', howMany: 5}
    ],
    newItem: {
      name: 'newItem',
      howMany: 2
    },
    fields: {
      item: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'item'
        },
        value: '',
        validation: {
          required: true
        },
        isValid: false,
        touched: false
      },
      howMany: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'howMany'
        },
        value: '',
        validation: {
          required: true
        },
        isValid: false,
        touched: false
      }
    }
  };

  checkValidity(value, rules){
    let isValid = true;
    if(rules.required){
      isValid = value.trim() !== '' && isValid !== false;
    }
    return isValid;
  }

  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.fields
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputId]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.isValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputId] = updatedFormElement;
    this.setState({fields: updatedOrderForm});
  };

  addItemHandler = () => {
    let items = [...this.state.items];
    items.push({
      name: this.state.fields.item.value,
      howMany: this.state.fields.howMany.value
    });
    this.setState({items: items});
  };

  render() {
    return (
      <div className="Content">
        <Builder add={this.addItemHandler} fields={this.state.fields} inputChanged={(event, id) => this.inputChangedHandler(event, id)}/>
        <Items items={this.state.items}/>
      </div>
    )
  }
}

export default Content;