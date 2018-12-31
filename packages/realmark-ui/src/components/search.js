import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../actions/logoutAction';


class SearchPage extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return (
      <div className="searchWrapper">
        <div className="searchInnerWrapper">
          <div className="searchLeftWrapper">
            <img className="searchImg" src={this.props.user.imageURL} />
            <div className="searchInfoWrapper">
              <Link to='/user'><div className="searchName" style={{ textDecoration: 'none' }}>{this.props.user.firstName} {this.props.user.lastName}</div></Link>
              <Link to='/user'><div className="searchUserName" style={{ textDecoration: 'none' }}>@{this.props.user.username}</div></Link>
              <div className="searchLocation">{this.props.user.location}</div>
            </div>
          </div>
          <div className="searchRightWrapper">
            <button className="searchButton">Follow</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.currentUser,
  currentUser: state.currentUser
})

export default connect(mapStateToProps, {logOut})(SearchPage);