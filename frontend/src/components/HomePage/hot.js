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
import SignupFormModal from '../SignupFormPage'
import Cookies from 'js-cookie';


function HotPage() {
    const { posts, singlePost, hotPosts } = useSelector((state) => state.posts);
    const { memberships } = useSelector((state) => state.communities);
    const { user } = useSelector((state) => state.session);
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [ isLiked, setIsLiked ] = useState([]);
    const history = useHistory()
    const { setModalContent, setScroll } = useModal()
    const { page } = useParams(); // Retrieve the page parameter from the URL
    const { filter, setFilter } = useFilter()
    const targetRef = useRef()
    const [ hiddenBox, setHiddenbox ] = useState(false)
    const [ hiddenPost, setHiddenPost ] = useState(null)

    let top = isVisible ? "top" : "down"

    useEffect(() => {
      window.scrollTo(0, 0); // Scrolls to the top instantly when the page loads
    }, []);

    const clearButton = () => {
      const clearTime = new Date().toISOString(); // Get the current timestamp
      Cookies.set(`${user.id}`, clearTime, { expires: 365 }); // Set a cookie that expires in 365 days
  };

  const userClearTime = Cookies.get(user?.id)

  const handleSaved = async (id) => {
    if (!user) return setModalContent(<SignupFormModal />)
    await dispatch(postsActions.thunkCreateSaved(id))
  }

  const handleSaved2 = async (id) => {
    if (!user) return setModalContent(<SignupFormModal />)
    await dispatch(postsActions.thunkUpdateSaved(id))
  }

  const handleUnsaved = async (id) => {
    await dispatch(postsActions.thunkUpdateSaved2(id))
  }

  const handleHide = async (id) => {
    if (!user) return setModalContent(<SignupFormModal />)
    await dispatch(postsActions.thunkCreateHidden(id))
  }

  const handleHide2 = async (id) => {
    if (!user) return setModalContent(<SignupFormModal />)
    await dispatch(postsActions.thunkUpdateHidden(id))
  }

  const handleUnhide = async (id) => {
    await dispatch(postsActions.thunkUpdateHidden2(id))
  }
  useEffect(() => {
    async function fetchData() {
      let data
      if (user) data = await dispatch(postsActions.thunkGetUserVotes())
      setIsLiked(data)
      }
      fetchData()

  }, [dispatch, posts, user])

  useEffect(() => {

    const handleDocumentClick = (event) => {
        if ((targetRef.current && !targetRef.current.contains(event.target))) {
            setHiddenbox(false);

          }

      };

      document.addEventListener('click', handleDocumentClick);
      return () => {
          document.removeEventListener('click', handleDocumentClick);
      };

    }, []);


  useEffect(() => {
    async function fetchData() {
      await dispatch(postsActions.thunkGetHotPosts(page))
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


    let ePost = Object.values(hotPosts).sort((a, b) => b.Votes?.length - a.Votes?.length)

    // if (!ePost.length) return <h1 className="data-not-here"></h1>



    let recent = []

    if (user && Object.values(memberships).length) {
      let cm = Object.values(memberships)
      let rp = Object.values(posts).sort((a, b) => b.createdAt - a.createdAt)

      for ( let p of rp )
        for (let c of cm ) {
          if (c.name == p.Community?.name) {
              recent.push(p)
          }
      }

    }
    else {
      recent = []
    }
    if (!recent.length) recent = []

    if (recent.length) recent = recent.reverse().sort((a, b) => a.createdAt - b.createdAt)
    if (userClearTime) recent = recent.filter((r) => r.createdAt > userClearTime)
    if (recent.length) recent = recent.slice(0, 5)



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
                { !user.Community?.CommunityStyle?.icon ? <img onClick={(() => history.push('/profile/:page'))} src={pfp} alt="pfp"></img> : null}
                { user.Community?.CommunityStyle?.icon ? <img onClick={(() => history.push('/profile/:page'))} src={user.Community.CommunityStyle?.icon} alt="pfp"></img> : null}
                    <input onClick={(() => history.push('/posts/new'))} type="text" placeholder="Create Post"></input>
                    <div><i onClick={(() => history.push('/posts/new/image'))} class="fi fi-rr-picture"></i></div>
                    <div><i onClick={(() => history.push('/posts/new/link'))} class="fi fi-rr-link-alt"></i></div>
                </div> :
                <div className="create">
                    <img src={pfp}></img>
                    <input onClick={(() => setModalContent(<SignupFormModal />))} type="text" placeholder="Create Post"></input>
                    <div><i onClick={(() => setModalContent(<SignupFormModal />))} class="fi fi-rr-picture"></i></div>
                    <div><i onClick={(() => setModalContent(<SignupFormModal />))} class="fi fi-rr-link-alt"></i></div>
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
                <div style={{ backgroundColor: "#EDEFF1"}} className={  filter === "hot" ? "filtered" : ""} onClick={(() => {
                  history.push("hot")
                })}id="best">
                <i
                style={{ color: '#0079D3'}}
                class="fi fi-sr-flame"></i>
                <p
                 style={{ color: '#0079D3' }}
                >Hot</p>
                </div>
                <div
                onClick={(() => {
                  history.push("/recent")
                })}id="best">
                <i
                class="fi fi-rr-bahai"></i>
                <p
                >
                  New</p>
                </div>
                <div onClick={(() => {
                  history.push("/top")
                  setFilter("top")
                })} id="best">
                <i class="fi fi-ts-signal-bars-good"></i>
                <p
                >
                  Top</p>
                </div>
                <i onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))} class="fi fi-rr-menu-dots"></i>
                </div>
                <div onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))} id="filter-side2">
                <i class="fi fi-rr-horizontal-rule"></i>
                <i class="fa-regular fa-square"></i>
                <i class="fa-solid fa-chevron-down"></i>
                </div>
                </div>
                {ePost?.map((post, i) =>
                    <div id={`${post.id}`} className="post-content">
                     {post.PostSetting?.hidden && user?.id === post.PostSetting?.userId && <div style={{ width: "100%"}}  id="hideP">
                      <h2>Post hidden</h2>
                      <button onClick={(() => handleUnhide(post.PostSetting.id))} id="undoH">Undo</button>
                      </div>}
                   {(!post.PostSetting?.hidden || user?.id !== post.PostSetting?.userId) && <div  onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="pc-side1">
                    <PostLikes post={post}
                    />
                    </div>}
                   {(!post.PostSetting?.hidden || user?.id !== post.PostSetting?.userId) && <div id="pc-side2">
                    <div id="nameOf">
                    {post.Community?.CommunityStyle?.icon ? <img onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} src={post.Community?.CommunityStyle?.icon}></img> : <div style={{ backgroundColor: `${post.Community?.CommunityStyle?.base}`, color: "white" }} onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="pfp30">l/</div>}
                    <span onClick={(() => history.push(`/communities/${post.communityId}/:page`))} className="userName" id="community">l/{post.Community?.name}</span>
                    <p>·</p>
                    <p style={{ marginLeft: "0px"}} id="cp">Posted by <span onClick={((e) => {
                        e.stopPropagation()
                        post.userId !== user.id ? history.push(`/profile2/${post.userId}/:page`) : history.push('/profile/:page')})} className="userName">u/{post.User?.username}</span> {getTimeDifferenceString(post.createdAt)}</p>                          </div>
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
                    <div onClick={(() => {
                      setScroll(true)
                      setModalContent(<PostPageModal postId={post.id}  />)
                      })} id="comment">
                    <i class="fa-regular fa-message"></i>
                    <p id={`${post.id}`} >{post.Comments ? Object.values(post.Comments)?.length : 0} Comments</p>
                    </div>
                    <div onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))} id="comment">
                    <i class="fi fi-rr-box-heart"></i>
                    <p>Awards</p>
                    </div>
                    <div onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))} id="comment">
                    <i class="fi fi-rs-heart-arrow"></i>
                    <p>Share</p>
                    </div>
                    { post.PostSetting?.userId !== user?.id || !post.PostSetting?.saved ? <div onClick={(() => {
                      post.PostSetting ? handleSaved2(post.id) : handleSaved(post.id)
                    })} id="comment">
                    <i class="fi fi-rr-bookmark"></i>
                    <p>Save</p>
                    </div> :
                    <div onClick={(() => {
                      handleUnsaved(post.id)
                    })} id="comment">
                    <i class="fi fi-rr-bookmark-slash"></i>
                    <p>Unsave</p>
                    </div>
                    }
                    <i id="hideP" ref={targetRef} onClick={((e) => {
                      e.stopPropagation()
                      setHiddenPost(post.id)
                      setHiddenbox(!hiddenBox)}
                      )} class="fi fi-rr-menu-dots">
                      {hiddenBox && hiddenPost == post.id && <div id="hp">
                        <span onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))}><i class="fi fi-rr-volume-mute"></i>Mute l/help</span>
                        {post.PostSetting && post.PostSetting?.hidden && post.PostSetting?.userId == user.id ? <span onClick={(() => handleUnhide(post.PostSetting.id))} ><i class="fi fi-sr-eye-crossed"></i>Unide</span> :
                        <span onClick={(() => post.PostSetting ? handleHide2(post.id) : handleHide(post.id))} ><i class="fi fi-rr-eye-crossed"></i>Hide</span> }
                        <span onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))}><i class="fi fi-rr-flag"></i>Report</span>
                      </div>}
                    </i>
                    </div>
                    </div>}
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
                    <button onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))}>Try Now</button>
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
                <button onClick={(() => setModalContent(<SignupFormModal />))} id="but1">Create Post</button>
                <button onClick={(() => setModalContent(<SignupFormModal />))} id="but2">Create Community</button>
                </> }
                </div>
                </div>
               { recent.length > 0 && <div className='recent-posts'>
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
                    { i !== (recent.length - 1) ? <div id="line"></div> : null}
                    </>
                    )}
                    <span onClick={clearButton} style={{ cursor: "pointer" }} id="span2">Clear</span>
                </div>}
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

export default HotPage
