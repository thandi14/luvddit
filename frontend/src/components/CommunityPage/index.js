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
import NoPosts from "../YourProfilePage/none";

function CommunityPage() {
  const { id } = useParams();
  const { communities, communityMemberships, singleCommunity, memberships } = useSelector((state) => state.communities);
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.session);
  const { setModalContent } = useModal()
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const history = useHistory()
  const [ isLiked, setIsLiked ] = useState([]);
  let joined = null
  const [ scrolling, setScrolling ] = useState(false)
  const [singleCommunityName, setSingleCommunityName] = useState(singleCommunity.name)

  console.log(singleCommunity)

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top instantly when the page loads
  }, []);

  useEffect(() => {
      setSingleCommunityName(singleCommunity.name)

  }, [singleCommunity.name]);

  const myMemberships = Object.values(memberships)
  const member = myMemberships.filter((m) => m.id === singleCommunity.id)

  

  if (member) joined = true
  if (!member.length) joined = false

  let ePost

  ePost = Object.values(posts)


  ePost = ePost.filter((p) => p.communityId === singleCommunity.id)

  ePost = ePost.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {

    async function fetchData() {
      if (id) await dispatch(communityActions.thunkGetDetailsById(id))
      else return
    }

    fetchData()

  }, [dispatch, id])

  useEffect(() => {

    async function fetchData() {
    let data = await dispatch(postsActions.thunkGetUserVotes())
      setIsLiked(data)
    }

    fetchData()

  }, [dispatch, id])

  let top = isVisible ? "top" : "down"


  const handleJoinClick = async () => {
    let response
    joined = true
    if (singleCommunity.type === "Public") await dispatch(communityActions.thunkJoinCommunities(singleCommunity.id))
    if (singleCommunity.type === "Private" || singleCommunity.type === "Restricted") await dispatch(communityActions.thunkJoinCommunities(singleCommunity.id, singleCommunity.type))
  }

  const handleUnjoinClick = async () => {
    let response
    joined = false
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

  if (!Object.values(singleCommunity).length) return <h1 className="data-not-here"></h1>

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

    let style
    if (singleCommunity.communityStyles && singleCommunity.communityStyles.length) style = singleCommunity.communityStyles[0]



    return (
        <>
        <div className="community-page-header">
       { style ? <div style={{
        width: '100%',
        height: '200px',
        backgroundImage: `url(${style.header})`, // Replace with the actual path to your image
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        }}></div> :
        <div id="community-page-header"></div> }
        <div id="community-page-title">
            <div id="community-title-head">
            { style ? <img id="img-pfp"src={style.profile}></img> : <div id="comm-pfp">l/</div> }
            <div id="communityName">
                {singleCommunity.name}
                <span>l/{singleCommunityName}</span>
            </div>
            {user && myMemberships.length && joined ? <button onClick={handleUnjoinClick} id="joined"></button> : <button onClick={handleJoinClick} id="join">Join</button> }
            </div>
        </div>
        {user && singleCommunity.userId !== user.id ? <div id="comm-head11">
        <p>Posts</p>
        </div> : null}
        </div>
        <div className="community-page-content">

        </div>
        <div className="community-page-content">
            <div className="posts">
                {user ? <div className="create">
                    <img src={pfp}></img>
                    <input onClick={(() => history.push('/posts/new'))} type="text" placeholder="Create Post"></input>
                    <div><i onClick={(() => history.push('/posts/new/image'))} class="fi fi-rr-picture"></i></div>
                    <div><i onClick={(() => history.push('/posts/new/link'))} class="fi fi-rr-link-alt"></i></div>
                </div> :
                <div onClick={(() => window.alert("Please login"))} className="create">
                    <img src={pfp}></img>
                    <input type="text" placeholder="Create Post"></input>
                    <div><i class="fi fi-rr-picture"></i></div>
                    <div><i class="fi fi-rr-link-alt"></i></div>
                </div> }
                <div className="filter">
                <div onClick={(() => window.alert("Feature coming soon"))} id="filter-side1">
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
                {ePost && !ePost.length ? <NoPosts name={"posted"} /> : ePost.map((post) =>
                    <div className="post-content">
                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={true} />))} id="pc-side1">
                    <PostLikes post={post}
                   />
                    </div>
                    <div id="pc-side2">
                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={scrolling} />))} id="nameOf">
                    {/* <img src={pfp}></img> */}
                    <p id="cp">Posted by <span className="userName">u/{post.User?.username}</span> {getTimeDifferenceString(post.createdAt)}</p>
                    </div>
                    <h3  id="p-tit" onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="title"><h3 id={singleCommunity.userId === post.userId ? "title-content2" : "title-content"}>{post.title}<span>{ post.tags && post.tags.includes("oc") ? <div id="oc5">OC</div> : null} {post.tags && post.tags.includes("spoiler") ? <span id="spoiler5">Spoiler</span> : null } { post.tags && post.tags.includes("nsfw") ? <span id="nsfw5">NSFW</span> : null}</span></h3></h3>                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={scrolling} />))} id="content">
                    <div id="img">
                    {post.PostImages?.length ? <img src={post.PostImages[0]?.imgURL} alt="meaningful-text"></img> : null}
                    </div>
                    <div id={singleCommunity.userId === post.userId ? "finishing60" : "finishing2"}>
                      {post.description}
                      </div>
                    </div>
                    {user && post.User?.id !== user.id ?<div id="post-extras9">
                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={true} />))} id="comment">
                    <i class="fa-regular fa-message"></i>
                    <p >{post.Comments?.length} Comments</p>
                    </div>
                    <div onClick={(() => window.alert('Feature not available'))}id="comment">
                    <i class="fi fi-rr-box-heart"></i>
                    <p>Awards</p>
                    </div>
                    <div onClick={(() => window.alert('Feature not available'))}id="comment">
                    <i class="fi fi-rs-heart-arrow"></i>
                    <p>Share</p>
                    </div>
                    <div onClick={(() => window.alert('Feature not available'))}id="comment">
                    <i onClick={(() => window.alert('Feature not available'))}class="fi fi-rr-bookmark"></i>
                    <p>Save</p>
                    </div>
                    <i onClick={(() => window.alert('Feature not available'))}class="fi fi-rr-menu-dots"></i>
            </div> :
                    <div id="post-extras9">
                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={true} />))} id="comment">
                    <i class="fa-regular fa-message"></i>
                    <p>{post.Comments.length}</p>
                    </div>
                    <div onClick={(() => window.alert('Feature not available'))}id="comment">
                    <i class="fi fi-rs-heart-arrow"></i>
                    <p>Share</p>
                    </div>
                    <div onClick={(() => window.alert('Feature not available'))}id="comment">
                    <i class="fi fi-rs-check-circle"></i>
                    <p>Approved</p>
                    </div>
                    <div onClick={(() => window.alert('Feature not available'))}id="comment">
                    <i class="fi fi-rs-circle-cross"></i>
                    <p>Removed</p>
                    </div>
                    <div onClick={(() => window.alert('Feature not available'))}id="comment">
                    <i class="fi fi-rr-box"></i>
                    <p>Spam</p>
                    </div>
                    <div onClick={(() => window.alert('Feature not available'))} id="comment">
                    <i class="fi fi-rs-shield"></i>
                    </div>
                    <i onClick={(() => window.alert('Feature not available'))} class="fi fi-rr-menu-dots"></i>
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
                <button onClick={(() => window.alert("Feature not available"))} id="but4"><i class="fi fi-rr-envelope"></i> Message the mods</button>
                <div onClick={(() => window.alert('Feature not available'))} id="cs-side6">
                    {user ? <span>{singleCommunity.User?.username}</span> : "" }
                    <span>VIEW ALL MODERATORS</span>
                </div>
                </div>

                </div>

                { isVisible2 ? <button className={top} onClick={((e) => window.scrollTo({ top: 0, left: 0, behavior: "smooth"}))}>Back to Top</button> : null}
            </div>
        </div>

        </>
    )
}


export default CommunityPage
