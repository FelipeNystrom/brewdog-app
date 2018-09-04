import { Component } from 'react';

class FetchFromAPI extends Component {
  componentDidMount() {
    const food = this.props.food;
    const url = `https://api.punkapi.com/v2/beers?food=${food}&per_page=80`;
    fetch(url)
      .then(res => res.json())
      .then(data => data.filter(beer => !beer.image_url.includes('keg.png')))
      .then(filtredData => this.props.setListState(filtredData));
  }
  render() {
    return null;
  }
}

export default FetchFromAPI;
