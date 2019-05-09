import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    users: []    
  }
  // add any needed code to ensure that the users collection exists on state and it has data coming from the server

  componentDidMount() {
    axios
    .get('http://localhost:5001/api/users')
    .then(response => this.setState({users: response.data}))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.users.map(user => <li>{user.name}</li> )}
        </ul>
      </div>
    );

  }

}

export default App;
