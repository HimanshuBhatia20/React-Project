import React, { Component } from 'react';
import './../../App.css';
import fetchHits from './../../api/api.js';
import List from './components/List/List.js';
import Loader from './../../components/Loader/Loader.js';

class ListRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      isLoading: true,
      error: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      fetchHits().then(result => {
        this.setState({
          hits: result.feed.entry,
          isLoading: false })
        }).catch(err => {
          this.setState({
            error: true,
            isLoading: false });
        })
      }, 2000);
  }

  render() {
    const { hits, isLoading, error } = this.state;
    return (
        <div className="container">
          { error &&
            <div className="error">I'm sorry! Error occured :(</div>
          }

          { isLoading ? (
            <Loader />
          ) : (
            <List list={hits}/>
          )
          }
        </div>
    );
  }
}

export default ListRoute;
