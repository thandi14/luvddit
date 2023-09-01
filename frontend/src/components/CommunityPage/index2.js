import { useSelector, useDispatch } from "react-redux"
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import * as communityActions from "../../store/communities"
import { useEffect, useState } from "react";
import './CommunityPage.css'
import avatar from "./imagedit2.png"
import pfp from "./IMG6.jpg"
import YourCommunitesProfile from "./communites3";
import { useModal } from "../../context/Modal";
import PostPageModal from "../PostPage/PostPageModal";
import * as postsActions from '../../store/posts'
import PostLikes from "../HomePage/likes";
import Navigation from "../Navigation";

function CommunityPageEdit() {
  const { id } = useParams();
  const { communities, singleCommunity, communityMemberships } = useSelector((state) => state.communities);
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.session);
  const { setModalContent } = useModal()
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const history = useHistory()
  const [ isLiked, setIsLiked ] = useState([]);
  const [ joined, setJoined ] = useState(null)
  const [ scrolling, setScrolling ] = useState(false)
  const [ icon, setIcon ] = useState(false)
  const [ banner, setBanner ] = useState(false)
  const [ body, setBody ] = useState(false)


  const handleIcon = () => {
    setIcon(true)
    setBanner(false)
    setBody(false)
  }

  const handleBanner = () => {
    setIcon(false)
    setBanner(true)
    setBody(false)
  }

  const handleBody = () => {
    setIcon(false)
    setBanner(false)
    setBody(true)
  }

  const handleAll = () => {
    setIcon(false)
    setBanner(false)
    setBody(false)
  }

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top instantly when the page loads
  }, []);

  useEffect(() => {

    async function fetchData() {
      if (id) await dispatch(communityActions.thunkGetCommunityMemberships())
      else return
    }

    fetchData()

    const member = memberships.filter((m) => m.communityId === singleCommunity.id)
    if (member) setJoined(true)
    if (!member) setJoined(false)

  }, [dispatch])

  useEffect(() => {

    async function fetchData() {
      if (id) await dispatch(communityActions.thunkGetDetailsById(id))
      else return
    }

    fetchData()



  }, [dispatch])

  useEffect(() => {

    async function fetchData() {
      let data = await dispatch(postsActions.thunkGetUserVotes())
      setIsLiked(data)
    }

    fetchData()

  }, [dispatch])

  let top = isVisible ? "top" : "down"

  const memberships = Object.values(communityMemberships)
  const member = memberships.filter((m) => m.communityId === singleCommunity.id)

  const handleJoinClick = async () => {
    let response
    setJoined(true)
    await dispatch(communityActions.thunkJoinCommunities(singleCommunity.id))

  }

  const handleUnjoinClick = async () => {
    let response
    setJoined(false)
    response = await dispatch(communityActions.thunkUnjoinCommunities(singleCommunity.id))
  }




  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 450) {
        setIsVisible2(false)

      }
      else if (window.scrollY > 460) {
        setIsVisible(true);
        setIsVisible2(true);

      }
      else {
        setIsVisible(false);

      }
      };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };


  }, [])

  if (!Object.values(singleCommunity).length) return <h1 className="data-not-here">Loading...</h1>

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

  const getTimeDifferenceString2 = (createdAt) => {
    const currentTime = new Date();
    const createdAtDate = new Date(createdAt);

    const timeDifferenceInSeconds = Math.floor((currentTime - createdAtDate) / 1000);

    if (timeDifferenceInSeconds < 60) {
      return timeDifferenceInSeconds === 1 ? `${timeDifferenceInSeconds} sec` : `${timeDifferenceInSeconds} secs`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} mins`
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return hours === 1 ? `${hours} hr` : `${hours} hrs`;
    } else {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days} d`;
    }
  };


  let ePost = singleCommunity.Posts?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));




    return (
        <div id="fifty">
        <div id="edit-page-menu">
            <div id="twenty">
            <span id="a"><i onClick={handleAll} class="fi fi-br-angle-left"></i><span id="d">Back to mod tools</span><i onClick={(() => history.push(`/communities/${id}`))} class="fi fi-rr-cross-small"></i></span>
           {icon ?
           <>
           <span id="b">Name & icon</span>
            <div>
                <span id="e">Community Icon <input placholder="Feature not availble"></input></span>
            </div>
           </>
            : null}
            {banner ?
            <>
            <span id="b">Banner</span>
            <div>
                <span id="e">Background<input placholder="Feature not availble"></input></span>
            </div>
            </> : null}
            {body ?
            <>
            <span id="b">Color theme</span>
            <div>
                <span id="e">Body Background<input placholder="Feature not availble"></input></span>
            </div>
            </> : null}
            { !icon && !banner && !body ?
            <>
                <span id="b">Apperance</span>
            <div>
                <span onClick={handleBody}>Color theme<i class="fi fi-br-angle-right"></i></span>
                <span onClick={handleIcon}>Name & Icon<i class="fi fi-br-angle-right"></i></span>
                <span onClick={handleBanner}>Banner<i class="fi fi-br-angle-right"></i></span>
            </div>
            <span id="c">RESET TO DEFAULTS</span>
            </>
            : null}
            </div>
        </div>
        <div id="edit page">
            <Navigation />
        <div className="community-page-header2">
        <div id="community-page-header"></div>
        <div id="community-page-title">
            <div id="community-title-head">
            <div id="comm-pfp">l/</div>
            <div id="communityName">
                {singleCommunity.name}
                <span>l/{singleCommunity.name}</span>
            </div>
            {member.length && joined ? <button onClick={handleUnjoinClick} id="joined">Joined</button> : <button onClick={handleJoinClick} id="join">Join</button> }
            </div>
        </div>
        </div>
        <div className="community-page-content">

        </div>
        <div className="community-page-content2">
            <div className="posts">
                <div className="create">
                    <img src={pfp}></img>
                    <input onClick={(() => history.push('/posts/new'))} type="text" placeholder="Create Post"></input>
                    <div><i onClick={(() => history.push('/posts/new/image'))} class="fi fi-rr-picture"></i></div>
                    <div><i onClick={(() => history.push('/posts/new/link'))} class="fi fi-rr-link-alt"></i></div>
                </div>
                <div className="filter">
                <div id="filter-side1">
                <div id="best">
                <i class="fi fi-rs-flame"></i>
                <p>Hot</p>
                </div>
                <div id="best">
                <i class="fi fi-rr-bahai"></i>
                <p>New</p>
                </div>
                <div id="best">
                <i class="fi fi-rs-signal-bars-good"></i>
                <p>Top</p>
                </div>
                <i class="fi fi-rr-menu-dots"></i>
                </div>
                <div id="filter-side2">
                <i class="fi fi-rr-horizontal-rule"></i>
                <i class="fa-regular fa-square"></i>
                <i class="fa-solid fa-chevron-down"></i>
                </div>
                </div>
                {ePost?.map((post) =>
                    <div className="post-content">
                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={true} />))} id="pc-side1">
                    <PostLikes post={post}
                    vote={isLiked.length && isLiked.some((l) => l.postId === post.id && l.upVote === 1)}
                    downVote={isLiked.length && isLiked.some((l) => l.postId === post.id && l.downVote === 1)}/>
                    </div>
                    <div id="pc-side2">
                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={scrolling} />))} id="nameOf">
                    {/* <img src={pfp}></img> */}
                    <p>Posted by <span className="userName">u/{post.User?.username}</span> {getTimeDifferenceString(post.createdAt)}</p>
                    </div>
                    <h3 onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={scrolling} />))}  id="title6">{post.title}</h3>
                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={scrolling} />))} id="content">
                    <div id="img">
                    {post.PostImages?.length ? <img src={post.PostImages[0]?.imgURL} alt="meaningful-text"></img> : null}
                    </div>
                    </div>
                    {post.User.id !== user.id ?<div id="post-extras3">
                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={true} />))} id="comment">
                    <i class="fa-regular fa-message"></i>
                    <p >{post.Comments?.length} Comments</p>
                    </div>
                    <div id="comment">
                    <i class="fi fi-rr-box-heart"></i>
                    <p>Awards</p>
                    </div>
                    <div id="comment">
                    <i class="fi fi-rs-heart-arrow"></i>
                    <p>Share</p>
                    </div>
                    <div id="comment">
                    <i class="fi fi-rr-bookmark"></i>
                    <p>Save</p>
                    </div>
                    <i class="fi fi-rr-menu-dots"></i>
            </div> :
                    <div id="post-extras">
                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={true} />))} id="comment">
                    <i class="fa-regular fa-message"></i>
                    <p>{post.Comments.length}</p>
                    </div>
                    <div id="comment">
                    <i class="fi fi-rs-heart-arrow"></i>
                    <p>Share</p>
                    </div>
                    <div id="comment">
                    <i class="fi fi-rs-check-circle"></i>
                    <p>Approved</p>
                    </div>
                    <div id="comment">
                    <i class="fi fi-rs-circle-cross"></i>
                    <p>Removed</p>
                    </div>
                    <div id="comment">
                    <i class="fi fi-rr-box"></i>
                    <p>Spam</p>
                    </div>
                    <div id="comment">
                    <i class="fi fi-rs-shield"></i>
                    </div>
                    <i class="fi fi-rr-menu-dots"></i>
                    </div>}
                    </div>
                    </div>
                )}
            </div>
            <div className="sidebar">


                <YourCommunitesProfile />
                <div className="home-section">
                <div id="cs-background">
                    <p>Moderators</p>
                </div>
                <div id="home-section">
                <button onClick={(() => history.push(`/posts/new/${singleCommunity.id}`))} id="but4"><i class="fi fi-rr-envelope"></i> Message the mods</button>
                <div id="cs-side6">
                    <span>{user.username}</span>
                    <span>VIEW ALL MODERATORS</span>
                </div>
                </div>

                </div>

                { isVisible2 ? <button className={top} onClick={((e) => window.scrollTo({ top: 0, left: 0, behavior: "smooth"}))}>Back to Top</button> : null}
            </div>
        </div>

        </div>
        </div>
    )
}


export default CommunityPageEdit
