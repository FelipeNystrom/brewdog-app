import React, { Component } from 'react';
import StartPage from './StartPage';
import Navbar from './Navbar';
import Favorites from './Favorites';
import './StartPage.css';


class App extends Component {
  state = {
    showDefault: true,
    showFavorites: false
  };

  // toggle state to control which component is shown
  toogleView = toggleCondition => {
    console.log(toggleCondition);
    if (toggleCondition) {
      this.setState({
        showDefault: !this.state.showDefault,
        showFavorites: !this.state.showFavorites
      });
    }
  };

  render() {
    const { showDefault, showFavorites } = this.state;
    return (
      <div className="appContainer">
        <Navbar toggleView={this.toogleView} />
        {showDefault && <StartPage />}
        {showFavorites && <Favorites toggleView={this.toogleView} />}
      </div>
    );
  }
}

export default App;
