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
import NoPosts from './none'
import { useFilter } from '../../context/filter'

function SavedPosts() {
    const { posts, singlePost, userPosts, postsSaved } = useSelector((state) => state.posts);
    const { userCommunities, communityMemberships, memberships } = useSelector((state) => state.communities);
    const { user } = useSelector((state) => state.session);
    const dispatch = useDispatch()
    const { page } = useParams(); // Retrieve the page parameter from the URL
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(true);
    const [isVisible4, setIsVisible4] = useState(false)
    const [ votePost, setVotePost ] = useState(null);
    const history = useHistory()
    const { setModalContent, setScroll, setThreadId } = useModal()
    const [ scrolling, setScrolling ] = useState(null)
    const targetRef = useRef()
    const  { setModalContent2, modalRef2 } = useModal2()
    const [ postId, setPostId ] = useState(null)
    const [ commentId, setCommentId ] = useState(null)
    const targetRef2 = useRef()
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPage2, setCurrentPage2] = useState(1);
    const [threshold, setThreshold] = useState(450);
    const { filter, setFilter } = useFilter()
    const [ seeMore, setSeeMore ] = useState(false)
    const targetRef3 = useRef()

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
          dispatch(postsActions.thunkGetHistory(currentPage)); // Fetch posts for the specified page
        }
      }


    useEffect(() => {
      dispatch(postsActions.thunkGetSaved(page)); // Fetch posts for the specified page
    }, [dispatch, page]);

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top instantly when the page loads
    }, []);

    useEffect(() => {
        // if (!showMenu) return;

         const closeMenu = (e) => {
           if (targetRef2 && !targetRef2.current?.contains(e.target)) {
             setIsVisible2(false);
           }
         };

         document.addEventListener('click', closeMenu);

         return () => document.removeEventListener("click", closeMenu);

        }, []);

    let filterdPosts = Object.values(postsSaved)
    // .filter((p) => {
    //     return p.PostSetting?.userId === user.id
    // })

    let top = isVisible ? "top" : "down";

    let profile

    let moderating = Object.values(userCommunities).filter((c) => c.type !== "Profile").slice(0, 3)
    if (seeMore) moderating = Object.values(userCommunities).filter((c) => c.type !== "Profile")
    if (!seeMore) moderating = Object.values(userCommunities).filter((c) => c.type !== "Profile").slice(0, 3)

    if (user) profile = Object.values(userCommunities).filter((m) => m.type === "Profile")[0]

    useEffect(() => {

        async function fetchData() {
           await dispatch(communitiesActions.thunkGetUserCommunities())
           if (profile) await dispatch(communitiesActions.thunkGetDetailsById(profile.id))
        }
          fetchData()

      }, [dispatch])


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

    filterdPosts.forEach((p) => {
          let setting = p.PostSetting;
          if (setting) {
            let historyDate = new Date(p.PostSetting.history)
            p.PostSetting.history = Date.parse(historyDate)
          }
    })

    filterdPosts.sort((a, b) => {
       if (b.PostSetting && a.PostSetting) {
         return b.PostSetting.history - a.PostSetting.history
       }
    })

   //if (!ePost.length) return <h1 className="data-not-here"></h1>

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

      const myMemberships = Object.values(memberships)


    return (
        <>

    <div id="aHeader3">
        <div id="aH50">
        <span onClick={(() => history.push("/profile/:page"))} id="aH4">OVERVIEW</span>
        <span onClick={(() => history.push("/profile/posts/:page"))} id="aH2">POSTS</span>
        <span onClick={(() => history.push("/profile/comments/:page"))} id="aH3">COMMENTS</span>
        <span onClick={(() => history.push("/profile/history/:page"))}id="aH5">HISTORY</span>
        <span onClick={(() => history.push("/profile/saved/:page"))}id="aHl">SAVED</span>
        <span onClick={(() => history.push("/profile/hidden/:page"))}id="aH6">HIDDEN</span>
        <span onClick={(() => history.push("/profile/upvoted/:page"))} id="aH7">UPVOTED</span>
        <span onClick={(() => history.push("/profile/downvoted/:page"))}id="aH8">DOWNVOTED</span>
        <span onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))}id="aH9">AWARDS RECIEVED</span>
        <span onClick={(() => window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications"))}id="aH10">AWARDS GIVEN</span>
        </div>
    </div>
    <div className="splashPage2">
    <div className="posts5">
        <div></div>
        {!filterdPosts.length ? <NoPosts name="seen anything" /> : filterdPosts?.map((post, i) =>
            <div id="space">
            { post.comment ?
             <div id="omg">
             <div onClick={(() => setModalContent(<PostPageModal postId={post.Post?.id} scroll={false} />))} id={`${post.Post?.id}`} className="post-content2">
             <div id="pc-side104"><i id="posted-c" class="fa-regular fa-message"></i></div>
             <div id="pc-side2">
             <div id="nameOf2">
             <p onClick={(() => setModalContent(<PostPageModal postId={post.Post?.id} scroll={false} />))}  id="almostd">
             <span onClick={((e) => {
                 e.stopPropagation()
                 window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")})}className="userName2">{post.User.username} </span>
              commented on {post.Post?.title} · <span onClick={((e) => {
                 e.stopPropagation()
                 history.push(`/communities/${post.Post?.Community?.id}/:page`)})}>l/{post.Post?.Community?.name}</span> · Posted by <span onClick={((e) => {
                   e.stopPropagation()
                   post.Post?.userId !== user?.id ? history.push(`/profile2/${post.userId}/:page`) : history.push('/profile/:page')})} className="userName">u/{post.Post?.User && post.Post?.User?.username}</span> {post.userId !== user?.id ? null : getTimeDifferenceString(post.updatedAt)}</p>
             {/* <p >Posted by <span onClick={(() => window.alert("Feature not avaliable"))} className="userName">u/{post.User && post.User.username}</span> {post.userId !== user.id ? null : getTimeDifferenceString(post.createdAt)}</p> */}
             </div>
             <div onClick={(() => setModalContent(<PostPageModal postId={post.Post.id} scroll={false} />))} id="content">
             </div>
             </div>
             </div>
             <div id="if-comments2">
                     <div id="comm-border9">
                         {post.comment ? <div id="p-border2"></div> : null }
                         <div onClick={((e) => {
                             e.stopPropagation()
                             setModalContent(<PostPageModal postId={post.id} scroll={true} />)
                             })} className="a-comment3">
                             <div id="left-csec4">
                             <div id="c-line2"></div>
                             </div>
                             <div className="white" id="right-csec4">
                             <span><span id="username45">{post.User?.username}</span> { post.User?.id === post.comment.userId ? <div id="OP">OP</div> : null} <div id="time-comm"> · {getTimeDifferenceString(post.updatedAt)}</div></span>
                                 <p>{post.comment}</p>
                                 <div id="comment-extras90">
                                 <div onClick={((e) => {
                                      e.stopPropagation()
                                      setThreadId(post.comment.id)
                                      setModalContent(<PostPageModal postId={post.id} />)
                                    })}>
                                        <i class="fa-regular fa-message"></i>
                                        <p>Reply</p>
                                    </div>
                                     <div >
                                         <i class="fi fi-rs-heart-arrow"></i>
                                         <p>Share</p>
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
                    { post.PostSetting?.userId !== user?.id || !post.PostSetting.saved ? <p onClick={(() => {
                      post.PostSetting ? handleSaved2(post.id) : handleSaved2(post.id)
                    })}>
                    <i class="fi fi-rr-bookmark"></i>Save</p> :
                    <p onClick={(() => {
                      handleUnsaved(post.PostSetting.id)
                    })}>
                    <i onClick={(() => handleUnsaved)} class="fi fi-rr-bookmark-slash"></i>Unsave</p> }
                    { post.PostSetting?.userId !== user?.id || !post.PostSetting.saved ? <p onClick={(() => {
                      post.PostSetting ? handleHide2(post.id) : handleHide(post.id)
                    })}><i class="fi fi-rr-eye-crossed"></i>Hide</p> :
                    <p onClick={(() => {
                      handleUnhide(post.PostSetting.id)
                    })}><i class="fi fi-sr-eye-crossed"></i>Unhide</p>}
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

                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
            : <div id="omg2">
            { <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id={`${post.id}`} className="post-content3">
            <div  onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="pc-side9">
            <PostLikes post={post}
            />
            </div>
            <div id="what-cont">
            {post.PostImages?.length ? <img src={post.PostImages[0].imgURL}></img> : < i class="fi fi-rr-notebook"></i>}
            </div>
            <div id="pc-side2">
            <h3  id="p-tit2" onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="title0"><h3 id="title-content10">{post.title}<span>{ post.tags && post.tags.includes("oc") ? <div id="oc5">OC</div> : null} {post.tags && post.tags.includes("spoiler") ? <span id="spoiler5">Spoiler</span> : null } { post.tags && post.tags.includes("nsfw") ? <span id="nsfw5">NSFW</span> : null}</span></h3></h3>            <div id="nameOf5">
            <span onClick={((e) => {
                e.stopPropagation()
                history.push(`/communities/${post.communityId}`)
                })} className="userName" id="community">l/{post.Community?.name}</span>
            { !myMemberships.filter((m) => m.id === post.communityId).length && post.Communiy && post.Community.type !== "Profile" ? <button onClick={((e) => {
                  e.stopPropagation()
                  dispatch(communitiesActions.thunkJoinCommunities(post.communityId))
                })} id="miniJoin2">Join</button> : null }
            <p>·</p>
            { user.id !== post.userId ? <p >Posted by <span onClick={((e) => {
              e.stopPropagation()
              history.push(`/profile2/${post.userId}/:page`)
            })}  className="userName">u/{post.User && post.User.username}</span> {getTimeDifferenceString(post.createdAt)}</p> :
            <p >Posted by <span onClick={((e) => {
              e.stopPropagation()
              history.push(`/profile/:page`)})}  className="userName">u/{post.User && post.User.username}</span> {getTimeDifferenceString(post.createdAt)}</p>}            </div>
            {post.userId == user.id ? <div className="move" id="post-extras2">
            <div id="comment5">
                <i onClick={((e) => {
                    e.stopPropagation()
                    setScroll(true)
                    setModalContent(<PostPageModal postId={post.id} />)
                    })} class="fa-regular fa-message"></i>
                <p>{post.Comments && post.Comments.length}</p>
                </div>
                <div onClick={((e) => {
                    e.stopPropagation()
                    window.alert("Feature not avaliable")
                    })} id="comment4">
                    <i class="fi fi-rs-heart-arrow"></i>
                    <p>Share</p>
                </div>
                <div onClick={((e) => {
                    e.stopPropagation()
                    window.alert("Feature not avaliable")
                    })} id="comment4">
                    <i class="fi fi-rs-check-circle"></i>
                    <p>Approved</p>
                </div>
                <div onClick={((e) => {
                    e.stopPropagation()
                    window.alert("Feature not avaliable")
                    })} id="comment4">
                    <i class="fi fi-rs-circle-cross"></i>
                    <p>Removed</p>
                </div>
                <div onClick={((e) => {
                    e.stopPropagation()
                    window.alert("Feature not avaliable")
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
                    { post.PostSetting?.userId !== user?.id || !post.PostSetting?.saved ? <p onClick={(() => {
                    !post.PostSetting ? handleSaved(post.id) : handleSaved2(post.id)
                  })}>
                    <i class="fi fi-rr-bookmark"></i>Save</p> :
                    <p onClick={(() => {
                      handleUnsaved(post.PostSetting.id)
                    })}>
                    <i class="fi fi-rr-bookmark-slash"></i>Unsave</p> }
                    {post.PostSetting?.userId !== user?.id || !post.PostSetting?.hidden ? <p onClick={(() => {
                      post.PostSetting ? handleHide2(post.id) : handleHide(post.id)
                    })}><i class="fi fi-rr-eye-crossed"></i>Hide</p> : <p onClick={(() => {
                      post.PostSetting ? handleHide2(post.id) : handleHide(post.id)
                    })}><i class="fi fi-sr-eye-crossed"></i>Unhide</p>}
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
            </div> : <div className="move" id="post-extras2">
            <div id="comment5">
                <i onClick={((e) => {
                    e.stopPropagation()
                    setScroll(true)
                    setModalContent(<PostPageModal postId={post.id} />)
                    })} class="fa-regular fa-message"></i>
                <p>{post.Comments && post.Comments.length} Comments</p>
                </div>
                <div onClick={((e) => {
                    e.stopPropagation()
                    window.alert("Feature not avaliable")
                    })} id="comment4">
                    <i class="fi fi-rs-heart-arrow"></i>
                    <p>Share</p>
                </div>
                { post.PostSetting?.userId !== user?.id || !post.PostSetting?.saved ? <div onClick={((e) => {
                    e.stopPropagation()
                    !post.PostSetting ? handleSaved(post.id) : handleSaved2(post.id)
                  })} id="comment4">
                    <i class="fi fi-rr-bookmark"></i>
                    <p>Save</p>
                </div> : <div onClick={((e) => {
                    e.stopPropagation()
                    handleUnsaved(post.PostSetting?.id)
                    })} id="comment4">
                    <i class="fi fi-rr-bookmark-slash"></i>
                    <p>Unsave</p>
                </div>}
                { post.PostSetting?.userId !== user?.id || !post.PostSetting?.hidden ? <div onClick={((e) => {
                    e.stopPropagation()
                    post.PostSetting ? handleHide2(post.id) : handleHide(post.id)
                    })} id="comment4">
                    <i class="fi fi-rr-eye-crossed"></i>
                    <p>Hide</p>
                </div> : <div onClick={((e) => {
                    e.stopPropagation()
                    handleUnhide(post.PostSetting?.id)
                    })} id="comment4">
                    <i class="fi fi-sr-eye-crossed"></i>
                    <p>Unhide</p>
                </div> }
                <div onClick={((e) => {
                    e.stopPropagation()
                    window.alert("Feature not avaliable")
                    })} id="comment4">
                    <i class="fi fi-rr-flag"></i>
                    <p>Report</p>
                </div>
            </div>}
            </div>
            </div>}
            </div> }
            </div>
        )}


    </div>
    <div className="sidebar2">
    <CommunitiesProfile community={profile} page="/profile" />
        <div id="terms2">
            <div id="terms-9">
            <span>You're a moderator of these <br></br>
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
                  dispatch(communitiesActions.thunkJoinCommunities(c.id))
                  })}
                  id="mod-butt2"></button> }
            </div>
            )}
            </div>
            { Object.values(userCommunities).filter((c) => c.type !== "Profile").length > 3 && <p onClick={((e) => {
                    e.stopPropagation()
                    setSeeMore(!seeMore)
                    })}><span id="view-more">{ !seeMore ? "VIEW MORE" : "VIEW LESS"}</span></p>}
        </div>
        { isVisible3 ? <button className={top} onClick={((e) => window.scrollTo({ top: 0, left: 0, behavior: "smooth"}))}>Back to Top</button> : null}
    </div>
</div>
        </>
)
}


export default SavedPosts
