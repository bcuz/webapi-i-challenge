import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import {getUsers, deleteUser} from "./actions";
import logo from './logo.svg';
import FlashMessage from 'react-flash-message'
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

  deleteItem = (e, id) => {
    e.preventDefault();
    this.props.deleteUser(id).then(() =>this.props.getUsers()       )     

    // axios
    //   .delete(`http://localhost:5001/api/users/${id}`)
    //   .then(res => {
    //     this.setState({deleted: res.data.name})
        
    //     this.props.getUsers()              
    //   })
    //   .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">        
        {this.props.fetchingData && <p>Loading...</p>}
        <ul>
          {this.props.users.map(user => {
            
            return <li><button onClick={(e) => this.deleteItem(e, user.id)}>X</button> {user.name}</li>
            
            } )}
        </ul>
        {this.props.delName && (
          <FlashMessage duration={2000}>
            <p style={{color: 'red'}}>deleted {this.props.delName}</p>
          </FlashMessage>
          ) }
        <Form />
      </div>
    );

  }

}

const mapStateToProps = state => {
  return { users: state.users, 
    fetchingData: state.fetchingData, 
    delName: state.delName,   
  }
}

export default connect(mapStateToProps, {getUsers, deleteUser})(App);
