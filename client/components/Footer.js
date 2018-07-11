import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
        <div className='footer' style={{position: 'fixed', backgroundColor: "white", color: 'rgb(118,118,118)', marginTop: '20px', bottom: 0, width: '100%', textAlign: 'center', borderTop: '1px solid lightgrey'}}>
          <div style={{display: 'inline-block'}}>
            <p>© 2018 <a href="http://sj602.github.io" style={{color: '#404040', textDecoration: 'underline'}}>Jin Seon</a> of <a href="http://snokl.com" style={{color: '#404040', textDecoration: 'underline'}}>Snokl</a></p>
          </div>
        </div> 
    );
  }
}