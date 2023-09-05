import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css'
import luvddit from './icons/communityIcon_g0t6k4umk1c91-modified.png'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormPage';
import OpenModalButton from '../OpenModalButton';
import avatar from "./icons/IMG6.jpg"
import CreateCommunity from '../CreateCommunityModel';
import { useModal } from '../../context/Modal';
import pfp from "./icons/IMG6.jpg"
import { useRef } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import * as communityActions from '../../store/communities'


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const { user } = useSelector(state => state.session);
  let { communityMemberships, userCommunities, singleCommunity } = useSelector(state => state.communities);
  const history = useHistory()
  const [ homeButton, setHomeButton ] = useState("home")
  const location = useLocation();
  const [ isVisible, setIsVisible ] = useState(false)
  const { setModalContent, closeModal } = useModal()
  const [show, setShow] = useState(false);
  const targetRef = useRef()
  const ulRef = useRef();
  const { id } = useParams()
  const dispatch = useDispatch()


  const openMenu = () => {
    if (show) setShow(false);
    setShow(true);
  };

  useEffect(() => {
    if (id) dispatch(communityActions.thunkGetDetailsById(id))
  }, [id])


  useEffect(() => {

    const handleDocumentClick = (event) => {
        if ((targetRef.current && !targetRef.current.contains(event.target))) {
            setIsVisible(false);

          }

      };

      document.addEventListener('click', handleDocumentClick);
      return () => {
          document.removeEventListener('click', handleDocumentClick);
      };

  }, []);


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
  let myCommunities = Object.values(userCommunities)
  myCommunities = myCommunities.slice(1, myCommunities.length)


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <div onClick={(() => setShow(!show))} className={ show ? "profileButton2" : "profileButton" }>
        <div id="five">
        <div id="username">
        <img id="pfpButton" src={pfp} alt="pfp"></img>

        </div>
        <div id="nameofuser">
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
        <ProfileButton user={sessionUser} menu={show} r={ulRef} />
      </>
    );
  } else {
    sessionLinks = (
      <div id="button-formss">
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

  return (
    <div className="navigation">
      <div onClick={(() => history.push('/'))} className="logo">
        <img id="luvddit" src={luvddit} alt="logo"></img>
        <div>
        <h2>luvddit</h2>
        <i class="fa-solid fa-heart"></i>
        </div>
        </div>
      <div ref={targetRef} className="homeButton">
          <div onClick={(() => setIsVisible(!isVisible))} id={homeButtonMenu}>
          <div id="homeB1">
          {homeButton === "home" ? <i class="fi fi-sr-home-heart"></i> : null }
          {homeButton === "home" ?  <div>Home</div> : null }
          {homeButton === "create" && !Object.values(singleCommunity).length ?  <i class="fa-solid fa-plus"></i> : null}
          {homeButton === "create" && !Object.values(singleCommunity).length ?  <div>Create Post</div> : null }
          {homeButton === "communities" || (Object.values(singleCommunity).length && homeButton) === "create" ?  singleCommunity.communityStyles && singleCommunity.communityStyles.length ? <img id="pfp30" src={singleCommunity.communityStyles[0].profile}></img> : <div id="nav-comms">l/</div> : null}
          {homeButton === "communities" || (Object.values(singleCommunity).length && homeButton) === "create" ?  <div>l/{singleCommunity.name}</div> : null }
          </div>
          <div id="homeB2">
         {user ? <i class="fa-solid fa-chevron-down"></i> : null}
          </div>
          </div>
         {user ? <div id={homeMenu}>
            <input placeHolder="Filter"></input>
            <div id="mod-ms">
            <span id="menu-tit"><div></div>Moderating</span>
            <span onClick={(() => window.alert("Feature not available"))}><div></div><i class="fi fi-rr-envelopes"></i>Mod Queue</span>
            <span onClick={(() => window.alert("Feature not available"))}><div></div><i class="fi fi-rr-envelope"></i>Modmail</span>
            <span onClick={(() => window.alert("Feature not available"))}><div></div><i class="fi fi-rr-envelopes"></i>l/Mod</span>
            {myCommunities.map((c) =>
            <>
            <span onClick={(() => {
              history.push(`/communities/${c.id}`)
              setIsVisible(false)
              })}><div></div>{ c.communityStyles && c.communityStyles.length ? <img id="pfp30" src={c.communityStyles[0].profile}></img> : <span id="no-pfp">l/</span>}l/{c.name}</span>
            </>
            )}
            </div>
            <div id="yourC-ms">
            <span id="menu-tit"><div></div>Your communities</span>
            <span onClick={(() => setModalContent(<CreateCommunity />))} ><div></div><i class="fi fi-rr-plus"></i>Create Community</span>
            {memberships.map((c) =>
            <span onClick={(() => {
              history.push(`/communities/${c.Community?.id}`)
              setIsVisible(false)
            })}><div></div>{ c.Community.communityStyles && c.Community.communityStyles.length ? <img id="pfp30" src={c.Community.communityStyles[0].profile}></img> : <span id="no-pfp">l/</span>}l/{c.Community?.name}</span>
            )}
            </div>
            <div id="feeds-ms">
            <span id="menu-tit"><div></div>Feeds</span>
            <span onClick={(() => {
              history.push('/')
              setIsVisible(false)
            })
            }><div></div><i class="fi fi-sr-home-heart"></i>Home</span>
            <span onClick={(() => window.alert("Feature not available"))}><div></div><i class="fi fi-rr-grin-hearts"></i>Popular</span>
            <span onClick={(() => window.alert("Feature not available"))}><div></div><i class="fi fi-rr-circle-heart"></i>All</span>
            </div>
            <div id="other-ms">
            <span id="menu-tit"><div></div>Other</span>
            <span onClick={(() => window.alert("Feature not available"))}><div></div><img id="pfp-ms" src={avatar}></img>User Settings</span>
            <span onClick={(() => window.alert("Feature not available"))}><div></div><img id="pfp-ms" src={avatar}></img>Messages</span>
            <span onClick={(() => history.push('/posts/new'))}><div></div><i class="fi fi-rr-plus"></i>Create Post</span>
            <span onClick={(() => window.alert("Feature not available"))}><div></div><i class="fi fi-rs-cowbell"></i>Notifications</span>
            <span onClick={(() => window.alert("Feature not available"))}><div></div><i class="fa-solid fa-shield-halved"></i>Premium</span>
            <span onClick={(() => window.alert("Feature not available"))}><div></div><i class="fi fi-rr-vest"></i>Avatar</span>
            </div>
          </div> : null}
      </div>
      <div id="search">
      <i class="fi fi-rs-search-heart"></i>
      <input onClick={(() => window.alert('Feature not available'))} text="type" placeholder='Search Luvddit'></input>
      </div>
      <div id="allIcons">
      <div id="img1">
      <i class="fi fi-rr-grin-hearts"></i>
      </div>
      <div onClick={(() => window.alert("Feature not available"))} id="img1">
      <i class="fi fi-rs-shield"></i>
      </div>
      <div onClick={(() => window.alert("Feature not available"))} id="img1">
      <i class="fi fi-rr-comment-heart"></i>
      </div>
      <div onClick={(() => window.alert("Feature not available"))} id="img1">
      <i class="fi fi-rs-cowbell"></i>
      </div>
      <div onClick={(() => history.push('/posts/new'))} id="img1">
      <i class="fi fi-rr-plus"></i>
      </div>
      <span onClick={(() => window.alert("Feature not available"))} id="advertise"><i class="fi fi-rr-bullhorn"></i>Advertise</span>
      </div>
      <div ref={ulRef} className='profile'>
      {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
