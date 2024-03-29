import * as postsActions from '../../store/posts'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import * as communitiesActions from "../../store/communities"
import '../HomePage/HomePage.css'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import PostPageModal from '../PostPage/PostPageModal'
import { useModal } from '../../context/Modal'
import CreateCommunity from '../CreateCommunityModel'
import PostLikes from '../HomePage/likes'
import "./SearchPage.css"
import avatar from './IMG6.jpg'
import alien from "./searchingavatar.png"
import { useSearch } from '../../context/search'
import teleAlien from "./telescopeA.png"
import SignupFormModal from '../SignupFormPage'

function SearchPage() {
    const { posts, singlePost, postsHistory, searchs } = useSelector((state) => state.posts);
    const { communities, memberships } = useSelector((state) => state.communities);
    const { user } = useSelector((state) => state.session);
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [ isLiked, setIsLiked ] = useState([]);
    const history = useHistory()
    const { setModalContent } = useModal()
    const [ scrolling, setScrolling ] = useState(null)
    const targetRef = useRef()
    const targetRef2 = useRef()
    const { page } = useParams(); // Retrieve the page parameter from the URL
    const { search } = useParams()
    const [currentPage, setCurrentPage] = useState(1);
    const [threshold, setThreshold] = useState(450);
    const [timebox, setTimebox] = useState(false)
    const [sortbox, setSortbox] = useState(false)
    const { setTimeSearch, timeSearch, setSortSearch, sortSearch } = useSearch()

    useEffect(() => {
      localStorage.setItem("currentPage", currentPage.toString());
      setSortSearch("Sort")
    }, [currentPage, search]);

    useEffect(() => {

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };

    }, [currentPage, search]);

    const handleButtonClick = () => {
      document.getElementById('nfo').focus(); // Assuming your input has an id of 'myInput'
    };

    useEffect(() => {

      const handleDocumentClick = (event) => {
        if ((targetRef.current && !targetRef.current.contains(event.target))) {
            setTimebox(false);

          }
          if ((targetRef2.current && !targetRef2.current.contains(event.target))) {
            setSortbox(false);

          }

      };

      document.addEventListener('click', handleDocumentClick);
      return () => {
          document.removeEventListener('click', handleDocumentClick);
      };

    }, []);


    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      if (windowHeight + scrollTop >= documentHeight - threshold) {
        const storedCurrentPage = localStorage.getItem("currentPage");

        setCurrentPage(currentPage + 1);
        setThreshold(threshold + 200);
        dispatch(postsActions.thunkGetAllSearchedPosts(currentPage, search)); // Fetch posts for the specified page
        dispatch(postsActions.thunkGetAllPosts(currentPage))

      }
    }


    let top = isVisible ? "top" : "down"


  useEffect(() => {

    async function fetchData() {
      let data
      if (user) data = await dispatch(postsActions.thunkGetUserVotes())
      setIsLiked(data)
    }
    fetchData()

  }, [dispatch, posts, user])

  useEffect(() => {
    async function fetchData() {
      let data = await dispatch(postsActions.thunkGetAllPosts(page))
       await dispatch(postsActions.thunkGetAllSearchedPosts(page, search)); // Fetch posts for the specified page
      }
      fetchData()
  }, [singlePost.Comments, page, search])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 450) {
          setIsVisible2(false)

      }
      else if (window.scrollY > 460) {
        setIsVisible(true);
        setIsVisible2(true);

      } else {
        setIsVisible(false);

      }
    };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };


  }, [])

  let otherCommunity = Object.values(communities).filter((c) => c.type !== "Profile").slice(0, 5)
  if (search) otherCommunity = otherCommunity.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
  let otherProfiles = Object.values(communities).filter((c) => c.type === "Profile").slice(0, 5)
  if (search) otherProfiles = otherProfiles.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))

  let ePost  = Object.values(searchs)
  let sPost = ePost

  if (sortSearch == "Relevance" || "Sort") {
    ePost = sPost

  }
  if (sortSearch == "New") {
    ePost = sPost
    ePost = Object.values(searchs).reverse().sort((a, b) => a.createdAt - b.createdAt)

  }
  else if (sortSearch == "Hot") {
    ePost = sPost
    ePost = ePost.sort((a, b) => b.Votes.length - a.Votes.length)

  }
  else if (sortSearch == "Top") {
    ePost = sPost
    ePost = ePost.sort((a, b) => b.Votes.filter((v) => v.upVotes == 1).length - a.Votes.filter((v) => v.upVotes == 1).length)

  }
  else if (sortSearch == "Most Comments") {
    ePost = sPost
    ePost = ePost.sort((a, b) => b.Comments.length - a.Comments.length)
  }

  if (!search) ePost = []
  if (search) ePost = ePost.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
  if (ePost.length === 0 && search) ePost = []

  const currentDate = new Date();
  const oneYearAgo = new Date(currentDate);
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1)
  const oneMonthAgo = new Date(currentDate);
  oneMonthAgo.setMonth(currentDate.getMonth() - 1)
  const oneWeekAgo = new Date(currentDate);
  oneWeekAgo.setDate(currentDate.getDate() - 7);
  const oneDayAgo = new Date(currentDate);
  oneDayAgo.setHours(currentDate.getHours() - 24)
  const oneHourAgo = new Date(currentDate);
  oneHourAgo.setHours(currentDate.getHours() - 1)

  let dPost = ePost

  if (timeSearch == "All Time" || "Time") {
    ePost = dPost
  }
  if (timeSearch == "Past Year") {
    ePost = dPost
    ePost = ePost.filter((p) => new Date(p.createdAt) >= oneYearAgo)

  }
  else if (timeSearch == "Past Month") {
    ePost = dPost
    ePost = ePost.filter((p) => new Date(p.createdAt) >= oneMonthAgo)

  }
  else if (timeSearch == "Past Week") {
    ePost = dPost
    ePost = ePost.filter((p) => new Date(p.createdAt) >= oneWeekAgo)

  }
  else if (timeSearch == "Past 24 Hours") {
    ePost = dPost
    ePost = ePost.filter((p) => new Date(p.createdAt) >= oneDayAgo)
  }
  else if (timeSearch == "Past Hour") {
    ePost = dPost
    ePost = ePost.filter((p) => new Date(p.createdAt) >= oneHourAgo)
  }

  let recent = []

  let cm = Object.values(memberships)

  recent = recent.reverse().sort((a, b) => a.createdAt - b.createdAt)

  recent = recent.slice(0, 5)



  const getTimeDifferenceString = (createdAt) => {
      const currentTime = new Date();
      const createdAtDate = new Date(createdAt);

      const timeDifferenceInSeconds = Math.floor((currentTime - createdAtDate) / 1000);

      if (timeDifferenceInSeconds < 60) {
        return timeDifferenceInSeconds === 1 ? `${timeDifferenceInSeconds} sec ago` : `${timeDifferenceInSeconds} secs ago`;
      } else if (timeDifferenceInSeconds < 3600) {
        const minutes = Math.floor(timeDifferenceInSeconds / 60);
        return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
      } else if (timeDifferenceInSeconds < 86400) {
        const hours = Math.floor(timeDifferenceInSeconds / 3600);
        return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
      } else if (timeDifferenceInSeconds < 2592000) {
        const days = Math.floor(timeDifferenceInSeconds / 86400);
        return days === 1 ? `${days} day ago` : `${days} days ago`;
      } else if (timeDifferenceInSeconds < 31536000) {
        const months = Math.floor(timeDifferenceInSeconds / 2592000);
        return months === 1 ? `${months} month ago` : `${months} months ago`;
      } else {
        const years = Math.floor(timeDifferenceInSeconds / 31536000);
        return years === 1 ? `${years} year ago` : `${years} years ago`;
      }
    };

    const myMemberships = Object.values(memberships)

    return (
        <div className="splashPage">
            <div style={{ gap: "0px"}} className="posts">
                <div style={{ height: "95px"}} >
                <div id="pick-search">
                    <button onClick={(() => history.push(`/search/:page/${search}`))} id="picked-S">Posts</button>
                    <button onClick={(() => history.push(`/search/comments/:page/${search}`))}>Comments</button>
                    <button onClick={(() => history.push(`/search/communities/:page/${search}`))}>Communities</button>
                    <button onClick={(() => history.push(`/search/profiles/:page/${search}`))}>People</button>
                </div>
                <div id="pick-sort">
                    <div ref={targetRef2}>
                    <button  style={{ background: sortbox ? "white" : "transparent"}} onClick={(() => setSortbox(!sortbox))}>{sortSearch}<i style={{ fontSize: "12px"}}class={ sortbox ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}></i></button>
                    { sortbox ? <div id="time-box">
                      <span onClick={(() => setSortSearch("Relevance"))} id={sortSearch == "Relevance" ? "timed" : "nottimed"}>Relevance</span>
                      <span onClick={(() => setSortSearch("Hot"))} id={sortSearch == "Hot" ? "timed" : "nottimed"}>Hot</span>
                      <span onClick={(() => setSortSearch("Top"))} id={sortSearch == "Top" ? "timed" : "nottimed"}>Top</span>
                      <span onClick={(() => setSortSearch("New"))} id={sortSearch == "New" ? "timed" : "nottimed"}>New</span>
                      <span onClick={(() => setSortSearch("Most Comments"))} id={sortSearch == "Most Comments" ? "timed" : "nottimed"}>Most Comments</span>
                    </div> : null }
                    </div>
                    <div ref={targetRef}>
                    <button style={{ background: timebox ? "white" : "transparent"}} onClick={(() => setTimebox(!timebox))}>{timeSearch}<i style={{ fontSize: "12px"}}class={ timebox ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}></i></button>
                    { timebox ? <div id="time-box">
                      <span onClick={(() => setTimeSearch("All Time"))} id={timeSearch == "All Time" ? "timed" : "nottimed"}>All Time</span>
                      <span onClick={(() => setTimeSearch("Past Year"))} id={timeSearch == "Past Year" ? "timed" : "nottimed"}>Past Year</span>
                      <span onClick={(() => setTimeSearch("Past Month"))} id={timeSearch == "Past Month" ? "timed" : "nottimed"}>Past Month</span>
                      <span onClick={(() => setTimeSearch("Past Week"))} id={timeSearch == "Past Week" ? "timed" : "nottimed"}>Past Week</span>
                      <span onClick={(() => setTimeSearch("Past 24 Hours"))} id={timeSearch == "Past 24 Hours" ? "timed" : "nottimed"}>Past 24 Hours</span>
                      <span onClick={(() => setTimeSearch("Past Hour"))} id={timeSearch == "Past Hour" ? "timed" : "nottimed"}>Past Hour</span>
                    </div> : null }
                    </div>
                </div>
                </div>
                { ePost.length > 0 && ePost?.map((post, i) =>
                    <div style={{ borderRadius: "0%"}} id={`${post.id}`} className="post-content">
                    <div style={{ marginLeft: "1.5%"}}></div>
                    <div style={{ margin: "1% 0%"}} id="pc-side2">
                    { post.PostImages?.length ? <div style={{ width: "70%"}}>
                    <div style={{ marginLeft: "1%"}} id="nameOf">
                    {post.Community?.CommunityStyle.icon ? <img style={{ margin: "0%" }} src={post.Community.CommunityStyle?.icon}></img> : <div style={{ backgroundColor: `${post.Community.CommunityStyle?.base}`, color: "white" }} id="pfp30">l/</div>}
                    <span style={{ fontWeight: "500"}} onClick={((e) => {
                      e.stopPropagation()
                      history.push(`/communities/${post.communityId}/:page`)})} className="userName" id="community">l/{post.Community.name}</span>
                    <p>·</p>
                    <p >Posted by <span onClick={((e) => {
                        e.stopPropagation()
                        post.userId !== user?.id ? history.push(`/profile2/${post.userId}/:page`) : history.push('/profile/:page')})} className="userName">u/{post.User.username}</span> {getTimeDifferenceString(post.createdAt)}</p>
                    </div>
                    <h3  style={{ padding: "0px", margin: "0px" , marginBottom: "1%", marginLeft: "0%"}} onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="title"><h3 style={{ fontSize: "16px" }} id="title-content">{post.title}{ post.tags && post.tags.includes("oc") ? <div id="oc5">OC</div> : null} {post.tags && post.tags.includes("spoiler") ? <span id="spoiler5">Spoiler</span> : null } { post.tags && post.tags.includes("nsfw") ? <span id="nsfw5">NSFW</span> : null}</h3></h3>
                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="content">
                    </div>
                    </div> :
                    <div style={{ width: "100%"}}>
                    <div style={{ marginLeft: "1%"}} id="nameOf">
                    {post.Community.CommunityStyle?.icon ? <img style={{ margin: "0%" }} onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} src={post.Community.CommunityStyle.icon}></img> : <div style={{ backgroundColor: `${post.Community.CommunityStyle.base}`, color: "white" }} onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="pfp30">l/</div>}
                    <span style={{ fontWeight: "500"}} onClick={(() => history.push(`/communities/${post.communityId}/:page`))} className="userName" id="community">l/{post.Community.name}</span>
                    <p>·</p>
                    { user?.id !== post.userId ? <p >Posted by <span onClick={((e) => {
              e.stopPropagation()
              history.push(`/profile2/${post.userId}/:page`)
            })}  className="userName">u/{post.User && post.User.username}</span> {getTimeDifferenceString(post.createdAt)}</p> :
            <p >Posted by <span onClick={((e) => {
              e.stopPropagation()
              history.push(`/profile/:page`)})}  className="userName">u/{post.User && post.User.username}</span> {getTimeDifferenceString(post.createdAt)}</p>}
                    </div>
                    <h3  style={{ padding: "0px", margin: "0px" , marginBottom: "1%", marginLeft: "0%"}} onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="title"><h3 style={{ fontSize: "16px" }} id="title-content">{post.title}{ post.tags && post.tags.includes("oc") ? <div id="oc5">OC</div> : null} {post.tags && post.tags.includes("spoiler") ? <span id="spoiler5">Spoiler</span> : null } { post.tags && post.tags.includes("nsfw") ? <span id="nsfw5">NSFW</span> : null}</h3></h3>
                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="content">
                    </div>
                    </div> }
                     <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))}id="img4">
                    {post.PostImages.length ? <img src={post.PostImages[0]?.imgURL} alt="meaningful-text"></img> : null}
                    </div>
                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))}id="post-extras50" >
                        <span>{post.Votes.length} upvotes</span>
                        <span>{post.Comments.length} comments</span>
                        <span>0 awards</span>

                    </div>
                    </div>
                    <div style={{ marginRight: "1.5%"}}></div>
                    </div>
                )}
                { !ePost.length && <div id="none-hereS" >
                    <img style={{ height: "130px", width: "130px"}} src={teleAlien}></img>
                    <span style={{ fontSize: "20px", fontWeight: "900"}}>Hm... we couldnt find any results for</span>
                    <span style={{ fontSize: "20px", fontWeight: "900"}}>"{search}"</span>
                    <span style={{ fontSize: "14px", width: "100%", textAlign: "center"}}>Double-check your spelling or try different keywords to <span onClick={handleButtonClick} style={{ color: "#0079D3", cursor: "pointer" }} >adjust your search</span></span>
                </div> }
            </div>
            <div style={{ gap: "0px"}} className="sidebar">
                <div id="nsfw-on">
                    {/* <span style={{ textAlign: "right"}} >Safe search<button>Toggle</button></span> */}
                </div>
                <div style={{ marginBottom: "14.5px"}} id="terms2">
                <div style={{ position: "relative"}} id="terms-9">
                <span style={{ fontSize: "16px", fontWeight: "900", height: "30px" }} >Communities</span>
                {otherCommunity.map((c) =>
                <>
                <div id="modss">
                    <div
                    style={{ height: "60px", alignItems: "center" }}>
                    {c.CommunityStyle?.icon ? <img id="tpfp" src={c.CommunityStyle?.icon}></img> : <div style={{ backgroundColor: `${c.CommunityStyle?.base}`}}id="nopfp">l/</div> }
                    <div id="modss20">
                    <span style={{fontWeight: "900"}} onClick={(() => history.push(`/communities/${c.id}/:page`))} id="justbold">l/{c.name}</span>
                    <span style={{color: "#7C7C7C"}} >{c.CommunityMembers} { c.CommunityMembers === 1 ? "member" : "members" }</span>
                    </div>
                    </div>
                    { !myMemberships.some((m) => m.id === c.id) ? <button onClick={(() => {
                      if (!user) return setModalContent(<SignupFormModal />)
                      dispatch(communitiesActions.thunkJoinCommunities(c.id))
                      //   setJoined(true)
                    })}
                    id="mod-butt5">Join</button> :
                    <button onClick={(() => {
                      dispatch(communitiesActions.thunkUnjoinCommunities(c.id))
                        })}
                        id="mod-butt5">Unjoin</button> }
                </div>
                { otherCommunity.length >= 5 && <div style={{ height: "1px", width: "100%", position: "absolute", backgroundColor: "#ccc", left: "0"}}></div>}
                </>
                )}
                {!otherCommunity.length ? <span style={{ fontSize: "16px"}}>No results</span> : null}
                </div>
              { otherCommunity.length >= 5 && <p style={{ textAlign: "left", marginLeft: "14px", marginTop: "8px", marginBottom: "16px" }} onClick={((e) => {
                        e.stopPropagation()
                        history.push('/search/communities/:page')
                        })}>See more communities</p>}
            </div>
            <div style={{ marginBottom: "14.5px"}} id="terms2">
            <div style={{ position: "relative"}} id="terms-9">
            <span style={{ fontSize: "16px", fontWeight: "900", height: "30px" }} >People</span>
            {otherProfiles.length > 0 && otherProfiles.map((c, i) =>
            <>
            <div  id="modss">
                <div
                style={{ height: "60px", alignItems: "center" }}>
                {c.CommunityStyle?.icon ? <img id="tpfp" src={c.CommunityStyle?.icon}></img> : <img id="tpfp" src={avatar}></img> }
               <div
               id="modss20">
               <span onClick={(() => history.push(`/profile2/${c.id}/:page`))} id="justbold">u/{c.name}</span>
               <span style={{color: "#7C7C7C"}} >{c.CommunityMembers} Karma</span>
               </div>
               </div>
                <button onClick={(() => {
                  window.alert("Feature not available")})}
                  id="mod-butt5">Follow</button>
            </div>
            { i !== otherProfiles.length - 1 && <div style={{ height: "1px", width: "100%", position: "absolute", backgroundColor: "#ccc", left: "0"}}></div>}
            </>
            )}
            {!otherProfiles.length ? <span style={{ fontSize: "16px"}}>No results</span> : null}
            </div>
            </div>
                <div className="home-section">
                <div style={{ height: "120px" }} id="hs-background"></div>
                <div style={{ padding: "0px", display: "flex", alignItems: "center"}} id="home-section">
                <div style={{ marginBottom: "50px", marginTop: "-32px" }} id="hs-side1">
                <img id="avatar2" src={alien} alt="avatar"></img>
                </div>
                <p style={{ textAlign: "center", marginBottom: "0px" }}>Have an idea for a new community?</p>
                { user ?
                <>
                <button style={{ width: "90%" }} onClick={(() => setModalContent(<CreateCommunity />))} id="but2">Create Community</button>
                </>
                :
                <>
                <button style={{ width: "90%" }} onClick={(() => setModalContent(<SignupFormModal />))} id="but2">Create Community</button>
                </> }
                </div>
                </div>
                { isVisible2 ? <button className={top} onClick={((e) => window.scrollTo({ top: 0, left: 0, behavior: "smooth"}))}>Back to Top</button> : null}
            </div>
        </div>
    )
}

export default SearchPage
