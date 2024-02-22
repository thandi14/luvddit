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
import MyCarousel from '../PostPage/postCrousel'
import * as sessionActions from '../../store/session'
import { useFilter } from '../../context/filter'
import SignupFormModal from '../SignupFormPage'
import NoPosts from './none'

function OtherHotProfilePage() {
    const { posts, singlePost, postsHotOverview } = useSelector((state) => state.posts);
    const { userCommunities, communityMemberships, memberships, communities } = useSelector((state) => state.communities);
    const { user, other } = useSelector((state) => state.session);
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(true);
    const [isVisible4, setIsVisible4] = useState(false)
    const [ votePost, setVotePost ] = useState(null);
    const [ isLiked, setIsLiked ] = useState([]);
    const history = useHistory()
    const { id } = useParams()
    const { setModalContent } = useModal()
    const [ scrolling, setScrolling ] = useState(null)
    const targetRef = useRef()
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
        let data

        async function fetchData() {
            if (id) data = await dispatch(sessionActions.getOther(id))
            else return
        }

        fetchData()

    }, [dispatch, id])

    useEffect(() => {
        setFilter(false)
        localStorage.setItem("currentPage", currentPage.toString());
      }, [currentPage]);

      useEffect(() => {

        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };

      }, [currentPage, id]);

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


      const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;

        if (windowHeight + scrollTop >= documentHeight - threshold) {
          const storedCurrentPage = localStorage.getItem("currentPage");

          setCurrentPage(currentPage + 1);
          setThreshold(threshold + 200);
         if (other.id) dispatch(postsActions.thunkGetHotOverview(other.id, currentPage)); // Fetch posts for the specified page
      }
      }


    useEffect(() => {
      if (other.id)  dispatch(postsActions.thunkGetHotOverview(other.id, page)); // Fetch posts for the specified page
    }, [dispatch, page, other.id]);


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

   // let ePosts = Object.values(posts).reverse()

    let filterdPosts = Object.values(postsHotOverview).filter((p) => p.userId === other.id || p.Comments.some((c) => c.userId === other.id))
    filterdPosts = filterdPosts.sort((a, b) => b.Votes.length -  a.Votes.length)

    let top = isVisible ? "top" : "down";

    let moderating = []
    moderating = Object.values(communities).filter((c) => c.userId === other.id && c.type !== "Profile").slice(0, 3)
    if (seeMore) moderating = Object.values(communities).filter((c) => c.userId === other.id && c.type !== "Profile")

    let profile

    if (user) profile = other.profile
    let member

    const myMemberships = Object.values(memberships)
    //const member = myMemberships.filter((m) => m.id === singleCommunity.id)

    useEffect(() => {

        async function fetchData() {
            dispatch(communitiesActions.thunkGetMemberships())
            let data = await dispatch(communitiesActions.thunkGetUserCommunities())
            if (profile) await dispatch(communitiesActions.thunkGetDetailsById(profile.id))
        }

        fetchData()

      }, [dispatch])

    //   const memberships = Object.values(communityMemberships)
    //   member = memberships.filter((m) => moderating.some((c) => m.communityId === c.id))

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
        <div onClick={(() => history.push(`/profile2/${id}/:page`))} id="best">
        <i class="fi-rr-bahai"></i>
        <p>New</p>
        </div>
        <div style={{ backgroundColor: "#EDEFF1"}} onClick={(() => history.push(`/profile2/hot/${id}/:page`))} id="best">
        <i style={{ color: '#0079D3'}} class="fi fi-sr-flame"></i>
        <p style={{ color: '#0079D3'}} >Hot</p>
        </div>
        <div onClick={(() => history.push(`/profile2/top/${id}/:page`))}id="best">
        <i class="fi fi-ts-signal-bars-good"></i>
        <p >Top</p>
        </div>
        </div>
        </div>
        {filterdPosts && !filterdPosts.length ? <NoPosts name={"posted"} /> : filterdPosts?.map((post, i) =>
            // <div id={`${post.id}`} onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={scrolling} />))} className="post-content">
                <div id="omg2">
            { !post.PostSetting?.hidden ? <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id={`${post.id}`} className="post-content3">
            <div  onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="pc-side9">
            <PostLikes post={post}
            />
            </div>
            <div id="what-cont">
            {post.PostImages.length ? <img src={post.PostImages[0].imgURL}></img> : < i class="fi fi-rr-notebook"></i>}
            </div>
            <div id="pc-side2">
            <h3  id="p-tit2" onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="title0"><h3 id="title-content10">{post.title}<span>{ post.tags && post.tags.includes("oc") ? <div id="oc5">OC</div> : null} {post.tags && post.tags.includes("spoiler") ? <span id="spoiler5">Spoiler</span> : null } { post.tags && post.tags.includes("nsfw") ? <span id="nsfw5">NSFW</span> : null}</span></h3></h3>
            <div id="nameOf5">
            <span onClick={((e) => {
                e.stopPropagation()
                history.push(`/communities/${post.communityId}`)
                })} className="userName" id="community">l/{post.Community.name}</span>
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
              history.push(`/profile/:page`)})}  className="userName">u/{post.User && post.User.username}</span> {getTimeDifferenceString(post.createdAt)}</p>}
            </div>
            {/* <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id="content">
            <div id="finishing4">
              {post.description}
              </div>
            </div> */}
            <div className="move" id="post-extras2">
            <div id="comment5">
                <i onClick={((e) => {
                    e.stopPropagation()
                    setModalContent(<PostPageModal postId={post.id} scroll={true} />)
                    })} class="fa-regular fa-message"></i>
                <p>{post.Comments && post.Comments.length} Comments</p>
                </div>
                <div onClick={((e) => {
                    e.stopPropagation()
                    window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")
                    })} id="comment4">
                    <i class="fi fi-rs-heart-arrow"></i>
                    <p>Share</p>
                </div>
                { !post.PostSetting || !post.PostSetting.saved ? <div onClick={((e) => {
                    e.stopPropagation()
                    !post.PostSetting ? handleSaved(post.id) : handleSaved2(post.id)
                    })} id="comment4">
                    <i class="fi fi-rr-bookmark"></i>
                    <p>Save</p>
                </div> :
                <div onClick={((e) => {
                    e.stopPropagation()
                    handleUnsaved(post.PostSetting.id)
                    })} id="comment4">
                    <i class="fi fi-rr-bookmark-slash"></i>
                    <p>Unsave</p>
                </div>}
                {!post.PostSetting || !post.PostSetting.hidden ? <div onClick={((e) => {
                    e.stopPropagation()
                    !post.PostSetting ? handleHide(post.id) : handleHide2(post.id)
                    })} id="comment4">
                    <i class="fi fi-rr-eye-crossed"></i>
                    <p>Hide</p>
                </div> :
                <div onClick={((e) => {
                  e.stopPropagation()
                  handleUnhide(post.PostSetting.id)
                })} id="comment4">
                  <i class="fi fi-sr-eye-crossed"></i>
                  <p>Unhide</p>
              </div>}
                <div onClick={((e) => {
                    e.stopPropagation()
                    window.alert("Feature comming soon: Messages/Live Chat, Mods, Proflie and Notifications")
                    })} id="comment4">
                    <i class="fi fi-rr-box"></i>
                    <p>Report</p>
                </div>

            </div>
            </div>
            </div> : <div id="hideP2">
                       <h2>Post hidden</h2>
                       <button onClick={(() => handleUnhide(post.PostSetting.id))} id="undoH2">Undo</button>
                       </div>}
            </div>
        )}

    </div>
    <div className="sidebar">
    <CommunitiesProfile community={other.profile} user={other} />
        <div id="terms2">
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
                  setJoined(true)
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
        </div>
        { isVisible3 ? <button className={top} onClick={((e) => window.scrollTo({ top: 0, left: 0, behavior: "smooth"}))}>Back to Top</button> : null}
    </div>
</div>
        </>
)
}


export default OtherHotProfilePage
