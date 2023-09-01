import * as postsActions from '../../store/posts'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import * as communitiesActions from "../../store/communities"
import './HomePage.css'
import pfp from './IMG6.jpg'
import avatar from  './imagedit2.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import PostPageModal from '../PostPage/PostPageModal'
import { useModal } from '../../context/Modal'
import CreateCommunity from '../CreateCommunityModel'
import PostLikes from '../HomePage/likes'
import CommunitiesProfile from '../CreatePostPage/communites2'
import DeletePost from '../PostPage/delete'
import { useModal2 } from '../../context/Modal2'
import DeleteComment from '../PostPage/deleteC'
import '../PostPage/PostPage.css'

function YourProfilePage() {
    const { posts, singlePost, userPosts } = useSelector((state) => state.posts);
    const { userCommunities } = useSelector((state) => state.communities);
    const { user } = useSelector((state) => state.session);
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(true);
    const [isVisible4, setIsVisible4] = useState(false)
    const [ votePost, setVotePost ] = useState(null);
    const [ isLiked, setIsLiked ] = useState([]);
    const history = useHistory()
    const { setModalContent } = useModal()
    const [ scrolling, setScrolling ] = useState(null)
    const targetRef = useRef()
    const  { setModalContent2, modalRef2 } = useModal2()
    const [ postId, setPostId ] = useState(null)
    const [ commentId, setCommentId ] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top instantly when the page loads
    }, []);

    let sortedPosts = Object.values(posts)

    let filterdPosts = sortedPosts.filter((p) => {
        return p.userId === user.id || p.Comments.some((c) => c.userId === user.id)
    })

    filterdPosts.forEach((p) => {
       p.Comments = p.Comments.filter((c) => c.userId === user.id)
    })

    filterdPosts.forEach((p) => {
        let postDate = new Date(p.createdAt)
        p.createdAt = Date.parse(postDate)
    })

    filterdPosts.sort((a, b) => {
        return b.createdAt - a.createdAt
    })

    filterdPosts.forEach((p) => {

        if (p.userId !== user.id) {
            p.Comments.forEach((c) => {
                let commentDate = new Date(c.createdAt)
                c.createdAt = Date.parse(commentDate)
            })
            p.Comments.sort((a, b) => {
                return b.createdAt - a.createdAt
            })

            p.createdAt = p.Comments[0].createdAt
        }


    })

    filterdPosts.sort((a, b) => {
        return b.createdAt - a.createdAt
    })

    let top = isVisible ? "top" : "down";

    let profile
    if (user) profile = userCommunities['1']

    useEffect(() => {

        async function fetchData() {
          let data = await dispatch(communitiesActions.thunkGetUserCommunities())
           if (profile) await dispatch(communitiesActions.thunkGetDetailsById(profile.id))
        }
          fetchData()

      }, [dispatch])

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


    console.log(isLiked)

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



   // if (!ePost.length) return <h1 className="data-not-here"></h1>

    let recent = Object.values(posts)
    recent = recent.reverse()
    recent = recent.slice(0, 5)

    let moderating = Object.values(userCommunities)

    moderating.shift()


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

      let editMenu = isVisible2 ? "edit-menu" : "hidden";
      let editMenu2 = isVisible4 ? "edit-menu" : "hidden";

      console.log(moderating)


    return (
        <>

    <div id="aHeader">
        <div id="aH">
        <span id="aHl">OVERVIEW</span>
        <span id="aH2">POSTS</span>
        <span id="aH3">COMMENTS</span>
        <span id="aH4">HISTORY</span>
        <span id="aH5">SAVED</span>
        <span id="aH6">HIDDEN</span>
        <span id="aH7">UPVOTED</span>
        <span id="aH8">DOWNVOTED</span>
        <span id="aH9">AWARDS RECIEVED</span>
        <span id="aH10">AWARDS GIVEN</span>
        </div>
    </div>
    <div className="splashPage">
    <div className="posts">
        <div className="filter">
        <div id="filter-side1">
        <div onClick={(() => window.alert("Feature not avaliable"))} id="best">
        <i class="fi fi-rr-bahai"></i>
        <p>New</p>
        </div>
        <div onClick={(() => window.alert("Feature not avaliable"))}id="best">
        <i class="fi fi-rs-flame"></i>
        <p>Hot</p>
        </div>
        <div onClick={(() => window.alert("Feature not avaliable"))} id="best">
        <i class="fi fi-rs-signal-bars-good"></i>
        <p>Top</p>
        </div>
        </div>
        </div>
        {filterdPosts?.map((post, i) =>
            // <div id={`${post.id}`} onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={scrolling} />))} className="post-content">
            <div id="omg">
            <div id={`${post.id}`} className="post-content2">
            {post.userId !== user.id ? <div id="pc-side104"><i id="posted-c" class="fa-regular fa-message"></i></div> : <div  onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="pc-side8">
            <PostLikes post={post}
            vote={isLiked.length && isLiked.some((l) => l.postId === post.id && l.upVote === 1)}
            downVote={isLiked.length && isLiked.some((l) => l.postId === post.id && l.downVote === 1)}/>
            </div> }
            <div id="pc-side2">
            { post.userId !== user.id ? <div id="nameOf2">
            <p id="almostd">
            <span className="userName2">{user.username} </span>
             commented on {post.title} · <span>l/{post.Community.name}</span> · Posted by <span onClick={(() => window.alert("Feature not avaliable"))} className="userName">u/{post.User && post.User.username}</span> {post.userId !== user.id ? null : getTimeDifferenceString(post.createdAt)}</p>
            {/* <p >Posted by <span onClick={(() => window.alert("Feature not avaliable"))} className="userName">u/{post.User && post.User.username}</span> {post.userId !== user.id ? null : getTimeDifferenceString(post.createdAt)}</p> */}
            </div> : <div id="nameOf">
            {post.Community.communityStyles && post.Community.communityStyles.length ? <img onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} src={post.Community.communityStyles[0].profile}></img> : <img onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} src={pfp}></img>}
            <span onClick={(() => history.push(`/communities/${post.communityId}`))} className="userName" id="community">l/{post.Community.name}</span>
            <p>·</p>
            <p >Posted by <span onClick={(() => window.alert("Feature not avaliable"))} className="userName">u/{post.User && post.User.username}</span> {post.userId !== user.id ? null : getTimeDifferenceString(post.createdAt)}</p>
            </div> }
            { post.userId !== user.id ? null : <h3  id="p-tit" onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="title2">{ post.tags && post.tags.includes("oc") ? <div id="oc5">OC</div> : null} {post.tags && post.tags.includes("spoiler") ? <div id="spoiler5">Spoiler</div> : null } { post.tags && post.tags.includes("nsfw") ? <div id="nsfw5">NSFW</div> : null}{post.title}</h3>}
            <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="content">
            {post.userId !== user.id ? null : <div id="img">
            {post.PostImages.length ? <img src={post.PostImages[0]?.imgURL} alt="meaningful-text"></img> : null}
            </div>}
            <div id="finishing4">
              { post.userId !== user.id ? null : post.description}
              </div>
            </div>
            {post.userId !== user.id ? null : <div id="post-extras2">
            <div id="comment5">
                <i class="fa-regular fa-message"></i>
                <p>{post.Comments && post.Comments.length}</p>
                </div>
                <div id="comment4">
                    <i class="fi fi-rs-heart-arrow"></i>
                    <p>Share</p>
                </div>
                <div id="comment4">
                    <i class="fi fi-rs-check-circle"></i>
                    <p>Approved</p>
                </div>
                <div id="comment4">
                    <i class="fi fi-rs-circle-cross"></i>
                    <p>Removed</p>
                </div>
                <div id="comment4">
                    <i class="fi fi-rr-box"></i>
                    <p>Spam</p>
                </div>
                <div id="comment4">
                    <i class="fi fi-rs-shield"></i>
                </div>
                <i  onClick={(() => {
                    setIsVisible2(true)
                    setPostId(i)
                    if (postId === i) setIsVisible2(!isVisible2)
                    })} id="menu" class="fi fi-rr-menu-dots">
                { postId === i ? <div id="post-menu25">
                <div className="menu">
                <div id={editMenu}>
                   {singlePost.PostImages && singlePost.PostImages.length && singlePost.PostImages[0].imgURL ? null : <p onClick={(() => setIsVisible2(true))}><i class="fi fi-rr-magic-wand"></i>Edit</p> }
                    <p><i class="fi fi-rr-bookmark"></i>Save</p>
                    <p><i class="fi fi-rr-eye-crossed"></i>Hide</p>
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
                    <div id="comm-border9">
                        {post.Comments && post.Comments.length ? <div id="p-border"></div> : null }
                        <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={true} />))} className="a-comment2">
                            <div id="left-csec4">
                            <div id="c-line2"></div>
                            </div>
                            <div id="right-csec4">
                                <span><span id="username45">{user.username}</span> { user.id === post.userId ? <div id="OP">OP</div> : null} <div id="time-comm"> · {getTimeDifferenceString(c.createdAt)}</div></span>
                                <p>{c.comment}</p>
                                <div id="comment-extras">
                                    <div>
                                        <i class="fa-regular fa-message"></i>
                                        <p>Reply</p>
                                    </div>
                                    <div >
                                        <i class="fi fi-rs-heart-arrow"></i>
                                        <p>Share</p>
                                    </div>
                                    <i onClick={(() => {
                                        setIsVisible4(true)
                                        setCommentId(i)
                                       if (commentId === i) setIsVisible4(!isVisible4)
                                    })} class="fi fi-rr-menu-dots">
                                    { commentId === i ? <div className="menu">
                                    <div id="comm-sec25">
                                    <div onClick={((e) => e.stopPropagation())} id={editMenu2}>
                                    {singlePost.PostImages.length && singlePost.PostImages[0].imgURL ? null : <p onClick={(() => setIsVisible2(true))}><i class="fi fi-rr-magic-wand"></i>Edit</p> }
                                     <p><i class="fi fi-rr-bookmark"></i>Save</p>
                                     <p><i class="fi fi-rr-eye-crossed"></i>Hide</p>
                                     <p onClick={(() => {
                                     setModalContent2(<div> <DeleteComment id={c.id} /></div>)
                                     setIsVisible(false)
                                     setIsVisible3(false)
                                     })}><i class="fi fi-rr-trash-xmark"></i>Delete</p>
                                     <label>
                                     <input type="checkbox" />
                                     Send me reply notifications
                                     </label>
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
            </div>
        )}

    </div>
    <div className="sidebar">
        <CommunitiesProfile community={profile} />
        <div id="terms2">
            <div id="terms-9">
            <span>You're a moderator of these <br></br>
                communities</span>
            {moderating.map((c) =>
            <div id="modss">
               {c.communityStyles && c.communityStyles.length ? <img id="tpfp" src={c.communityStyles[0].profile}></img> : <div>l/</div> }
               <div id="modss20">
                <span>l/{c.name}</span>
                <span>{c.CommunityMembers} members</span>
               </div>
            </div>


            )}
            </div>
            <p>VIEW MORE</p>
        </div>
        { isVisible3 ? <button className={top} onClick={((e) => window.scrollTo({ top: 0, left: 0, behavior: "smooth"}))}>Back to Top</button> : null}
    </div>
</div>
        </>
)
}


export default YourProfilePage
