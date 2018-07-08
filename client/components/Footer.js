import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div className="Footer" style={{position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'lightblack', textAlign: 'center'}}>
        <div style={{display: 'inline-block'}}>
          <p>© 2018 <a href="http://sj602.github.io" style={{textDecoration: 'none'}}>Jin Seon</a> of <a href="http://snokl.com" style={{textDecoration: 'none'}}>Snokl</a></p>
        </div>
      </div> 
    );
  }
}


