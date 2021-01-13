import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

import './App.css';
import { AuthProvider } from './context/auth.js'
import AuthRoute from './util/AuthRoute.js' 

import MenuBar from './components/MenuBar.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import SinglePost from './pages/SinglePost.js';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <Route exact path='/posts/:postId' component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>

  );
}

export default App;
