import * as postsActions from '../../store/posts'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import * as communitiesActions from "../../store/communities"
import './HomePage.css'
import pfp from './IMG6.jpg'
import avatar from  './imagedit2.png'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import PostPageModal from '../PostPage/PostPageModal'
import { useModal } from '../../context/Modal'
import CreateCommunity from '../CreateCommunityModel'
import PostLikes from './likes'
import MyCarousel from '../PostPage/postCrousel'
import { useFilter } from '../../context/filter'


function HomePage() {
    const { posts, singlePost, postsHistory } = useSelector((state) => state.posts);
    const { memberships } = useSelector((state) => state.communities);

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
    const { page } = useParams(); // Retrieve the page parameter from the URL
    const [ bestP, setBestP ] = useState(true)
    const [ hotP, setHotP ] = useState(false)
    const [ topP, setTopP ] = useState(false)
    const [ newP, setNewP ] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [threshold, setThreshold] = useState(450);

    let top = isVisible ? "top" : "down"

    // useEffect(() => {
    //   dispatch(postsActions.thunkGetHistory(page)); // Fetch posts for the specified page
    // }, [dispatch, page]);

    useEffect(() => {
      window.scrollTo(0, 0); // Scrolls to the top instantly when the page loads
    }, []);



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
      await dispatch(postsActions.thunkGetAllPosts(page))
      }
      fetchData()
  }, [singlePost.Comments, page])

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


    let ePost = Object.values(posts).reverse().sort((a, b) => a.createdAt - b.createdAt)

    // if (!ePost.length) return <h1 className="data-not-here"></h1>

    let recent = []

    let cm = Object.values(memberships)

    for (let c of cm ) {
      console.log(c)
      for ( let p of c.Posts ) recent.push(p)
    }

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



    return (
        <div className="splashPage">
            <div className="posts">
                { user ? <div className="create">
                { !user.Community?.CommunityStyle?.icon ? <img src={pfp} alt="pfp"></img> : null}
                { user.Community?.CommunityStyle?.icon ? <img src={user.Community.CommunityStyle?.icon} alt="pfp"></img> : null}
                    <input onClick={(() => history.push('/posts/new'))} type="text" placeholder="Create Post"></input>
                    <div><i onClick={(() => history.push('/posts/new/image'))} class="fi fi-rr-picture"></i></div>
                    <div><i onClick={(() => history.push('/posts/new/link'))} class="fi fi-rr-link-alt"></i></div>
                </div> :
                <div className="create">
                    <img src={pfp}></img>
                    <input onClick={(() => window.alert('Please login'))} type="text" placeholder="Create Post"></input>
                    <div><i onClick={(() => window.alert('Please login'))} class="fi fi-rr-picture"></i></div>
                    <div><i onClick={(() => window.alert('Please login'))} class="fi fi-rr-link-alt"></i></div>
                </div> }
                <div className="filter">
                <div id="filter-side1">
                <div onClick={(() => {
                  history.push("/")
                })} id="best">
                <i
                class="fi fi-sr-bow-arrow"></i>
                <p
                >Best</p>
                </div>
                <div  onClick={(() => {
                  history.push('/hot')
                })}id="best">
                <i
                class="fi fi-rs-flame"></i>
                <p
                >Hot</p>
                </div>
                <div style={{ backgroundColor: "#EDEFF1"}}
                onClick={(() => {
                  history.push("/recent")
                })}id="best">
                <i
                style={{ color: '#0079D3'}}
                class="fi fi-sr-bahai"></i>
                <p
                style={{ color: '#0079D3'}}
                >
                  New</p>
                </div>
                <div onClick={(() => {
                  history.push("/top")
                })} id="best">
                <i class="fi fi-ts-signal-bars-good"></i>
                <p
                >
                  Top</p>
                </div>
                <i class="fi fi-rr-menu-dots"></i>
                </div>
                <div onClick={(() => window.alert("Feature not avaliable"))} id="filter-side2">
                <i class="fi fi-rr-horizontal-rule"></i>
                <i class="fa-regular fa-square"></i>
                <i class="fa-solid fa-chevron-down"></i>
                </div>
                </div>
                {ePost?.map((post, i) =>
                    // <div id={`${post.id}`} onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={scrolling} />))} className="post-content">
                    <div id={`${post.id}`} className="post-content">
                    <div  onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="pc-side1">
                    <PostLikes post={post}
                    />
                    </div>
                    <div id="pc-side2">
                    <div id="nameOf">
                    {post.Community?.CommunityStyle?.icon ? <img onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} src={post.Community?.CommunityStyle?.icon}></img> : <div style={{ backgroundColor: `${post.Community?.CommunityStyle?.base}`, color: "white" }} onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="pfp30">l/</div>}
                    <span onClick={(() => history.push(`/communities/${post.communityId}/:page`))} className="userName" id="community">l/{post.Community?.name}</span>
                    <p>·</p>
                    <p style={{ marginLeft: "0px"}} id="cp">Posted by <span onClick={((e) => {
                        e.stopPropagation()
                        post.userId !== user.id ? history.push(`/profile2/${post.userId}/:page`) : history.push('/profile/:page')})} className="userName">u/{post.User?.username}</span> {getTimeDifferenceString(post.createdAt)}</p>                    </div>
                    <h3  id="p-tit" onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="title"><h3 id="title-content">{post.title}{ post.tags && post.tags.includes("oc") ? <div id="oc5">OC</div> : null} {post.tags && post.tags.includes("spoiler") ? <span id="spoiler5">Spoiler</span> : null } { post.tags && post.tags.includes("nsfw") ? <span id="nsfw5">NSFW</span> : null}</h3></h3>
                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="content">
                  {post.PostImages?.length !== 0 && <div id="img2">
                    {post.PostImages?.length === 1 ? <img style={{ maxWidth: "100%", maxHeight: "511px", alignSelf: "flex-end" }} src={post.PostImages[0]?.imgURL} alt="meaningful-text"></img> : <MyCarousel images={post.PostImages}/>}
                    </div>}
                    { post.description && <div style={{position: "relative"}} id="finishing2">
                      <span id="post-des">{post.description}</span>
                      { post.description.length > 140 && <div id="faded"></div>}
                      </div>}
                    </div>
                    <div id="post-extras9">
                    <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={true} />))} id="comment">
                    <i class="fa-regular fa-message"></i>
                    <p id={`${post.id}`} >{post.Comments ? Object.values(post.Comments)?.length : 0} Comments</p>
                    </div>
                    <div onClick={(() => window.alert('Feature coming soon'))} id="comment">
                    <i class="fi fi-rr-box-heart"></i>
                    <p>Awards</p>
                    </div>
                    <div onClick={(() => window.alert('Feature coming soon'))} id="comment">
                    <i class="fi fi-rs-heart-arrow"></i>
                    <p>Share</p>
                    </div>
                    <div onClick={(() => window.alert('Feature coming soon'))} id="comment">
                    <i class="fi fi-rr-bookmark"></i>
                    <p>Save</p>
                    </div>
                    <i onClick={(() => window.alert('Feature coming soon'))} class="fi fi-rr-menu-dots"></i>
                    </div>
                    </div>
                    </div>
                )}
            </div>
            <div className="sidebar">
                <div className="premium">
                    <div id="premium">
                    <i class="fa-solid fa-shield-halved"></i>
                    <div>
                    <h3> Luvddit premium</h3>
                    <p>The best luvddit experience</p>
                    </div>
                    </div>
                    <button onClick={(() => window.alert("Feature not available "))}>Try Now</button>
                </div>
                <div className="home-section">
                <div id="hs-background"></div>
                <div id="home-section">
                <div id="hs-side1">
                <img id="avatar" src={avatar} alt="avatar"></img>
                <h3>Home</h3>
                </div>
                <p>Your personal Reddit frontpage. Come here to check in with your favorite communities.</p>
                <div id="line"></div>
                { user ?
                <>
                <button onClick={(() => history.push('/posts/new'))} id="but1">Create Post</button>
                <button onClick={(() => setModalContent(<CreateCommunity />))} id="but2">Create Community</button>
                </>
                :
                <>
                <button onClick={(() => window.alert('Please login'))} id="but1">Create Post</button>
                <button onClick={(() => window.alert("Please login"))} id="but2">Create Community</button>
                </> }
                </div>
                </div>
                <div className='recent-posts'>
                    <span>RECENT POSTS</span>
                    {recent.map((r, i) =>
                    <>
                    <div onClick={(() => setModalContent(<PostPageModal postId={r.id} />))}>
                   {r.PostImages.length && r.PostImages[0].imgURL ? <img src={r.PostImages[0].imgURL}></img> : <i class="fi fi-rr-notebook"></i> }
                        <div>
                        <div>
                        <span>{r.title}</span>
                        </div>
                        <span>{r.User.karma} points · {r.Comments.length} Comments · {getTimeDifferenceString2(r.createdAt)}</span>
                        </div>
                    </div>
                        { i !== 4 ? <div id="line"></div> : null}
                    </>
                    )}
                    <span id="span2">Clear</span>
                </div>
                <div id="terms">
                    <div id="terms-1">
                    <div>
                    <p>User Agreement</p>
                    <p>Privacy Policy</p>
                    </div>
                    <div>
                    <p>Content Policy</p>
                    <p>Moderator Code Of <br></br>
                        Conduct</p>
                    </div>
                    </div>
                    <div id="line"></div>
                    <div id="terms-2">
                    <div>
                    <p>English</p>
                    <p>Francias</p>
                    <p>Italiano</p>
                    </div>
                    <div>
                    <p>Deutsch</p>
                    <p>Espanol</p>
                    <p>Portuguse</p>
                    </div>
                    </div>
                    <div id="line"></div>
                    <p>Luvddit, Inc. © 2023. All rights reserved.</p>
                </div>
                { isVisible2 ? <button className={top} onClick={((e) => window.scrollTo({ top: 0, left: 0, behavior: "smooth"}))}>Back to Top</button> : null}
            </div>
        </div>
    )
}

export default HomePage
