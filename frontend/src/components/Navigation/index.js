import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css'
import luvddit from './icons/communityIcon_g0t6k4umk1c91-modified.png'


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  console.log(sessionUser)
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="profileButton">
        <div id="username">
        <ProfileButton user={sessionUser} />
        <div>
        <p id="user">{sessionUser.username}</p>
        <div id="star">
        <i class="fi fi-rr-star-christmas"></i>
        <p id="k">{sessionUser.karma} karma</p>
        </div>
        </div>
        </div>
        <div id="username2">
        <i class="fa-solid fa-chevron-down"></i>
        </div>
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
      <div className="logo">
        <img id="luvddit" src={luvddit} alt="logo"></img>
        <div>
        <h2>luvddit</h2>
        <i class="fa-solid fa-heart"></i>
        </div>
        </div>
        {/* <div></div> */}
      <div id="homeButton">
        <div id="homeB1">
        <i class="fi fi-sr-home-heart"></i>
        <NavLink exact to="/">Home</NavLink>
        </div>
        <div id="homeB2">
        <i class="fa-solid fa-chevron-down"></i>
        </div>
      </div>
      <div id="search">
      <i class="fi fi-rs-search-heart"></i>
      <input text="type" placeholder='Search Luvddit'></input>
      </div>
      <div id="allIcons">
      <div id="img1">
      <i class="fi fi-rr-grin-hearts"></i>
      </div>
      <div id="img1">
      <i class="fi fi-rs-shield"></i>
      </div>
      <div id="img1">
      <i class="fi fi-rr-comment-heart"></i>
      </div>
      <div id="img1">
      <i class="fi fi-rs-cowbell"></i>
      </div>
      <div id="img1">
      <i class="fi fi-rr-plus"></i>
      </div>
      <span id="advertise"><i class="fi fi-rr-bullhorn"></i>Advertise</span>
      </div>
      <div className='profile'>
      {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
