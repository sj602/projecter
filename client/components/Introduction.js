import React, { Component } from 'react';
import { connect } from 'react-redux';

class Introduction extends Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <div className="Introduction" style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block'}}>
          <h1>프로젝트 완성을 위한 부스터</h1>
          <p>스노클의 프로젝트 관리를 위한 페이지입니다</p>
          <p>현재 스노클 회원만 프로젝트 편집이 가능합니다</p>{ isAuthenticated ? null : <span>회원이라면 로그인 해주세요</span> }
        </div>
      </div> 
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, null)(Introduction);


