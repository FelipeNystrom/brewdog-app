import { Component } from 'react';

class FetchFromAPI extends Component {
  componentDidMount() {
    const { food, setListState } = this.props;
    const punkapiUrl = `https://api.punkapi.com/v2/beers?food=${food}&per_page=80`;

    fetch(punkapiUrl)
      .then(res => res.json())
      .then(data => data.filter(beer => !beer.image_url.includes('keg.png')))
      .then(filtredData => setListState(filtredData));
  }
  render() {
    return null;
  }
}

export default FetchFromAPI;
