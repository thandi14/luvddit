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
import * as sessionActions from '../../store/session'
import { useSearch } from '../../context/search';
import * as postsActions from '../../store/posts';
import * as commentActions from "../../store/comments"
import { useFilter } from '../../context/filter';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const { communities } = useSelector(state => state.communities);
  const { user, other } = useSelector(state => state.session);
  let { communityMemberships, userCommunities, singleCommunity, memberships } = useSelector(state => state.communities);
  const history = useHistory()
  const [ homeButton, setHomeButton ] = useState("home")
  const location = useLocation();
  const [ isVisible, setIsVisible ] = useState(false)
  const { setModalContent, closeModal } = useModal()
  const [show, setShow] = useState(false);
  const targetRef = useRef()
  const targetRef2 = useRef()
  const targetRef3 = useRef()
  const targetRef4 = useRef()
  const ulRef = useRef();
  const { id } = useParams()
  const dispatch = useDispatch()
  const { search } = useParams()
  const [ s, setS ] = useState()
  const { filter, setFilter } = useFilter()
  const [ menuS, setMenuS ] = useState("")
  const [ searching, setSearching ] = useState(false)
  const [ results, setResults ] = useState(search)
  const [ isUsing, setIsUsing ] = useState(false)
  const [ open, setOpen ] = useState(false)
  const [ searchingC, setSearchingC ] = useState(false)

  const openMenu = () => {
    if (show) setShow(false);
    setShow(true);
  };

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    if (id) dispatch(communityActions.thunkGetDetailsById(id))
    if (singleCommunity.id && singleCommunity.type !== "Profile") setSearchingC(true)
  }, [id, singleCommunity.id])

  useEffect(() => {
    setResults(search)
  }, [search])


  useEffect(() => {

    const handleDocumentClick = (event) => {
        if ((targetRef.current && !targetRef.current.contains(event.target))) {
            setIsVisible(false);

          }

          if (!(targetRef2.current && targetRef2.current.contains(event.target)) && !(targetRef3.current && targetRef3.current.contains(event.target)) && !(targetRef4.current && targetRef4.current.contains(event.target))) {
            setSearching(false);
            setOpen(false)

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
    else if (location.pathname.includes('communities') && !location.pathname.includes('search')) {
      setHomeButton("communities")
    }
    else if (location.pathname.includes('search2/')) {
      setHomeButton("search2")
    }
    else if (location.pathname.includes('search/')) {
      setFilter(false)
      setHomeButton("search")
    }
    else if (location.pathname.includes('profile2')) {
      setHomeButton("profile2")
    }
    else if (location.pathname.includes('profile')) {
      setHomeButton("profile")
    }
    else {
      setHomeButton("home")
    }

  }, [location]);

  let myMemberships = Object.values(memberships).filter((c) => c.type !== "Profile")
  let myCommunities = Object.values(userCommunities).filter((c) => c.type !== "Profile")
  if (menuS) myMemberships = Object.values(memberships).filter((c) => c.name.toLowerCase().includes(menuS.toLowerCase()))
  if (menuS) myCommunities = Object.values(userCommunities).filter((c) => c.name.toLowerCase().includes(menuS.toLowerCase() && c.type !== "Profile"))

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <div onClick={(() => setShow(!show))} className={ show ? "profileButton2" : "profileButton" }>
        <div id="five">
        <div id="username">
        { !user.Community?.CommunityStyle?.icon ? <img id="pfpButton" src={pfp} alt="pfp"></img> : null}
        { user.Community?.CommunityStyle?.icon ? <img id="pfpButton" src={user.Community.CommunityStyle?.icon} alt="pfp"></img> : null}
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

  let sCommunities = []
  let sProfiles = []

  let allCommunities = Object.values(communities).filter((c) => c.type === "Public" || c.type === "Restricted")
  let myProfiles = Object.values(communities).filter((c) => c.type === "Profile")
  if ( results ) sCommunities = allCommunities.filter((c) => c.name.toLowerCase().includes(results.toLowerCase())).slice(0, 5)
  if ( results ) sProfiles = myProfiles.filter((c) => c.name.toLowerCase().includes(results.toLowerCase())).slice(0, 5)


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
          {homeButton === "create" ?  <i class="fa-solid fa-plus"></i> : null}
          {homeButton === "create" ?  <div>Create Post</div> : null }
          {homeButton === "search2" ?  singleCommunity.CommunityStyle?.icon ? <img id="pfp30" src={singleCommunity.CommunityStyle?.icon}></img> : <div style={{ backgroundColor: `${singleCommunity.CommunityStyle?.base}`}} id="nav-comms">l/</div> : null}
          {homeButton === "search2" ?  <div>Subluvddit results</div> : null }
          {homeButton === "communities" ?  singleCommunity.CommunityStyle?.icon ? <img id="pfp30" src={singleCommunity.CommunityStyle?.icon}></img> : <div style={{ backgroundColor: `${singleCommunity.CommunityStyle?.base}`}} id="nav-comms">l/</div> : null}
          {homeButton === "communities" ?  <div>l/{singleCommunity.name}</div> : null }
          {homeButton === "search" ?  <i class="fi fi-rs-search-heart"></i> : null}
          {homeButton === "search" ?  <div>Search Results</div> : null }
          {homeButton === "profile2" ? !other.profile?.CommunityStyle?.icon ? <img id="pfpButton" src={pfp} alt="pfp"></img> : <img id="pfpButton" src={other.profile?.CommunityStyle?.icon} alt="pfp"></img> : null}
          {homeButton === "profile2" ?  <div>u/{other.username}</div> : null }
          {homeButton === "profile" ? !singleCommunity.CommunityStyle?.icon ? <img id="pfpButton" src={pfp} alt="pfp"></img> : <img id="pfpButton" src={singleCommunity.CommunityStyle?.icon} alt="pfp"></img> : null}
          {homeButton === "profile" ?  <div>u/{user?.username}</div> : null }
          </div>
          <div id="homeB2">
         {user ? <i class="fa-solid fa-chevron-down"></i> : null}
          </div>
          </div>
         {user ? <div id={homeMenu}>
            <input onChange={((e) => setMenuS(e.target.value))} placeHolder="Filter"></input>
            <div id="mod-ms">
            { myCommunities.length || "mod queue mod mail l/mod".toLowerCase().includes(menuS.toLowerCase()) || menuS.length === 0 ? <span id="menu-tit"><div></div>MODERATING</span> : null}
            { "mod queue".toLowerCase().includes(menuS.toLowerCase()) || menuS.length === 0 ? <span onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Profile and Notifications"))}><div></div><i class="fi fi-rr-envelopes"></i>Mod Queue</span> : null}
            { "mod mail".toLowerCase().includes(menuS.toLowerCase()) || menuS.length === 0 ? <span onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Profile, and Notifications"))}><div></div><i class="fi fi-rr-envelope"></i>Modmail</span> : null}
            { "l/mod".toLowerCase().includes(menuS.toLowerCase()) || menuS.length === 0 ? <span onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))}><div></div><i class="fi fi-rr-envelopes"></i>l/Mod</span> : null}
            {myCommunities.map((c) =>
            <>
            <span onClick={(() => {
              history.push(`/communities/${c.id}/:page`)
              setIsVisible(false)
              })}><div></div>{ c.CommunityStyle?.icon ? <img id="pfp30" src={c.CommunityStyle?.icon}></img> : <span style={{ backgroundColor: `${c.CommunityStyle?.base}`}} id="no-pfp">l/</span>}l/{c.name}</span>
            </>
            )}
            </div>
            <div id="yourC-ms">
            { myMemberships.length || "create community".toLowerCase().includes(menuS.toLowerCase()) || menuS.length === 0 ? <span id="menu-tit"><div></div>YOUR COMMUNITIES</span> : null}
            { "create community".toLowerCase().includes(menuS.toLowerCase()) || menuS.length === 0 ? <span onClick={(() => {
              setModalContent(<CreateCommunity />)
              setIsVisible(false)
              })} ><div></div><i class="fi fi-rr-plus"></i>Create Community</span> : null}
            {myMemberships.map((c) =>
            <span onClick={(() => {
              history.push(`/communities/${c.id}/:page`)
              setIsVisible(false)
            })}><div></div>{c.type === "Profile" && !c.CommunityStyle?.icon ? <img id="pfp30" src={avatar}></img> : c.CommunityStyle?.icon ? <img id="pfp30" src={c.CommunityStyle?.icon}></img> : <span style={{ backgroundColor: `${c.CommunityStyle?.base}`}} id="no-pfp">l/</span>}l/{c.name}</span>
            )}
            </div>
            <div id="feeds-ms">
            { "homes popular all".toLowerCase().includes(menuS.toLowerCase()) || menuS.length === 0 ? <span id="menu-tit"><div></div>FEEDS</span> : null}
            {  "home".toLowerCase().includes(menuS.toLowerCase()) || menuS.length === 0 ? <span onClick={(() => {
              history.push('/')
              setIsVisible(false)
            })
            }><div></div><i class="fi fi-sr-home-heart"></i>Home</span> : null}
            {  "popular".toLowerCase().includes(menuS.toLowerCase()) || menuS.length === 0 ? <span onClick={(() => history.push("/hot"))}><div></div><i class="fi fi-rr-grin-hearts"></i>Popular</span> : null}
            {  "all".toLowerCase().includes(menuS.toLowerCase()) || menuS.length === 0 ? <span onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))}><div></div><i class="fi fi-rr-circle-heart"></i>All</span> : null}
            </div>
            <div id="other-ms">
            { "user settings messages create post queue premium avavtar, notifications".toLowerCase().includes(menuS.toLowerCase()) || menuS.length === 0 ? <span id="menu-tit"><div></div>OTHER</span> : null}
            {  "user settings".toLowerCase().includes(menuS.toLowerCase()) || menuS.length === 0 ? <span onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))}><div></div><img id="pfp-ms" src={!user.Community?.CommunityStyle?.icon ? avatar : user.Community?.CommunityStyle?.icon }></img>User Settings</span> : null}
            {  "messages".toLowerCase().includes(menuS.toLowerCase()) || menuS.length === 0 ? <span onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))}><div></div><img id="pfp-ms" src={!user.Community?.CommunityStyle?.icon ? avatar : user.Community?.CommunityStyle?.icon }></img>Messages</span> : null}
            {  "create post".toLowerCase().includes(menuS.toLowerCase()) || menuS.length === 0 ? <span onClick={(() => {
              history.push('/posts/new')
              setIsVisible(false)
              })}><div></div><i class="fi fi-rr-plus"></i>Create Post</span> : null}
            {  "notifications".toLowerCase().includes(menuS.toLowerCase()) || menuS.length === 0 ? <span onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))}><div></div><i class="fi fi-rs-cowbell"></i>Notifications</span> : null}
            {  "premium".toLowerCase().includes(menuS.toLowerCase()) || menuS.length === 0 ? <span onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))}><div></div><i class="fa-solid fa-shield-halved"></i>Premium</span> : null}
            {  "avatar".toLowerCase().includes(menuS.toLowerCase()) || menuS.length === 0 ? <span onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))}><div></div><i class="fi fi-rr-vest"></i>Avatar</span> : null}
            </div>
          </div> : null}
      </div>
      <div
      onMouseEnter={(() => setIsUsing(true))}
      onMouseLeave={(() => setIsUsing(false))}
      onMouseClick={(() => setOpen(true))}
      style={{ position: "relative", borderBottomLeftRadius: open ? "0px" : "", borderBottomRightRadius: open ? "0px" : "" }} id="search">
      <i class="fi fi-rs-search-heart"></i>
     { filter && singleCommunity.type !== "Profile" ? <div id="searchCPage">
        { singleCommunity.CommunityStyle?.icon ? <img id="pfp30" src={singleCommunity.CommunityStyle?.icon}></img> : null}
        { !singleCommunity.CommunityStyle?.icon ? <div id="pfp30" style={{ color: "white", backgroundColor: `${singleCommunity.CommunityStyle?.base}`}}>l/</div> : null}
      l/{singleCommunity.name}<i onClick={(() => setFilter(false))} style={{ fontSize: "15px", height: "15px", cursor: "pointer" }}class="fi fi-rr-cross-circle"></i></div> : null}
     {/* <input id="nfo" ref={targetRef3} defaultValue={results} style={{ backgroundColor: "transparent", display: searching ? "none" : ""}} onClick={((e) => {
       setOpen(true)
      })} text="type" placeholder='Search Luvddit'></input> */}
      <input id="nfo" placeholder='Search Luvddit' ref={targetRef2} style={{ backgroundColor: "transparent" }} onChange={((e) => {
          setSearching(true)
          setResults(e.target.value)
          setS(e.target.value)
       if (e.target.value === 0 ) {
          setS("")
        }
      })}
      onKeyDown={((e) => {
        if (e.key === "Enter") {
          setS(e.target.value)
        if (filter) {
          history.push(`/search2/community/${singleCommunity.id}/:page/${s}`)
        }
        else {
          history.push(`/search/:page/${s}`)
        }

        }
        })} text="type" placeholder='Search Luvddit'></input>
        { results && searching && <div ref={targetRef4} id="nav-results">
          { sCommunities.length !== 0 && !filter && <div id="nav-ppl">
              { sCommunities.length && <span id="nav-name">Communities</span>}
            { sCommunities.map((c) =>
              <div onClick={(() => {
                history.push( `/communities/${c.id}/:page`)
                setSearching(false)
                })} id="nav-pro">
                {c.CommunityStyle?.icon ? <img style={{ width: "26px", height: "26px"}} id="pfp30" src={c.CommunityStyle?.icon}></img> : null}
                {!c.CommunityStyle?.icon ? <div style={{ width: "26px", height: "26px"}} id="pfp30" style={{ color: "white", backgroundColor: `${c.CommunityStyle?.base}`}}>l/</div> : null}
                <span style={{ display: "flex", flexDirection: "column"}}>
                <span style={{ fontSize: "14px", fontWeight:"900"}}>l/{c.name}</span>
                <span style={{ gap: "2px", fontSize: "12px", color: "#7C7C7C", display: "flex", alignItems: "center"}}>
                  Community<i style={{ fontSize: "8px", height: "8px"}} class="fi fi-ss-circle-small"></i>{c.CommunityMembers} members</span>
                </span>
              </div>
            )}
            </div>}
          { sProfiles.length !== 0 && !filter && <div id="nav-ppl">
            <span id="nav-name">People</span>
            { sProfiles.map((c) =>
              <div onClick={(() => {
                if (c.userId === user?.id) history.push(`/profile/:page`)
                else history.push( `/profile2/${c.userId}/:page`)
                setSearching(false)
                })}
                id="nav-pro">
                 {c.CommunityStyle?.icon ? <img style={{ width: "26px", height: "26px"}} id="pfp30" src={c.CommunityStyle?.icon}></img> : null}
                {!c.CommunityStyle?.icon ? <img style={{ width: "26px", height: "26px"}} id="pfp30" src={pfp}></img> : null}
                <span style={{ display: "flex", flexDirection: "column"}}>
                <span style={{ fontSize: "14px", fontWeight: "900"}}>u/{c.name}</span>
                <span style={{ gap: "2px", fontSize: "12px", color: "#7C7C7C", display: "flex", alignItems: "center"}}>
                  User<i style={{ fontSize: "8px", height: "8px"}}class="fi fi-ss-circle-small"></i>{c.User.karma} karma</span>
                </span>

              </div>
            )}
            </div>}
            <div onClick={(() => {
              if (filter) {
                history.push(`/search2/community/${singleCommunity.id}/:page/${results}`)
              }
              else {
                history.push(`/search/:page/${results}`)
              }
              setS(results)
              setSearching(false)
              })} id="sRes" style={{ display: "flex", padding: "1% 0%"}}>
            <span style={{ fontWeight: "500", gap: "5px", alignItems: "center"}} id="nav-name"><i style={{ fontSize: "24px", height: "24px"}} class="fi fi-rs-search-heart"></i>Search for "{results}"{filter ? `in l/${singleCommunity.name}` : ""}</span>
            </div>
          </div>}
      </div>
      <div id="allIcons">
      <div id="img1">
      <i onClick={(() => history.push("/hot"))} class="fi fi-rr-grin-hearts"></i>
      </div>
      <div onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))} id="img1">
      <i class="fi fi-rs-shield"></i>
      </div>
      <div onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))} id="img1">
      <i class="fi fi-rr-comment-heart"></i>
      </div>
      <div onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))} id="img1">
      <i class="fi fi-rs-cowbell"></i>
      </div>
      <div onClick={(() => user ? history.push('/posts/new') : setModalContent(<LoginFormModal />))} id="img1">
      <i class="fi fi-rr-plus"></i>
      </div>
      <span onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))} id="advertise"><i class="fi fi-rr-bullhorn"></i>Advertise</span>
      </div>
      <div ref={ulRef} className='profile'>
      {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
