import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { store } from '../store';
import '../static/App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import Introduction from './Introduction';
import ProjectList from './ProjectList';
import SignUp from './SignUp';
import Login from './Login';
import Logout from './Logout';
import ProjectAdd from './ProjectAdd';
import ProjectDetail from './ProjectDetail';

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Product Sans", serif',
  },
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
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
        </Router>
      </Provider>
    );
  }
}