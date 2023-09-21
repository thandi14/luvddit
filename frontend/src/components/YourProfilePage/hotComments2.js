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
import DeleteComment from '../PostPage/deleteC'
import '../PostPage/PostPage.css'
import * as sessionActions from "../../store/session"
import { useFilter } from '../../context/filter'
import SignupFormModal from '../SignupFormPage'


function Commented2HotPosts() {
    const { posts, singlePost, postsHotComments } = useSelector((state) => state.posts);
    const { communities, communityMemberships, memberships } = useSelector((state) => state.communities);
    const { user, other } = useSelector((state) => state.session);
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
    const targetRef2 = useRef()
    const { id } = useParams()
    const { page } = useParams(); // Retrieve the page parameter from the URL
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPage2, setCurrentPage2] = useState(1);
    const [threshold, setThreshold] = useState(450);
    const { filter, setFilter } = useFilter()
    const [ seeMore, setSeeMore ] = useState(false)


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
          dispatch(postsActions.thunkGetHotComments(id, currentPage)); // Fetch posts for the specified page
        }
      }


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


    useEffect(() => {
      let data

      async function fetchData() {
          if (id) data = await dispatch(sessionActions.getOther(id))
          else return
      }

      fetchData()

  }, [dispatch, id])

  useEffect(() => {
    dispatch(postsActions.thunkGetHotComments(id, page)); // Fetch posts for the specified page
  }, [dispatch, page, id]);

    let filterdPosts = Object.values(postsHotComments)

    filterdPosts = filterdPosts.filter((p) => p.Comments.some((c) => c.userId === other.id))

    filterdPosts = filterdPosts.filter((p) => p.Comments.some((c) => c.userId === other.id))

    filterdPosts.forEach((p) => {
      p.Comments.forEach((c) => {
          let commentDate = new Date(c.updatedAt)
          c.updatedAt = Date.parse(commentDate)
      })
      p.Comments.sort((a, b) => {
          return b.updatedAt - a.updatedAt
      })
     // p.Comments = p.Comments.filter((c) => c.userId === user.id)

      p.updatedAt = p.Comments[0].updatedAt

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
          if (id) await dispatch(sessionActions.getOther(id))
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
        <span onClick={(() => history.push(`/profile2/${id}/:page`))} id="aH2">OVERVIEW</span>
        <span onClick={(() => history.push(`/profile2/${id}/posts/:page`))} id="aH3">POSTS</span>
        <span onClick={(() => history.push(`/profile2/${id}/comments/:page`))} id="aHl">COMMENTS</span>
        </div>
    </div>
    <div className="splashPage2">
    <div className="posts7">
    <div className="filter">
        <div id="filter-side1">
        <div onClick={(() => history.push(`/profile2/${id}/comments/:page`))} id="best">
        <i class="fi fi-rr-bahai"></i>
        <p>New</p>
        </div>
        <div style={{ backgroundColor: "#EDEFF1"}} onClick={(() => history.push(`/profile2/${id}/comments/hot/:page`))}id="best">
        <i style={{ color: '#0079D3'}} class="fi fi-sr-flame"></i>
        <p style={{ color: '#0079D3'}}>Hot</p>
        </div>
        <div onClick={(() => history.push(`/profile2/${id}/comments/top/:page`))} id="best">
        <i class="fi fi-ts-signal-bars-good"></i>
        <p>Top</p>
        </div>
        </div>
        </div>
        {filterdPosts?.map((post, i) =>
            // <div id={`${post.id}`} onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={scrolling} />))} className="post-content">
            <div id="omg">
            <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id={`${post.id}`} className="post-content2">
            <div id="pc-side104"><i id="posted-c" class="fa-regular fa-message"></i></div>
            <div id="pc-side2">
            <div id="nameOf2">
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
            </div>
            <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="content">
            </div>
            </div>
            </div>
            { post.Comments && post.Comments.length ?
            <div id="if-comments2">
                    {post.Comments.map((c, i) =>
                     c.userId === other.id &&
                    <div id="comm-border9">
                        {post.Comments && post.Comments.length ? <div id="p-border2"></div> : null }
                        <div onClick={((e) => {
                            e.stopPropagation()
                            setModalContent(<PostPageModal postId={post.id} scroll={true} />)
                            })} className="a-comment3">
                            <div id="left-csec4">
                            <div id="c-line2"></div>
                            </div>
                            <div className="white" id="right-csec4">
                                <span><span id="username45">{other.username}</span> { user?.id === post.userId ? <div id="OP">OP</div> : null} <div id="time-comm"> · {getTimeDifferenceString(c.updatedAt)}</div></span>
                                <p>{c.comment}</p>
                                <div id="comment-extras90">
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
                                    //     setCommentId(i)
                                    //    if (commentId === i) setIsVisible4(!isVisible4)
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
    <div className="sidebar2">
        <CommunitiesProfile community={other.profile} />
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


export default Commented2HotPosts
