
import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';

import User from './components/users/User';
import Home from './components/pages/Home';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import './App.css'; //global css


import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';


const App = () => {
 
    

    return (
      <GithubState>
        <AlertState>
          <Router>
            <div className='App'>
              <Navbar title="Github Finder" icon = 'fa fa-github'/>
                <div className="container">
                  <Alert  />
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/about' component={About}/>
                    <Route exact path='/user/:login' component={User} />
                    <Route component={NotFound} />
                  </Switch>
                </div>
            </div>
          </Router>
        </AlertState>
      </GithubState>
    );

    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hello from React')); without jsx
  
  
}

export default App;
