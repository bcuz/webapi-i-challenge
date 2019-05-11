import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import {getUsers} from "./actions";
import logo from './logo.svg';
import Form from './components/Form';
import './App.css';

class App extends Component {
  state = {
    users: [],
    deleted: ''
  }
  // add any needed code to ensure that the users collection exists on state and it has data coming from the server

  componentDidMount() {
    this.props.getUsers()
  }

  fetchUsers = () => {
    axios
    .get('http://localhost:5001/api/users')
    .then(res => this.setState({users: res.data}))
    .catch(err => console.log(err));
  }

  deleteItem = id => {
    axios
      .delete(`http://localhost:5001/api/users/${id}`)
      .then(res => {
        this.setState({deleted: res.data.name})
        
        this.fetchUsers()              
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        {this.state.deleted && <p>Deleted {this.state.deleted} </p> }

        {this.props.fetchingData && <p>Loading...</p>}
        <ul>
          {this.props.users.map(user => {
            
            return <li><button onClick={() => this.deleteItem(user.id)}>X</button> {user.name}</li>
            
            } )}
        </ul>
        <Form fetchUsers={this.fetchUsers}  />
      </div>
    );

  }

}

const mapStateToProps = state => {
  return { users: state.users, fetchingData: state.fetchingData}
}

export default connect(mapStateToProps, {getUsers})(App);
