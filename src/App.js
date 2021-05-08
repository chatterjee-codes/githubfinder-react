
import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import './App.css'; //global css
import axios from 'axios';

class App extends Component{

  state = {
    users: [],
    loading: false
  }
  async componentDidMount(){

    this.setState({ loading: true});


    const res = await axios.get(`https://api.github.com/users?authorization=${process.env.REACT_APP_GITHUB_TOKEN}`);
    
    this.setState( { users: res.data, loading: false } );
  }

  render (){
     
    return (
      <div className='App'>
        <Navbar title="Github Finder" icon = 'fa fa-github'/>
        <div className="container">
          <Search />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
        
      </div>
    );

    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hello from React')); without jsx
  }
  
}

export default App;
