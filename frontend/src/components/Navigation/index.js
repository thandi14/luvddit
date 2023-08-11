import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
    );
  }

  return (
    <div className="navigation">
      <div><h2>Luvddit</h2></div>
      <div>
        <NavLink exact to="/">Home</NavLink>
      </div>
      <input text="type"></input>
      <i>popular</i>
      <i>moderation</i>
      <i>chat</i>
      <i>notif</i>
      <i>post</i>
      <i>ad</i>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
