import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import {getUsers} from "../actions";

class Form extends Component {
  state = {
    name: '',
    bio: ''
  }

  createUser = e => {
    e.preventDefault();
    axios
      // friend data is added to the array
      .post(`http://localhost:5001/api/users`, this.state)
      .then(res => {         
        // res.data has all the proper work
        // done on it from the server.
        // this.props.updateItems(res.data);
        this.props.getUsers()
        
      })
      .catch(err => console.log(err));

      this.setState({
        name: '', bio: ''
      });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value      
    });
  };

  render() {
    return (
      <div className="App">
      <form onSubmit={this.createUser}>
          <label>Name</label>
          <input onChange={this.handleInputChange} value={this.state.name} name="name" />
          <label>Bio</label>
          <input
 onChange={this.handleInputChange} value={this.state.bio} name="bio" />
          <input type='submit' />
        </form>
      </div>
    );
  }
}

export default connect(null, {getUsers})(Form);