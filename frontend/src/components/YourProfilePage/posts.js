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
import NoPosts from './none'
import { useFilter } from '../../context/filter'

function UsersPosts() {
    const { posts, singlePost, userPosts } = useSelector((state) => state.posts);
    const { userCommunities, communityMemberships, memberships } = useSelector((state) => state.communities);
    const { user } = useSelector((state) => state.session);
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(true);
    const [isVisible4, setIsVisible4] = useState(false)
    const [ votePost, setVotePost ] = useState(null);
    const history = useHistory()
    const { setModalContent } = useModal()
    const [ scrolling, setScrolling ] = useState(null)
    const targetRef = useRef()
    const  { setModalContent2, modalRef2 } = useModal2()
    const [ postId, setPostId ] = useState(null)
    const [ commentId, setCommentId ] = useState(null)
    const { page } = useParams(); // Retrieve the page parameter from the URL
    const targetRef2 = useRef()
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
          dispatch(postsActions.thunkGetUserPosts(user?.id, currentPage)); // Fetch posts for the specified page
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

    let filterdPosts = Object.values(userPosts).filter((p) => p.userId === user?.id).reverse()

    filterdPosts = filterdPosts.sort((a, b) => {
      return b.createdAt - a.createdAt
    })

    let profile

    let top = isVisible ? "top" : "down";
    let moderating = Object.values(userCommunities).filter((c) => c.type !== "Profile").slice(0, 3)
    if (seeMore) moderating = Object.values(userCommunities).filter((c) => c.type !== "Profile")
    if (!seeMore) moderating = Object.values(userCommunities).filter((c) => c.type !== "Profile").slice(0, 3)

    if (user) profile = Object.values(userCommunities).filter((m) => m.type === "Profile")[0]

    useEffect(() => {
        dispatch(postsActions.thunkGetUserPosts(user?.id, page)); // Fetch posts for the specified page
    }, [dispatch, page]);





    useEffect(() => {

      async function fetchData() {
          let data = await dispatch(communitiesActions.thunkGetUserCommunities())
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

    moderating.shift()

    //let member = memberships?.filter((m) => moderating.some((c) => m.communityId === c.id))



   // if (!ePost.length) return <h1 className="data-not-here"></h1>

    let recent = Object.values(posts)
    recent = recent.reverse()
    recent = recent.slice(0, 5)

    const myMemberships = Object.values(memberships)




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


    return (
        <>

    <div id="aHeader3">
        <div id="aH50">
        <span onClick={(() => history.push("/profile/:page"))} id="aH2">OVERVIEW</span>
        <span onClick={(() => history.push("/profile/posts/:page"))} id="aHl">POSTS</span>
        <span onClick={(() => history.push("/profile/comments/:page"))} id="aH3">COMMENTS</span>
        <span onClick={(() => history.push("/profile/history/:page"))}id="aH4">HISTORY</span>
        <span onClick={(() => window.alert("Feature not avaliable"))}id="aH5">SAVED</span>
        <span onClick={(() => window.alert("Feature not avaliable"))}id="aH6">HIDDEN</span>
        <span onClick={(() => history.push("/profile/upvoted/:page"))} id="aH7">UPVOTED</span>
        <span onClick={(() => history.push("/profile/downvoted/:page"))} id="aH8">DOWNVOTED</span>
        <span onClick={(() => window.alert("Feature not avaliable"))}id="aH9">AWARDS RECIEVED</span>
        <span onClick={(() => window.alert("Feature not avaliable"))}id="aH10">AWARDS GIVEN</span>
        </div>
    </div>
    <div className="splashPage2">
    <div className="posts3">
        <div className="filter">
        <div id="filter-side1">
        <div style={{ backgroundColor: "#EDEFF1"}} onClick={(() => history.push("/profile/posts/:page"))} id="best">
        <i style={{ color: '#0079D3'}} class="fi fi-sr-bahai"></i>
        <p style={{ color: '#0079D3'}}>New</p>
        </div>
        <div onClick={(() => history.push("/profile/posts/hot/:page"))}id="best">
        <i class="fi fi-rs-flame"></i>
        <p>Hot</p>
        </div>
        <div onClick={(() => history.push("/profile/posts/top/:page"))} id="best">
        <i class="fi fi-ts-signal-bars-good"></i>
        <p>Top</p>
        </div>
        </div>
        </div>
        {!filterdPosts.length ? <NoPosts name="posted anything"/> : filterdPosts?.map((post, i) =>
            // <div id={`${post.id}`} onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={scrolling} />))} className="post-content">
            <div id="omg2">
            <div onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} />))} id={`${post.id}`} className="post-content3">
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
            <p >Posted by <span onClick={(() => window.alert("Feature not avaliable"))} className="userName">u/{post.User && post.User.username}</span> {post.userId !== user.id ? null : getTimeDifferenceString(post.updatedAt)}</p>
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
                   {singlePost.PostImages && singlePost.PostImages.length && singlePost.PostImages[0].imgURL ? null : <p onClick={(() => setModalContent(<PostPageModal postId={post.id} scroll={false} edit={true} />))}><i class="fi fi-rr-magic-wand"></i>Edit</p> }
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
            </div>
            </div>
            </div>
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


export default UsersPosts
