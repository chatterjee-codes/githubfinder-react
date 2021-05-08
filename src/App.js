
import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import './App.css'; //global css
import axios from 'axios';

class App extends Component{

  state = {
    users: [],
    loading: false,
    alert: null
  }
  // async componentDidMount(){

  //   this.setState({ loading: true});


  //   const res = await axios.get(`https://api.github.com/users?authorization=${process.env.REACT_APP_GITHUB_TOKEN}`);

    
    
  //   this.setState( { users: res.data, loading: false } );


  // }

  //search github users
  searchUsers = async text => {

    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&authorization=${process.env.REACT_APP_GITHUB_TOKEN}`);
    
    this.setState( { users: res.data.items, loading: false } );

    console.log(res.data.items);
  }

  //clear users from state
  clearUsers = () => this.setState( { users: [], loading: false } );

  // set alert
  setAlert = (msg, type) => {
    // this.setState({ alert: {msg: msg, type:type } });
    this.setState({ alert: {msg, type } });

    setTimeout( ( ) => this.setState( { alert: null } ), 2000 );
  }

  render (){
     
    const {users, loading} = this.state;
    return (
      <div className='App'>
        <Navbar title="Github Finder" icon = 'fa fa-github'/>
        <div className="container">
          <Alert alert={this.state.alert} />
          <Search 
            searchUsers={this.searchUsers} 
            clearUsers={this.clearUsers} 
            showClear={
            users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
        
      </div>
    );

    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hello from React')); without jsx
  }
  
}

export default App;
