import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'

export default class Introduction extends Component {
  render() {
    return (
      <div className="Introduction">
          <h1 className="display-3">스노클 프로젝트 완성을 위한 부스터</h1>
          <p className="lead">스노클의 프로젝트 관리를 위한 계획 툴입니다.</p>
          <p>스노클 회원만 프로젝트 편집이 가능합니다. 회원이라면 로그인해주세요.</p>
      </div> 
    );
  }
}


