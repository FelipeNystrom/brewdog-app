import React, { Component } from 'react';

class Categories extends Component {
  state = {
    choice:''
  }

  //hey 

chooseCategory = event => {
    this.setState({[event.target.name]: event.target.value})
};

  render() {
    const dinnerChoices = ['Chicken','Beef','Pork','Lamb','Fish'];
    const dessertChoices = ['Chocolate','Ice Cream','Cheesecake','Cookies'];

    const listDinners = dinnerChoices.map((dinner, i) => (
      <div key= {i}>
      <button onClick={this.chooseCategory} name='choice' value={dinner}> {dinner}</button>
      </div>
      ))

    const listDesserts = dessertChoices.map((dessert, i) => (
      <div key= {i}>
      <button onClick={this.chooseCategory} name='choice' value={dessert}> {dessert}</button>
      </div>
    ))


    return (
      <div>
      {this.props.choice === 'dinner' ?
      <div>
      <h2>Choose type of dinner:</h2>
        {listDinners}
      </div>
      :
      <div>
      <h2>Choose type of dessert:</h2>
        {listDesserts}
      </div>
      }
      </div>

    )
  }
}

export default Categories;
