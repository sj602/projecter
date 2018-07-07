import React, { Component } from 'react';
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
import ProjectDetail from './ProjectDetail';
import { getFromStorage } from '../utils/storage';

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Product Sans", serif',
  },
});

export default class App extends Component {
  // componentDidMount() {
  //   const obj = getFromStorage('projecter');
  //   if(obj && obj.token) {
  //     const { token } = obj;
  //     // verify token
  //     fetch('/api/verify?token=' + token)
  //       .then(res => res.json())
  //       .then(json => {
  //         if(json.success) {
  //           this.setState({token});
  //         } 
  //       })
  //   }
  // }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <CssBaseline />
            <Header />
            <Route exact path="/" render={props =>
              <div>
                <Introduction />
                <ProjectList />
              </div>
            }/>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/detail" component={ProjectDetail} />
          </div>
        </Router>
      </Provider>
    );
  }
}