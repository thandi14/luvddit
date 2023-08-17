import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css'
import luvddit from './icons/communityIcon_g0t6k4umk1c91-modified.png'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormPage';
import OpenModalButton from '../OpenModalButton';
import avatar from "./icons/IMG6.jpg"

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const { communityMemberships, userCommunities, singleCommunity } = useSelector(state => state.communities);
  const history = useHistory()
  const [ homeButton, setHomeButton ] = useState("home")
  const location = useLocation();
  const [ isVisible, setIsVisible ] = useState(false)

  useEffect(() => {
    if (location.pathname.includes('new')) {
      setHomeButton("create")
    }
    else if (location.pathname.includes('communities')) {
      setHomeButton("communities")
    }
    else {
      setHomeButton("home")
    }

  }, [location]);

  let memberships = Object.values(communityMemberships)
  memberships = memberships.slice(1, memberships.length)
  let myCommunities = Object.values(userCommunities)
  myCommunities = myCommunities.slice(1, myCommunities.length)

  console.log(location.pathname.includes('communities'))


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
          <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </div>
    );
  }

  const homeButtonMenu = isVisible ? "homeButton2" : "homeButton";
  const homeMenu = isVisible ? "home-menu" : "hidden";

  console.log(homeButton)

  return (
    <div className="navigation">
      <div onClick={(() => history.push('/'))} className="logo">
        <img id="luvddit" src={luvddit} alt="logo"></img>
        <div>
        <h2>luvddit</h2>
        <i class="fa-solid fa-heart"></i>
        </div>
        </div>
      <div className="homeButton">
          <div onClick={(() => setIsVisible(!isVisible))} id={homeButtonMenu}>
          <div id="homeB1">
          {homeButton === "home" ? <i class="fi fi-sr-home-heart"></i> : null }
          {homeButton === "home" ?  <div>Home</div> : null }
          {homeButton === "create" && !Object.values(singleCommunity).length ?  <i class="fa-solid fa-plus"></i> : null}
          {homeButton === "create" && !Object.values(singleCommunity).length ?  <div>Create Post</div> : null }
          {homeButton === "communities" || (Object.values(singleCommunity).length && homeButton) === "create" ?  <div id="nav-comms">l/</div> : null}
          {homeButton === "communities" || (Object.values(singleCommunity).length && homeButton) === "create" ?  <div>l/{singleCommunity.name}</div> : null }
          </div>
          <div id="homeB2">
          <i class="fa-solid fa-chevron-down"></i>
          </div>
          </div>
          <div id={homeMenu}>
            <input placeHolder="filter"></input>
            <div id="mod-ms">
            <span><div></div>Moderating</span>
            <span><div></div><i class="fi fi-rr-envelopes"></i>Mod Queue</span>
            <span><div></div><i class="fi fi-rr-envelope"></i>Modmail</span>
            <span><div></div><i class="fi fi-rr-envelopes"></i>l/Mod</span>
            {myCommunities.map((c) =>
            <>
            <span onClick={(() => history.push(`/communities/${c.id}`))}><div></div><span id="no-pfp">l/</span>l/{c.name}</span>
            </>
            )}
            </div>
            <div id="yourC-ms">
            <span><div></div>Your communities</span>
            <span><div></div><i class="fi fi-rr-plus"></i>Create Community</span>
            {memberships.map((c) =>
            <span onClick={(() => history.push(`/communities/${c.Community?.id}`))}><div></div><span id="no-pfp">l/</span>l/{c.Community?.name}</span>
            )}
            </div>
            <div id="feeds-ms">
            <span><div></div>Feeds</span>
            <span><div></div><i class="fi fi-sr-home-heart"></i>Home</span>
            <span><div></div><i class="fi fi-rr-grin-hearts"></i>Popular</span>
            <span><div></div><i class="fi fi-rr-circle-heart"></i>All</span>
            </div>
            <div id="other-ms">
            <span><div></div>Other</span>
            <span><div></div><img id="pfp-ms" src={avatar}></img>User Settings</span>
            <span><div></div><img id="pfp-ms" src={avatar}></img>Messages</span>
            <span><div></div><i class="fi fi-rr-plus"></i>Create Post</span>
            <span><div></div><i class="fi fi-rs-cowbell"></i>Notifications</span>
            <span><div></div><i class="fa-solid fa-shield-halved"></i>Premium</span>
            <span><div></div><i class="fi fi-rr-vest"></i>Avatar</span>
            </div>
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
      <div onClick={(() => history.push('/posts/new'))} id="img1">
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
