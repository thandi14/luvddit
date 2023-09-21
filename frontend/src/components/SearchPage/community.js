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
import YourCommunitesProfile from '../CommunityPage/communites3'

function SearchCommunityPage() {
    const { posts, singlePost, postsHistory, searchs } = useSelector((state) => state.posts);
    const { communities, memberships, searchPosts, singleCommunity } = useSelector((state) => state.communities);
    // const [ search, setSearch ] = useState(null)
    const { user } = useSelector((state) => state.session);
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(true);
    const [ votePost, setVotePost ] = useState(null);
    const [ isLiked, setIsLiked ] = useState([]);
    const history = useHistory()
    const { setModalContent } = useModal()
    const [ scrolling, setScrolling ] = useState(null)
    const targetRef = useRef()
    const { id } = useParams(); // Retrieve the page parameter from the URL
    const { page } = useParams(); // Retrieve the page parameter from the URL
    const { search } = useParams()
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPage2, setCurrentPage2] = useState(1);
    const [threshold, setThreshold] = useState(450);

    useEffect(() => {
      localStorage.setItem("currentPage", currentPage.toString());
    }, [currentPage, search]);

    useEffect(() => {

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };

    }, [currentPage, search]);

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      if (windowHeight + scrollTop >= documentHeight - threshold) {
        const storedCurrentPage = localStorage.getItem("currentPage");

        setCurrentPage(currentPage + 1);
        setThreshold(threshold + 200);
        dispatch(communitiesActions.thunkGetSearchedCommunitiyPosts(id, currentPage, search)); // Fetch posts for the specified page

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
       await dispatch(communitiesActions.thunkGetSearchedCommunitiyPosts(id, page, search)); // Fetch posts for the specified page
      }
      fetchData()
  }, [page, search, id])

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

    let ePost = Object.values(searchPosts).reverse().sort((a, b) => a.createdAt - b.createdAt)
    if (search) ePost = ePost.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    if (ePost.length === 0 && search) ePost = []
    if (ePost) ePost = ePost.filter((p) => p.communityId == id)
    let recent = []

    let cm = Object.values(memberships)

    // for (let c of cm ) {
    //   for ( let p of c.Posts ) recent.push(p)
    // }

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

      const handleButtonClick = () => {
        document.getElementById('nfo').focus(); // Assuming your input has an id of 'myInput'
      };



    return (
        <div className="splashPage">
            <div style={{ gap: "0px"}} className="posts">
                <div style={{ height: "92px"}} >
                <div id="pick-search">
                    <button onClick={(() => history.push(`/search2/community/${singleCommunity.id}/:page/${search}`))} id="picked-S">Posts</button>
                    <button onClick={(() => history.push(`/search2/comments/${singleCommunity.id}/:page/${search}`))}>Comments</button>
                    <span style={{ cursor: "pointer", display: "flex", gap: "5px", }}>Show results from <span onClick={(() => history.push(`/search/:page/${search}`))} style={{ fontWeight: "900", color: "#0079D3" }}>all of luvddit</span><i onClick={(() => history.push(`/search/:page/${search}`))} style={{ height: "20px", fontSize: "20px", color: "#0079D3"}} class="fi fi-rr-arrow-right"></i></span>
                </div>
                <div onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))} id="pick-sort">
                    <button>Sort<i style={{ fontSize: "12px"}} class="fa-solid fa-chevron-down"></i></button>
                    <button>Time<i style={{ fontSize: "12px"}}class="fa-solid fa-chevron-down"></i></button>
                </div>
                </div>
                { ePost.length > 0 && ePost?.map((post, i) =>
                    <div style={{ borderRadius: "0%"}} id={`${post.id}`} onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} className="post-content">
                    <div style={{ marginLeft: "1.5%"}}></div>
                    <div style={{ margin: "1% 0%"}} id="pc-side2">
                    { post.PostImages?.length ? <div style={{ width: "70%"}}>
                    <div style={{ marginLeft: "1%"}} id="nameOf">
                    {post.Community?.CommunityStyle.icon ? <img style={{ margin: "0%" }} onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} src={post.Community.CommunityStyle?.icon}></img> : <div style={{ backgroundColor: `${post.Community.CommunityStyle?.base}`, color: "white" }} onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="pfp30">l/</div>}
                    <span style={{ fontWeight: "500"}} onClick={(() => history.push(`/communities/${post.communityId}/:page`))} className="userName" id="community">l/{post.Community.name}</span>
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
                    <p >Posted by <span onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))} className="userName">u/{post.User.username}</span> {getTimeDifferenceString(post.createdAt)}</p>
                    </div>
                    <h3  style={{ padding: "0px", margin: "0px" , marginBottom: "1%", marginLeft: "0%"}} onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="title"><h3 style={{ fontSize: "16px" }} id="title-content">{post.title}{ post.tags && post.tags.includes("oc") ? <div id="oc5">OC</div> : null} {post.tags && post.tags.includes("spoiler") ? <span id="spoiler5">Spoiler</span> : null } { post.tags && post.tags.includes("nsfw") ? <span id="nsfw5">NSFW</span> : null}</h3></h3>
                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="content">
                    </div>
                    </div> }
                     <div id="img4">
                    {post.PostImages.length ? <img src={post.PostImages[0]?.imgURL} alt="meaningful-text"></img> : null}
                    </div>
                    <div id="post-extras50" >
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
                    <span style={{ fontSize: "14px", width: "100%", textAlign: "center"}}>Double-check your spelling or try different keywords to <span onClick={handleButtonClick} style={{ cursor: "pointer", color: "#0079D3" }} >adjust your search</span></span>
                </div> }
            </div>
            <div style={{ gap: "0px"}} className="sidebar">
            <div id="nsfw-on">
                    {/* <span style={{ textAlign: "right"}} >Safe search<button>Toggle</button></span> */}
                </div>
                <YourCommunitesProfile />
                { isVisible2 ? <button style={{ backgroundColor: `${singleCommunity.CommunityStyle?.highlight}`}} className={top} onClick={((e) => window.scrollTo({ top: 0, left: 0, behavior: "smooth"}))}>Back to Top</button> : null}
            </div>
        </div>
    )
}

export default SearchCommunityPage
