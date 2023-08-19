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

function CommunityPage() {
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
    const [ isMember, setIsMember ] = useState(false)


    let top = isVisible ? "top" : "down"

    const memberships = Object.values(communityMemberships)

    const member = memberships.filter((m) => m.communityId === singleCommunity.id)

    useEffect(() => {

      async function fetchData() {
        let data = await dispatch(postsActions.thunkGetUserVotes())
        setIsLiked(data)
        }
        fetchData()

    }, [dispatch, posts])

    const handleJoinClick = async () => {
        let response
        await dispatch(communityActions.thunkJoinCommunities(singleCommunity.id))
    }

    const handleUnjoinClick = async () => {
      let response
      response = await dispatch(communityActions.thunkUnjoinCommunities(singleCommunity.id))
      console.log(response)
    }




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

    useEffect(() => {
        dispatch(communityActions.thunkGetDetailsById(id))
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
        <>
        <div className="community-page-header">
        <div id="community-page-header"></div>
        <div id="community-page-title">
            <div id="community-title-head">
            <div id="comm-pfp">l/</div>
            <div id="communityName">
                {singleCommunity.name}
                <span>l/{singleCommunity.name}</span>
            </div>
            {member.length ? <button onClick={handleUnjoinClick} id="joined">Joined</button> : <button onClick={handleJoinClick} id="join">Join</button> }
            </div>
        </div>
        </div>
        <div className="community-page-content">

        </div>
        <div className="community-page-content">
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
                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} />))} id={`${post.id}`} className="post-content">
                    <div id="pc-side1">
                    <PostLikes post={post}
                    vote={isLiked.length && isLiked.some((l) => l.postId === post.id && l.upVote === 1)}
                    downVote={isLiked.length && isLiked.some((l) => l.postId === post.id && l.downVote === 1)}/>
                    </div>
                    <div id="pc-side2">
                    <div id="nameOf">
                    {/* <img src={pfp}></img> */}
                    <p>Posted by <span className="userName">u/{post.User?.username}</span> {getTimeDifferenceString(post.createdAt)}</p>
                    </div>
                    <h3 id="title6">{post.title}</h3>
                    <div id="content">
                    <div id="img">
                    {post.PostImages?.length ? <img src={post.PostImages[0]?.imgURL} alt="meaningful-text"></img> : null}
                    </div>
                    </div>
                    <div onClick={((e) => e.stopPropagation())} id="post-extras">
                    <div id="comment">
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
                    </div>
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
                <button onClick={(() => history.push('/posts/new'))} id="but4"><i class="fi fi-rr-envelope"></i> Message the mods</button>
                <div id="cs-side6">
                    <span>{user.username}</span>
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
