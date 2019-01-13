import React, {Component} from 'react';
import Items from "./items/Items";
import Builder from "./builder/builder"
import "./Content.css"
import axios from 'axios'

class Content extends Component {

  componentDidMount() {
    axios.get('https://szymon-burger.firebaseio.com/Items.json')
      .then(res => {
        let data = [];
        for(let key in res.data){
          data.push(res.data[key]);
        }
        this.setState({items: data.slice(-1)[0]})
      })
      .catch(error => {
        console.log('ERROR IN GET');
        console.log(error);
      })
  }

  state = {
    items: [],
    fields: {
      item: {
        elementType: 'input',
        label: 'Item name',
        elementConfig: {
          type: 'text',
          placeholder: 'item'
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        touched: false
      },
      howMany: {
        elementType: 'input',
        label: 'How Many',
        elementConfig: {
          type: 'text',
          placeholder: 'howMany'
        },
        value: '',
        validation: {
          required: true,
          number: true
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

    if(rules.number){
      isValid = !isNaN(value) && isValid !== false;
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
    let allValid = true;
    for(let item in this.state.fields){
      if(!this.state.fields[item].isValid){
        allValid = false;
      }
    }
    if(allValid){
      let items = [...this.state.items];
      items.push({
        name: this.state.fields.item.value,
        howMany: this.state.fields.howMany.value,
        id: Math.random()
      });
      console.log('Committing...');
      axios.post('https://szymon-burger.firebaseio.com/Items.json', items)
        .then(() => {
          console.log('Commit OK');
          items = items.filter(e => e.id !== 'EMPTY');
          this.setState({items: items});
        })
        .catch((error) => {
          console.log("ERROR in commit");
          console.log(error)
        })
    }
  };

  deleteItemHandler = id => {
    let items = [...this.state.items];
    items = items.filter(e => e.id !== id);
    if(items.length === 0){
      items.push({name: 'EMPTY', id: "EMPTY"})
    }
    console.log(items);
    axios.post('https://szymon-burger.firebaseio.com/Items.json', items)
      .then(() => {
        console.log('Commit OK');
        console.log(items);
        this.setState({items:  items});
      })
      .catch((error) => {
        console.log("ERROR in commit");
        console.log(error)
      })
  };

  render() {
    return (
      <div className="Content">
        <Builder add={this.addItemHandler} fields={this.state.fields} inputChanged={(event, id) => this.inputChangedHandler(event, id)}/>
        <Items items={this.state.items} onDelete={(id) => this.deleteItemHandler(id)}/>
      </div>
    )
  }
}

export default Content;