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
import PostLikes from '../HomePage/likes'
import CommunitiesProfile from '../CreatePostPage/communites2'
import DeletePost from '../PostPage/delete'
import { useModal2 } from '../../context/Modal2'
import DeleteComment from '../PostPage/Comments/deleteC'
import '../PostPage/PostPage.css'
import * as sessionActions from "../../store/session"
import MyCarousel from '../PostPage/postCrousel'
import { useFilter } from '../../context/filter'
import SignupFormModal from '../SignupFormPage'
import NoPosts from './none'


function OtherProfilePage() {
    const { posts, singlePost, userPosts, postsOverview } = useSelector((state) => state.posts);
    const { communities, communityMemberships, memberships } = useSelector((state) => state.communities);
    const { user, other } = useSelector((state) => state.session);
    const dispatch = useDispatch()
    let { id } = useParams()
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(true);
    const [isVisible4, setIsVisible4] = useState(false)
    const [ votePost, setVotePost ] = useState(null);
    const [ isLiked, setIsLiked ] = useState([]);
    const history = useHistory()
    const { setModalContent, setScroll, setThreadId } = useModal()
    const [ scrolling, setScrolling ] = useState(null)
    const targetRef4 = useRef()
    const targetRef3 = useRef()
    const  { setModalContent2, modalRef2 } = useModal2()
    const [ postId, setPostId ] = useState(null)
    const [ commentId, setCommentId ] = useState(null)
    const [ singleCommunity, setSingleCommunity ] = useState(null)
    const [ joined, setJoined ] = useState(true)
    const targetRef2 = useRef()
    const { page } = useParams(); // Retrieve the page parameter from the URL
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPage2, setCurrentPage2] = useState(1);
    const [threshold, setThreshold] = useState(450);
    const { filter, setFilter } = useFilter()
    const [ seeMore, setSeeMore ] = useState(false)
    const [ hiddenBox, setHiddenbox ] = useState(false)
    const [ hiddenPost, setHiddenPost ] = useState(null)

    useEffect(() => {
        setFilter(false)
        localStorage.setItem("currentPage", currentPage.toString());
      }, [currentPage]);

      useEffect(() => {

        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };

      }, [currentPage]);

      const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;

        if (windowHeight + scrollTop >= documentHeight - threshold) {
          const storedCurrentPage = localStorage.getItem("currentPage");

          setCurrentPage(currentPage + 1);
          setThreshold(threshold + 200);
          dispatch(postsActions.thunkGetOverview(id, currentPage)); // Fetch posts for the specified page
      }
      }

      const handleSaved = async (id) => {
        await dispatch(postsActions.thunkCreateSaved(id))
      }

      const handleSaved2 = async (id) => {
        await dispatch(postsActions.thunkUpdateSaved(id))
      }

      const handleUnsaved = async (id) => {
        await dispatch(postsActions.thunkUpdateSaved2(id))
      }

      const handleHide = async (id) => {
        await dispatch(postsActions.thunkCreateHidden(id))
      }

      const handleHide2 = async (id) => {
        await dispatch(postsActions.thunkUpdateHidden(id))
      }

      const handleUnhide = async (id) => {
        await dispatch(postsActions.thunkUpdateHidden2(id))
      }

      const handleCommentSaved = async (id) => {
        await dispatch(postsActions.thunkCreateSaved2(id))
      }

      const handleUnsaved2 = async (id) => {
        await dispatch(postsActions.thunkCreateDeleteSaved2(id))
      }




    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top instantly when the page loads
    }, []);

    useEffect(() => {
        let data

        async function fetchData() {
            if (id) data = await dispatch(sessionActions.getOther(id))
            else return
        }

        fetchData()

    }, [dispatch, id])

    useEffect(() => {
        let data

        async function fetchData() {
            if (id) data = dispatch(postsActions.thunkGetOverview(id, page)); // Fetch posts for the specified page
            else return
        }

        fetchData()

    }, [dispatch, page, id]);

    useEffect(() => {

        async function fetchData() {
            let data = await dispatch(communitiesActions.thunkGetUserCommunities())
           if (profile) await dispatch(communitiesActions.thunkGetDetailsById(profile.id))
        }

        fetchData()

    }, [dispatch])

    useEffect(() => {
        // if (!showMenu) return;

        const closeMenu = (e) => {
            if (targetRef2 && !targetRef2.current?.contains(e.target)) {
                setIsVisible2(false);
            }
            if (targetRef3 && !targetRef3.current?.contains(e.target)) {
              setHiddenbox(false);
          }
          if (targetRef4 && !targetRef4.current?.contains(e.target)) {
            setIsVisible4(false);
        }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);

    }, []);

    let filterdPosts = Object.values(postsOverview).filter((p) => p.userId === other.id || p.Comments.some((c) => c.userId === other.id))

    filterdPosts.forEach((p) => {
        let postDate = new Date(p.updatedAt)
        p.updatedAt = Date.parse(postDate)
    })

    filterdPosts.forEach((p) => {

        p.Comments?.forEach((c) => {
            let commentDate = new Date(c.updatedAt)
            c.updatedAt = Date.parse(commentDate)
        })
        p.Comments?.sort((a, b) => {
            return b.updatedAt - a.updatedAt
        })

        if (p.Comments[0] && p.updatedAt < p.Comments[0].updatedAt) {
            p.updatedAt = p.Comments[0].updatedAt

        }

    })


    filterdPosts.sort((a, b) => {
        return b.updatedAt - a.updatedAt
    })



    let top = isVisible ? "top" : "down";

    let moderating = []
    moderating = Object.values(communities).filter((c) => c.userId === other.id && c.type !== "Profile").slice(0, 3)
    if (seeMore) moderating = Object.values(communities).filter((c) => c.userId === other.id && c.type !== "Profile")

    let profile

    if (user) profile = other.profile



  useEffect(() => {

    async function fetchData() {
      let data = await dispatch(postsActions.thunkGetUserVotes())
      setIsLiked(data)
      }
      fetchData()

  }, [dispatch, posts])

  useEffect(() => {
    async function fetchData() {
      let data = await dispatch(postsActions.thunkGetUserPosts())
      }
      fetchData()

  }, [dispatch])


    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY < 350) {
            setIsVisible3(false)

        }
        else if (window.scrollY > 370) {
          setIsVisible(true);
          setIsVisible3(true);

        } else {
          setIsVisible(false);

        }
      };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };


    }, [])

    let recent = Object.values(posts)
    recent = recent.reverse()
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


      let editMenu = isVisible2 ? "edit-menu" : "hidden";
      let editMenu2 = isVisible4 ? "edit-menu" : "hidden";

      // const memberships = Object.values(communityMemberships)
      // const member = memberships.filter((m) => moderating.some((c) => m.communityId === c.id))

      const myMemberships = Object.values(memberships)

    return (
        <>

    <div id="aHeader">
        <div id="aH">
        <span onClick={(() => history.push(`/profile2/${id}/:page`))}id="aHl">OVERVIEW</span>
        <span onClick={(() => history.push(`/profile2/${id}/posts/:page`))} id="aH2">POSTS</span>
        <span onClick={(() => history.push(`/profile2/${id}/comments/:page`))} id="aH3">COMMENTS</span>
        </div>
    </div>
    <div className="splashPage">
    <div className="posts">
    <div className="filter">
        <div id="filter-side1">
        <div style={{ backgroundColor: "#EDEFF1"}} onClick={(() => history.push(`/profile2/${id}/:page`))} id="best">
        <i style={{ color: '#0079D3'}} class="fi fi-sr-bahai"></i>
        <p style={{ color: '#0079D3'}}>New</p>
        </div>
        <div onClick={(() => history.push(`/profile2/hot/${id}/:page`))} id="best">
        <i class="fi fi-rs-flame"></i>
        <p>Hot</p>
        </div>
        <div onClick={(() => history.push(`/profile2/top/${id}/:page`))}id="best">
        <i class="fi fi-ts-signal-bars-good"></i>
        <p>Top</p>
        </div>
        </div>
        </div>
        {filterdPosts && !filterdPosts.length ? <NoPosts name={"posted"} /> : filterdPosts?.map((post, i) =>
            // <div id={`${post.id}`} onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={scrolling} />))} className="post-content">
            <div id="omg">
              {(post.PostSetting?.hidden && user?.id === post.PostSetting?.userId && new Date(post.PostSetting?.hidden) > new Date(Date.now() - 60000)) ? <div id="hideP2">
                       <h2>Post hidden</h2>
                       <button onClick={(() => handleUnhide(post.PostSetting.id))} id="undoH2">Undo</button>
                       </div> : <>
            <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id={`${post.id}`} className="post-content2">
            {post.userId !== other.id ? <div id="pc-side104"><i id="posted-c" class="fa-regular fa-message"></i></div> : <div  onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="pc-side8">
            <PostLikes post={post}
            />
            </div> }
            <div id="pc-side2">
            { post.userId !== other.id ? <div id="nameOf2">
            <p onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))}  id="almostd">
            <span onClick={((e) => {
                e.stopPropagation()
                window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")})}className="userName2">{other.username} </span>
             commented on {post.title} · <span onClick={((e) => {
                e.stopPropagation()
                history.push(`/communities/${post.Community.id}/:page`)})}>l/{post.Community.name}</span> · Posted by <span onClick={((e) => {
                    e.stopPropagation()
                    post.userId !== user?.id ? history.push(`/profile2/${post.userId}/:page`) : history.push('/profile/:page')})} className="userName">u/{post.User && post.User.username}</span> {post.userId !== other.id ? null : getTimeDifferenceString(post.updatedAt)}</p>
            {/* <p >Posted by <span onClick={(() => window.alert("Feature not avaliable"))} className="userName">u/{post.User && post.User.username}</span> {post.userId !== user.id ? null : getTimeDifferenceString(post.createdAt)}</p> */}
            </div> : <div id="nameOf">
            {post.Community.CommunityStyle.icon ? <img onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} src={post.Community.CommunityStyle.icon}></img> : <div style={{ backgroundColor: `${post.Community.CommunityStyle.base}`, color: "white" }} onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="pfp30">l/</div>}
            <span onClick={((e) => {
                e.stopPropagation()
                history.push(`/communities/${post.communityId}/:page`)
                })} className="userName" id="community">l/{post.Community.name}</span>
            <p>·</p>
            <p>Posted by <span onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))} className="userName">u/{post.User && post.User.username}</span> {post.userId !== other.id ? null : getTimeDifferenceString(post.updatedAt)}</p>
            { !myMemberships.filter((m) => m.id === post.communityId).length && post.Communiy && post.Community.type !== "Profile" ? <button onClick={((e) => {
                  e.stopPropagation()
                  dispatch(communitiesActions.thunkJoinCommunities(post.communityId))
                  })} id="miniJoin">Join</button> : null }
            </div> }
            { post.userId !== other.id ? null : <h3  id="p-tit2" onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="title"><h3 id="title-content2">{post.title}<span>{ post.tags && post.tags.includes("oc") ? <div id="oc5">OC</div> : null} {post.tags && post.tags.includes("spoiler") ? <span id="spoiler5">Spoiler</span> : null } { post.tags && post.tags.includes("nsfw") ? <span id="nsfw5">NSFW</span> : null}</span></h3></h3>}
            <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="content">
            {post.PostImages.length !== 0 && post.userId === other.id && <div id="img2">
            {post.PostImages.length === 1 && post.userId === other.id ? <img style={{ maxWidth: "100%", maxHeight: "511px", alignSelf: "flex-end" }} src={post.PostImages[0]?.imgURL} alt="meaningful-text"></img> : <MyCarousel images={post.PostImages}/>}
            </div>}
            { post.userId === other.id && post.description && <div style={{position: "relative"}} id="finishing2">
                <span id="post-des">{post.description}</span>
                { post.description.length > 140 && <div id="faded"></div>}
            </div>}
            </div>
            {post.userId !== user?.id ?
            <div id="post-extras9">
              <div onClick={(() => {
                      setScroll(true)
                      setModalContent(<PostPageModal postId={post.id}  />)
                      })} id="comment">            <i class="fa-regular fa-message"></i>
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
            { post.PostSetting?.userId !== user?.id || !post.PostSetting.saved ? <div onClick={((e) => {
                      e.stopPropagation()
                      post.PostSetting ? handleSaved2(post.id) : handleSaved(post.id)
                    })} id="comment">
                    <i class="fi fi-rr-bookmark"></i>
                    <p>Save</p>
                    </div> :
                    <div onClick={((e) => {
                      e.stopPropagation()
                      handleUnsaved(post.PostSetting.id)
                    })} id="comment">
                    <i class="fi fi-rr-bookmark-slash"></i>
                    <p>Unsave</p>
                    </div>
                    }
                  <i id="hideP" ref={targetRef3} onClick={((e) => {
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
            : <div id="post-extras2">
            <div id="comment5">
                <i onClick={((e) => {
                    e.stopPropagation()
                    setModalContent(<PostPageModal postId={post.id} scroll={true} />)
                    })} class="fa-regular fa-message"></i>
                <p>{post.Comments && post.Comments.length}</p>
                </div>
                <div onClick={((e) => {
                    e.stopPropagation()
                    window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")
                    })} id="comment4">
                    <i class="fi fi-rs-heart-arrow"></i>
                    <p>Share</p>
                </div>
                <div onClick={((e) => {
                    e.stopPropagation()
                    window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")
                    })} id="comment4">
                    <i class="fi fi-rs-check-circle"></i>
                    <p>Approved</p>
                </div>
                <div onClick={((e) => {
                    e.stopPropagation()
                    window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")
                    })} id="comment4">
                    <i class="fi fi-rs-circle-cross"></i>
                    <p>Removed</p>
                </div>
                <div onClick={((e) => {
                    e.stopPropagation()
                    window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")
                    })} id="comment4">
                    <i class="fi fi-rr-box"></i>
                    <p>Spam</p>
                </div>
                <div id="comment4">
                    <i class="fi fi-rs-shield"></i>
                </div>
                <i  ref={targetRef2} onClick={((e) => {
                    e.stopPropagation()
                    setIsVisible2(true)
                    setPostId(i)
                    if (postId === i) setIsVisible2(!isVisible2)
                    })} id="menu" class="fi fi-rr-menu-dots">
                { postId === i ? <div id="post-menu25">
                <div className="menu">
                <div id={editMenu}>
                   {post.PostImages && post.PostImages.length && post.PostImages[0].imgURL ? null : <p onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} edit={true} />))}><i class="fi fi-rr-magic-wand"></i>Edit</p> }
                   { post.PostSetting?.userId !== user?.id || !post.PostSetting?.saved ? <p onClick={((e) => {
                      e.stopPropagation()
                      post.PostSetting ? handleSaved2(post.id) : handleSaved(post.id)
                    })}>
                    <i class="fi fi-rr-bookmark"></i>Save</p> :
                    <p onClick={((e) => {
                      e.stopPropagation()
                      handleUnsaved(post.PostSetting.id)
                    })}>
                    <i class="fi fi-rr-bookmark-slash"></i>Unsave</p> }
                    { post.PostSetting?.userId !== user?.id || !post.PostSetting.hidden ? <p onClick={(() => {
                      post.PostSetting ? handleHide2(post.id) : handleHide(post.id)
                    })}><i class="fi fi-rr-eye-crossed"></i>Hide</p> : <p onClick={(() => {
                      handleUnhide(post.PostSettingid)
                    })}><i class="fi fi-rr-eye-crossed"></i>Unhide</p>}
                    <p onClick={(() => {
                        setModalContent2(<div> <DeletePost id={singlePost.id} /></div>)
                        setIsVisible2(false)
                    })}><i class="fi fi-rr-trash-xmark"></i>Delete</p>
                    <label>
                    <input type="checkbox" />
                    Mark as OC
                    </label>
                    <label>
                    <input type="checkbox" />
                    Mark as Spolier
                    </label>
                    <label>
                    <input type="checkbox" />
                    Mark as NSFW
                    </label>
                    <label>
                    <input type="checkbox" />
                    Send me reply notifications
                    </label>
                </div>
                </div>
                </div> : null }
                </i>
            </div> }
            </div>
            </div>
            { post.Comments && post.Comments.length ?
            <div id="if-comments2">
                    {post.Comments.map((c, i) =>
                    c.userId === other.id &&
                    <div id="comm-border9">
                        {post.Comments && post.Comments.length ? <div id="p-border"></div> : null }
                        <div onClick={((e) => {
                            e.stopPropagation()
                            setScroll(true)
                            setModalContent(<PostPageModal postId={post.id} />)
                            })}  className="a-comment2">
                            <div id="left-csec4">
                            <div id="c-line2"></div>
                            </div>
                            <div className="commentB" id="right-csec4">
                                <span><span id="username45">{other.username}</span> { other.id === post.userId ? <div id="OP">OP</div> : null} <div id="time-comm"> · {getTimeDifferenceString(c.updatedAt)}</div></span>
                                <p>{c.comment}</p>
                                <div id="comment-extras90">
                                <div onClick={((e) => {
                                      e.stopPropagation()
                                      setThreadId(c.id)
                                      setModalContent(<PostPageModal postId={post.id} />)
                                    })}>
                                        <i class="fa-regular fa-message"></i>
                                        <p>Reply</p>
                                    </div>
                                    <div >
                                        <i class="fi fi-rs-heart-arrow"></i>
                                        <p>Share</p>
                                    </div>
                                    <i ref={targetRef4} onClick={((e) => {
                                      e.stopPropagation()
                                        setIsVisible4(!isVisible4)
                                        setCommentId(c.id)
                                    //    if (commentId === i) setIsVisible4(!isVisible4)
                                    })} class="fi fi-rr-menu-dots">
                                    { c.userId === other.id && commentId == c.id? <div className="menu">
                                    <div id="comm-sec25">
                                    <div onClick={((e) => e.stopPropagation())} id={editMenu2}>
                                    {c.CommentSetting && c.CommentSetting.saved ? <p onClick={((e) => {
                                        e.stopPropagation()
                                        handleUnsaved2(c.CommentSetting.id)
                                    })}><i class="fi fi-rr-bookmark-slash"></i>Unsave</p> : <p onClick={((e) => {
                                        e.stopPropagation()
                                        handleCommentSaved(c.id)
                                    })}><i class="fi fi-rr-bookmark"></i>Save</p>}
                                    <p onClick={((e) => {
                                            e.stopPropagation()
                                            window.alert(("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))
                                     })}><i class="fi fi-rr-flag"></i>Report</p>
                                     </div>
                                     </div>
                                    </div>
                                     : null }
                                    </i>

                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </div>: null}
                </>}
            </div>
        )}

    </div>
    <div className="sidebar">
        <CommunitiesProfile community={other.profile} user={other} />
        { moderating.length > 0 && <div id="terms2">
            <div id="terms-9">
            <span>Moderator of these <br></br>
                communities</span>
            {moderating.map((c) =>
            <div id="modss">
                <div>
                {c.CommunityStyle.icon ? <img id="tpfp" src={c.CommunityStyle.icon}></img> : <div style={{ backgroundColor: `${c.CommunityStyle.base}`}}id="nopfp">l/</div> }
               <div id="modss20">
               <span onClick={(() => history.push(`/communities/${c.id}/:page`))} id="justbold">l/{c.name}</span>
               <span>{c.CommunityMembers} { c.CommunityMembers === 1 ? "member" : "members" }</span>
               </div>
               </div>
               { myMemberships.filter((m) => m.id === c.id).length ? <button onClick={(() => {
                  dispatch(communitiesActions.thunkUnjoinCommunities(c.id))
                })}
                id="mod-butt"></button> :
                <button onClick={(() => {
                    if (!user) return setModalContent(<SignupFormModal />)

                    dispatch(communitiesActions.thunkJoinCommunities(c.id))
                  })}
                  id="mod-butt2"></button> }
            </div>


            )}
            </div>
            { Object.values(communities).filter((c) => c.userId === other.id && c.type !== "Profile").length > 3 && <p onClick={((e) => {
                    e.stopPropagation()
                    setSeeMore(!seeMore)
                    })}><span id="view-more">{ !seeMore ? "VIEW MORE" : "VIEW LESS"}</span></p>}
        </div> }
        { isVisible3 ? <button className={top} onClick={((e) => window.scrollTo({ top: 0, left: 0, behavior: "smooth"}))}>Back to Top</button> : null}
    </div>
</div>
        </>
)
}


export default OtherProfilePage
