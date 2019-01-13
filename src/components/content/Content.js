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
        }
    };

    addItemHandler = (name, howMany) =>{
        let items = [...this.state.items];
        items.push({name: this.state.newItem.name,
            howMany: this.state.newItem.howMany});
        this.setState({items: items});
    };

    render(){
        return(
            <div className="Content">
                <Builder add={() => this.addItemHandler()}/>
                <Items items={this.state.items}/>
            </div>
        )
    }
}

export default Content;