import React, { useReducer } from 'react';
import axios from 'axios';
import githubContext from './githubContext';
import githubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

let githubToken;

if(process.env.NODE_ENV !== 'production') {
    githubToken = process.env.REACT_APP_GITHUB_TOKEN;
} else {
    githubToken = process.env.GITHUB_TOKEN;
}

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState);

    //search users
    const searchUsers = async text => {

        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&authorization=${githubToken}`);
      
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });
      };

    // get user
    const getUser = async (username) => {
    
        setLoading();
    
        const res = await axios.get(`https://api.github.com/users/${username}?authorization=${githubToken}`);
        
       dispatch({
            type: GET_USER,
            payload: res.data
       });
      };

    // get repos
    const getUserRepos = async (username) => {
    
        setLoading();
    
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&authorization=${githubToken}`);
        
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
      };
    

    //clear users
    const  clearUsers = () => dispatch( { type: CLEAR_USERS} );

    //set loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return (<githubContext.Provider
        
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}
    
    >
    {props.children}
    </githubContext.Provider>);
}

export default GithubState