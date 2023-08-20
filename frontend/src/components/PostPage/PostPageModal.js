import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import YourCommunitesProfile from "../CommunityPage/communites3";
import "./PostPage.css"
import * as postActions from '../../store/posts';
import * as communityActions from '../../store/communities';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import pfp from "./IMG6.jpg";
import DeletePost from "./delete";
import { useModal2 } from "../../context/Modal2";
import CommunitiesProfile from "../CreatePostPage/communites2";
import PostLikes from "../HomePage/likes";
import * as commentActions from '../../store/comments'

function PostPageModal({ postId, scroll }) {
    const { communities, singleCommunity, communityMemberships } = useSelector((state) => state.communities);
    const { singlePost } = useSelector((state) => state.posts)
    const { postComments } = useSelector((state) => state.comments)
    const { user } = useSelector((state) => state.session)
    const { id } = useParams();
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(false);
    const [ deleted, setDeleted ] = useState("")
    const targetRef = useRef(null);
    const  { setModalContent2, modalRef2 } = useModal2()
    const [isVisible2, setIsVisible2] = useState(false);
    const [ description, setDescription ] = useState("");
    const [ data1, setData1 ] = useState({})
    const [ data2, setData2 ] = useState({})
    const history = useHistory()
    const { closeModal } = useModal();
    const targetRef2 = useRef(null);
    const targetRef3 = useRef(null)
    const [scrollPosition, setScrollPosition] = useState(0);
    const [scrollDirection, setScrollDirection] = useState("down");
    const [ isLiked, setIsLiked ] = useState([]);
    const [ comment, setComment ] = useState("")
    const [ scrolling, setScrolling ] = useState(scroll)

    const memberships = Object.values(communityMemberships)


    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    const handleClick2 = () => {
        setIsVisible2(!isVisible2);
    };

    const handleSave = () => {

        setData1({
            description
        })
        setIsVisible2(false)
    }

    const handleComment = () => {

        console.log(comment)

        setData2({
            comment
        })

        setComment("")

    }

    useEffect( () => {

        async function fetchData() {
            const response = await dispatch(commentActions.thunkCreateComment(data2, singlePost.id))
            console.log(response)
        }
        fetchData()

    }, [dispatch, data2])



    useEffect(() => {

        async function fetchData() {
          if (singlePost && singlePost.id) await dispatch(commentActions.thunkGetPostComments(singlePost.id))
          let data = await dispatch(postActions.thunkGetUserVotes())
          setIsLiked(data)
          }
          fetchData()

    }, [dispatch, singlePost.id])


    useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > scrollPosition) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      setScrollPosition(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    }, [scrollPosition]);

    const scrollToTop = () => {
        const container = document.querySelector('.post-modal'); // Adjust the selector as needed
        if (container) {
            container.scrollTo({ top: 0, behavior: 'smooth' });
            // container.scrollIntoView({ behavior: 'smooth', block: 'start' });

        }
    };

    let comments = Object.values(postComments)
    console.log(comments)

    useEffect( () => {

        async function fetchData() {
            if (data1)  await dispatch(postActions.thunkUpdatePosts(singlePost?.id, data1))
            let data
            if (postId) data =  await dispatch(postActions.thunkGetDetailsById(postId))
            console.log(data)

        }
        fetchData()

    }, [dispatch, data1, postId])

    let editMenu = isVisible ? "edit-menu" : "hidden";


    const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 10));

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        const newRandomNum = Math.floor(Math.random() * 101);
        setRandomNum(newRandomNum);
      }, 10000);

      return () => {
        clearTimeout(timeoutId);
      };
    }, []);


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

    useEffect(() => {
        if (scrolling) {
          // Replace "targetElementId" with the actual ID of the target element
          const targetElement = document.getElementById("go-to-c");

          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }

          // Reset the flag after scrolling
        }
    }, [scrolling]);

      useEffect(() => {

          const handleDocumentClick = (event) => {
              console.log(modalRef2, modalRef2.current.contains(event.target) )
              if ((modalRef2.current && !modalRef2.current.contains(event.target)) && (targetRef2.current && !targetRef2.current.contains(event.target)) && (targetRef3.current && !targetRef3.current.contains(event.target))) {
                  closeModal();

                }

            };

            document.addEventListener('click', handleDocumentClick);
            return () => {
                document.removeEventListener('click', handleDocumentClick);
            };

        }, []);



        if (!Object.values(singlePost).length) return <h1>loading</h1>

        let createdAt
        if (Object.values(singlePost?.Community)?.length) createdAt = new Date(singlePost?.Community.createdAt)

        const dateObject = new Date(createdAt);

        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const formattedDate = `${months[dateObject.getMonth()]}, ${dateObject.getDate()}, ${dateObject.getFullYear()}`;

        console.log(scroll)



    return (
        <div className="post-modal">
            <div id="one">
                <div ref={targetRef3} className={scrollDirection === "up" ? "sticky" : ""} id="post-details-head">
                <div>
                <div id="line5"></div>
                <PostLikes post={singlePost}
                vote={isLiked.length && isLiked.some((l) => l.postId === singlePost.id && l.upVote === 1)}
                downVote={isLiked.length && isLiked.some((l) => l.postId === singlePost.id && l.downVote === 1)}
                />
                <div id="line5"></div>
                <i class="fi fi-rr-picture"></i>
                <span id="t-head">{singlePost.title}</span>
                </div>
                <span onClick={(() => closeModal())} id="close-head"><i class="fi fi-rr-cross-small"></i>Close</span>
                </div>
                <div id="2">
        <div ref={targetRef2} className="whole-post-page2">
            <div className="post-page">
            <div id="vote-side">
                <PostLikes post={singlePost}
                vote={isLiked.length && isLiked.some((l) => l.postId === singlePost.id && l.upVote === 1)}
                downVote={isLiked.length && isLiked.some((l) => l.postId === singlePost.id && l.downVote === 1)}
                />
            </div>
            <div id="details-side">
            <div id="nameOf3">
                    <img src={pfp}></img>
                    <span id="community">l/{singlePost.Community.name}</span>
                    <p>·</p>
                    <p>Posted by u/{singlePost.User.username} {getTimeDifferenceString(singlePost.createdAt)}</p>
                    </div>
            <h1>{singlePost?.title}</h1>
            <div id="post-info1">
            { isVisible2 ? null : singlePost.description ? <p>{singlePost?.description}</p> : null}
            { isVisible2 ? <div className="post-input7">
                         <div id="add-to7">
                        <i class="fi fi-rr-bold"></i>
                        <i class="fa-solid fa-italic"></i>
                        <i class="fi fi-rr-link-alt"></i>
                        <i class="fi fi-rr-strikethrough"></i>
                        <i class="fi fi-rr-code-simple"></i>
                        <i class="fa-solid fa-superscript"></i>
                        <i class="fi fi-rr-diamond-exclamation"></i>
                        <div id="divider16"></div>
                        <i class="fi fi-rr-heading"></i>
                        <i class="fi fi-rr-rectangle-list"></i>
                        <i class="fa-solid fa-list-ol"></i>
                        <i class="fi fi-rr-square-quote"></i>
                        <i class="fi fi-rr-square-code"></i>
                        <div id="divider16"></div>
                        <i class="fi fi-rr-grid-alt"></i>
                        <i class="fi fi-rr-picture"></i>
                        <i class="fa-brands fa-youtube"></i>
                        </div>
                       <textarea defaultValue={singlePost.description} onChange={((e) => setDescription(e.target.value) )} placeholder="Text(optional)"></textarea>
            </div> : null}
            {singlePost.PostImages?.length ? <div><img id="post-image1" src={singlePost.PostImages[0].imgURL} alt="postimg"></img></div> : null}
            </div>
            { isVisible2 ? <div id="save"><button onClick={handleClick2} >Cancel</button> <button id={ !description ? "save-submit" : "save-submit2"} onClick={handleSave}>Save</button></div> : null}
            {singlePost.User.id !== user.id ?<div id="post-extras3">
                    <div id="comment">
                    <i class="fa-regular fa-message"></i>
                    <p>{singlePost.Comments?.length} Comments</p>
                    </div>
                    <div id="comment">
                    <i class="fi fi-rr-box-heart"></i>
                    <p>Awards</p>
                    </div>
                    <div id="comment">
                    <i class="fi fi-rs-heart-arrow"></i>
                    <p>Share</p>
                    </div>
                    <div id="comment">
                    <i class="fi fi-rr-bookmark"></i>
                    <p>Save</p>
                    </div>
                    <i class="fi fi-rr-menu-dots"></i>
            </div>
             :
             <div id="post-extras1">
                <div id="comment5">
                <i class="fa-regular fa-message"></i>
                <p>{singlePost.Comments?.length}</p>
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
                <div id="comment4">
                    <i class="fa-brands fa-reddit-alien"></i>
                </div>
                <i  onClick={handleClick} id="menu" class="fi fi-rr-menu-dots"></i>
                <div className="menu">
                <div id={editMenu}>
                    <p onClick={(() => setIsVisible2(true))}><i class="fi fi-rr-magic-wand"></i>Edit</p>
                    <p><i class="fi fi-rr-bookmark"></i>Save</p>
                    <p><i class="fi fi-rr-eye-crossed"></i>Hide</p>
                    <p onClick={(() => {
                        setModalContent2(<div> <DeletePost id={singlePost.id} /></div>)
                        setIsVisible(false)
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
            </div> }
            <div id="insights">
                <p>Post Insights</p>
                <p>Check back later to see views, shares, and more. <span>Share your post</span> to spread the word!</p>
            </div>
            <div className="comment-input">
                <p>Comment as <span>{user.username}</span></p>
                <textarea value={comment} onChange={((e) => setComment(e.target.value))} placeholder="What are your thoughts?"></textarea>
            <div id="my-comments">
                <i class="fi fi-rr-bold"></i>
                <i class="fa-solid fa-italic"></i>
                <i class="fi fi-rr-link-alt"></i>
                <i class="fi fi-rr-strikethrough"></i>
                <i class="fi fi-rr-code-simple"></i>
                <i class="fa-solid fa-superscript"></i>
                <i class="fi fi-rr-diamond-exclamation"></i>
                <div id="divider16"></div>
                <i class="fi fi-rr-heading"></i>
                <i class="fi fi-rr-rectangle-list"></i>
                <i class="fa-solid fa-list-ol"></i>
                <i class="fi fi-rr-square-quote"></i>
                <i class="fi fi-rr-square-code"></i>
                <div id="divider16"></div>
                <i class="fi fi-rr-grid-alt"></i>
                <i class="fi fi-rr-picture"></i>
                <i class="fa-brands fa-youtube"></i>
                <button id="submit-c" onClick={handleComment}>Comment</button>
            </div>
            </div>
            <div className="comments-for-post">
                <div id="sort-comments">
                    <div>
                    <p>Sort By: Q&A (Suggested)<i class="fi fi-rr-caret-down"></i></p>
                    </div>
                    <div>
                    <p>Clear suggested sort</p>
                    </div>
                    <div>
                    <p>Contest</p>
                    <img src="https://vizzendata.files.wordpress.com/2020/01/switch-left.png"></img>
                    </div>
                    <div id="divider16"></div>
                    <div>
                    <i id="searchI" class="fi fi-rs-search-heart"></i>
                    <input type="text" placeholder='Search comments'></input>
                    </div>
                </div>
                    <div id="go-to-c"></div>
                { !comments.length ? <div id="any-comments">
                    <i class="fi fi-rr-comment-heart"></i>
                    <p>No Comments Yet</p>
                    <span>Be the first to share what you think</span>
                </div> :
                <div id="if-comments">
                    {comments.map((c) =>
                        <div className="a-comment">
                            <div id="left-csec">
                            <img id="avatar6" src={pfp}></img>
                            <div id="c-line"></div>
                            </div>
                            <div id="right-csec">
                                <span>{c.User.username} · <div id="time-comm">{getTimeDifferenceString(c.createdAt)}</div></span>
                                <p>{c.comment}</p>
                                <div id="comment-extras">
                                    <div>
                                        <i  class="fi fi-rs-heart"></i>
                                        <p>Votes</p>
                                        <i  class="fi fi-rs-heart-crack"></i>
                                    </div>
                                    <div>
                                        <i class="fa-regular fa-message"></i>
                                        <p>Reply</p>
                                    </div>
                                    <div >
                                        <i class="fi fi-rs-heart-arrow"></i>
                                        <p>Share</p>
                                    </div>
                                    <i class="fi fi-rr-menu-dots"></i>
                                </div>
                            </div>
                        </div>
                    )}
                </div>}
            </div>
            </div>
            </div>
            <div className="side-community2">
                { singlePost.Community.id !== 1 ? <CommunitiesProfile community={singlePost.Community} /> :
                 <div onClick={(() => {
                    history.push(`/communities/${singlePost.Community.id}`)
                    closeModal()
                })
                    } id="your-community-profile">
                    <div id="header-profile-comm4">
                    </div>
                    <div id="profile-content">
                        <span id="profile-comm-title7"><div>l/</div>{singlePost.Community?.name}</span>
                        <span id="profile-about7">{singlePost.Community?.about}</span>
                        <span id="when-created"><i class="fi fi-rr-cake-birthday"></i>Created {formattedDate}</span>
                        <div id="line"></div>
                        <div id="cs-side9">
                        <span><div>{singlePost.Community?.CommunityMembers}</div>Members</span>
                         <span><div id="online"><i class="fi fi-ss-bullet"></i>{randomNum}</div>Online</span>
                        </div>
                        <div id="line"></div>
                            <button id="join-now2">Join</button>
                        <div id="line"></div>
                        <div id="cs-side5">
                        <span>COMMUNITY OPTIONS</span>
                        <i class="fa-solid fa-chevron-down"></i>
                </div>
                </div>
                </div> }
                <div id="side-bar7">
                <div id="cs-background7">
                <p>Moderators</p>
                </div>
                <div id="home-section7">
                <button id="but4"><i class="fi fi-rr-envelope"></i>Message the mods</button>
                <div id="cs-side7">
                    <span>{user.username}</span>
                    <span>VIEW ALL MODERATORS</span>
                </div>
                </div>
                </div>
            <button className="top2" onClick={scrollToTop}>Back to Top</button>
            </div>
                </div>
                </div>
        </div>
        </div>
    )
}

export default PostPageModal
