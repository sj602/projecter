import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { store } from '../store';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import Introduction from './Introduction';
import ProjectList from './ProjectList';
import Footer from './Footer';
import SignUp from './SignUp';
import Login from './Login';
import Logout from './Logout';
import ProjectAdd from './ProjectAdd';
import ProjectDetail from './ProjectDetail';
require('../static/favicon.ico');
import '../static/App.css';

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Product Sans", serif',
  },
});

export default class App extends Component {
  componentDidMount() {
    
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="Contents">
              <CssBaseline />
              <Header />
              <Route exact path="/" render={props =>
                <Fragment>
                  <Introduction />
                  <ProjectList />
                </Fragment>
              }/>
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/add" component={ProjectAdd} />
              <Route exact path="/detail" component={ProjectDetail} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}