import React, { Component } from 'react';
import StartPage from './StartPage';
import Navbar from './Navbar';
import Favorites from './Favorites';

class App extends Component {
  state = {
    showDefault: true,
    showFavorites: false
  };

  // toggle state to control which component is shown
  toogleView = toggleCondition => {
    if (toggleCondition) {
      this.setState({
        showDefault: !this.state.showDefault,
        showFavorites: !this.state.showFavorites
      });
    }
    if (toggleCondition === 'redirectToStart') {
      setTimeout(() => {
        this.setState({
          showDefault: !this.state.showDefault,
          showFavorites: !this.state.showFavorites
        });
      }, 1000);
    }
  };

  render() {
    const { showDefault, showFavorites } = this.state;
    return (
      <div>
        <Navbar toggleView={this.toogleView} />
        {showDefault && <StartPage />}
        {showFavorites && <Favorites />}
      </div>
    );
  }
}

export default App;
