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
import DeleteComment from "./deleteC";
import CommentLikes from "../HomePage/likesC";

function PostPageModal({ postId, scroll }) {
    const { communities, singleCommunity, communityMemberships, memberships } = useSelector((state) => state.communities);
    const { singlePost, postsHistory } = useSelector((state) => state.posts)
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
    const [ data3, setData3 ] = useState({})
    const history = useHistory()
    const { closeModal } = useModal();
    const targetRef2 = useRef(null);
    const targetRef3 = useRef(null)
    const [ comment, setComment ] = useState("")
    const [ comment2, setComment2 ] = useState("")
    const [ scrolling, setScrolling ] = useState(scroll)
    const [isVisible3, setIsVisible3] = useState(false);
    const [ commentId, setCommentId ] = useState(null);
    const [ c, setC ] = useState(null)
    const [ seen, setSeen ] = useState(false)
    const [ postH, setPostH ] = useState([])
    const [ focus, setFocus ] = useState(false)
    const [ focus2, setFocus2 ] = useState(false)
    const [ focus3, setFocus3 ] = useState(false)
    const [ newComment, setNewComment ] = useState("")
    const [ commentM, setCommentM ] = useState(false)
    const [ commentId2, setCommentId2 ] = useState(null);
    const [ p, setP ] = useState(null)
    const [ tags, setTags ] = useState(null)
    let joined = null


    useEffect(() => {

        if (scroll) setScrolling(true)
        if (!scroll) setScrolling(false)

    }, [scroll])


    let members
    if (communityMemberships) members = Object.values(communityMemberships)

    let approved = members.some((m) => m.status === "Approved" && m.userId === user.id) && singleCommunity.id

    approved = !approved && singleCommunity.id ? false : true


    const myMemberships = Object.values(memberships)
    const member = myMemberships.filter((m) => m.id === singlePost.Community?.id)

    if (member) joined = true
    if (!member.length) joined = false

    useEffect(() => {

        async function fetchData() {
          await dispatch(communityActions.thunkGetCommunityMemberships(id))
          if (id) await dispatch(communityActions.thunkGetDetailsById(id))
          else return
        }

        fetchData()

    }, [dispatch, id])

    const handleJoinClick = async (e) => {
        e.stopPropagation()
        let response
        joined = true
        await dispatch(communityActions.thunkJoinCommunities(singleCommunity.id))
    }

    const handleUnjoinClick = async (e) => {
        e.stopPropagation()
        let response
        joined = false
        response = await dispatch(communityActions.thunkUnjoinCommunities(singleCommunity.id))
    }


    const handleClick = (e) => {
        e.stopPropagation()
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

        if (!user) return window.alert("Please login")

        setData2({
            comment
        })

        setComment("")

    }

    const handleComment2 = (e) => {
        e.stopPropagation()

        if (!user) return window.alert("Please login")

        setData3({
            comment2
        })

        setCommentM(false)

    }

    useEffect( () => {
        if (singlePost.tags) setTags(singlePost.tags.split(','))
    }, [dispatch, singlePost.tags])


    const handleOc = (e) => {
        e.stopPropagation()

        if (tags && tags.includes("oc")) {
            setData1({
                tags: singlePost.tags.split('oc,').join()
            })
        }
        else if (tags && !tags.includes("oc")) {
            setData1({
                tags: singlePost.tags += ",oc"
            })
        }
        else if (!tags) {
            setData1({
                tags: "oc"
            })
        }
    }

    const handleSpoiler = (e) => {
        e.stopPropagation()

        if (tags && tags.includes("spoiler")) {
            setData1({
                tags: singlePost.tags.split('spoiler,').join()
            })
        }
        else if (tags && !tags.includes("spoiler")) {
            setData1({
                tags: singlePost.tags += ",spoiler"
            })
        }
        else if (!tags) {
            setData1({
                tags: "spoiler"
            })
        }

    }

    const handleNsfw = (e) => {

        e.stopPropagation()

        if (tags && tags.includes("nsfw")) {
            setData1({
                tags: singlePost.tags.split('nsfw').join()
            })
        }
        else if (tags && !tags.includes("nsfw")) {
            setData1({
                tags: singlePost.tags += ",nsfw"
            })
        }
        else if (!tags) {
            setData1({
                tags: "nsfw"
            })
        }


    }


    let comments
    if (singlePost.Comments && singlePost.Comments.length) comments = Object.values(singlePost.Comments).reverse()

    useEffect( () => {

        async function fetchData() {
            const response = await dispatch(postActions.thunkCreateComment(data2, singlePost.id))
        }
        fetchData()

    }, [dispatch, data2, singlePost.id])

    useEffect( () => {

        async function fetchData() {
            let response
            if (c && c.id) response = await dispatch(postActions.thunkUpdateComment(data3, c.id))
        }
        fetchData()

    }, [dispatch, c, data3])

    const scrollToTop = () => {
        const container = document.querySelector('.post-modal'); // Adjust the selector as needed
        if (container) {
            container.scrollTo({ top: 0, behavior: 'smooth' });
            // container.scrollIntoView({ behavior: 'smooth', block: 'start' });

        }
    };

    let pHistory
    if (postsHistory) pHistory = Object.values(postsHistory)

    useEffect( () => {

        async function fetchData() {
            if (data1)  await dispatch(postActions.thunkUpdatePosts(singlePost?.id, data1))
            let data
            if (postId) {
                data =  await dispatch(postActions.thunkGetDetailsById(postId))
                setP(data)
            }


        }
        fetchData()

    }, [dispatch, data1, postId])


    useEffect( () => {

        async function fetchData() {

            if (singlePost.PostSetting?.history) await dispatch(postActions.thunkUpdateHistory(postId))
            else if (!singlePost.PostSetting || singlePost.PostSetting && !singlePost.PostSetting.history) await dispatch(postActions.thunkCreateHistory(postId))

        }
        fetchData()

    }, [dispatch, singlePost.PostSetting])


    let editMenu = isVisible ? "edit-menu" : "hidden";
    let editMenu2 = isVisible3 ? "edit-menu" : "hidden";


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
            if ((modalRef2.current && !modalRef2.current.contains(event.target)) && (targetRef2.current && !targetRef2.current.contains(event.target)) && (targetRef3.current && !targetRef3.current.contains(event.target))) {
                closeModal();

            }

        };

        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };

    }, []);

    useEffect(() => {

        const handleDocumentClick = (event) => {
            if ((targetRef.current && !targetRef.current.contains(event.target))) {
                //console.log("targetRef.current.contains(event.target)")
                        //   setIsVisible3(false);
                }

            };

            document.addEventListener('click', handleDocumentClick);
            return () => {
                document.removeEventListener('click', handleDocumentClick);
            };

        }, []);



    if (!Object.values(singlePost).length) return <h1></h1>

    let createdAt
    if (singlePost.Community && Object.values(singlePost?.Community)?.length) createdAt = new Date(singlePost?.Community.createdAt)

    const dateObject = new Date(createdAt);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const formattedDate = `${months[dateObject.getMonth()]}, ${dateObject.getDate()}, ${dateObject.getFullYear()}`;

    let style
        if (singleCommunity.communityStyles?.length) style = singleCommunity.communityStyles[0]

    return (
        <div className="post-modal">
            <div id="one">
                <div ref={targetRef3} id="post-details-head">
                <div>
                <div id="line5"></div>
                <PostLikes post={singlePost} p={"post"} h={true}
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
                <PostLikes post={singlePost} p={"post"}
                />
            </div>
            <div id="details-side">
            <div id="nameOf3">
                    <img src={singlePost.Community && singlePost.Community.communityStyles && singlePost.Community.communityStyles.length ? singlePost.Community.communityStyles[0].profile : pfp}></img>
                    <span id="community">l/{singlePost.Community?.name}</span>
                    <p>·</p>
                    <p>Posted by u/{singlePost.User?.username} {getTimeDifferenceString(singlePost.createdAt)}</p>
                    </div>
            <h1>{singlePost?.title}</h1>
            <span id="tags">{ tags && tags.includes("oc") ? <div id="oc6">OC</div> : null} {tags && tags.includes("spoiler") ? <div id="spoiler6">Spoiler</div> : null } { tags && tags.includes("nsfw") ? <div id="nsfw6">NSFW</div> : null}</span>
            <div id="post-info1">
            { isVisible2 ? null : singlePost.description ? <p>{singlePost?.description}</p> : null}
            { isVisible2 ? <div className="post-input7">
                         <div id={ focus2 ? "add-to11" : "add-to7"}>
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
                       <textarea onFocus={(() => setFocus2(true))} onBlur={(() => setFocus2(false))} defaultValue={singlePost.description} onChange={((e) => setDescription(e.target.value) )} placeholder="Text(optional)"></textarea>
            </div> : null}
            {singlePost.PostImages?.length ? <div><img id="post-image1" src={singlePost.PostImages[0].imgURL} alt="postimg"></img></div> : null}
            </div>
            { isVisible2 ? <div id="save"><button onClick={((e) => {
                e.stopPropagation()
                handleClick2()
                })} >Cancel</button> <button id={ !description ? "save-submit" : "save-submit2"} onClick={((e) => {
                    e.stopPropagation()
                    handleSave()
                    })}>Save</button></div> : null}
            {user && singlePost.User?.id !== user.id ?<div id="post-extras3">
                    <div id="comment">
                    <i class="fa-regular fa-message"></i>
                    <p>{comments && comments.length} Comments</p>
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
                <p>{comments && comments.length}</p>
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
                <i  onClick={handleClick} id="menu" class="fi fi-rr-menu-dots">
                <div id="post-menu25">
                <div className="menu">
                <div id={editMenu}>
                   {singlePost.PostImages.length && singlePost.PostImages[0].imgURL ? null : <p onClick={(() => setIsVisible2(true))}><i class="fi fi-rr-magic-wand"></i>Edit</p> }
                    <p><i class="fi fi-rr-bookmark"></i>Save</p>
                    <p><i class="fi fi-rr-eye-crossed"></i>Hide</p>
                    <p onClick={(() => {
                        setModalContent2(<div> <DeletePost id={singlePost.id} /></div>)
                        setIsVisible(false)
                    })}><i class="fi fi-rr-trash-xmark"></i>Delete</p>
                   <label onClick={handleOc}>
                    <input defaultChecked={tags?.includes("oc")} type="checkbox" />
                    Mark as OC
                    </label>
                    <label onClick={handleSpoiler}>
                    <input defaultChecked={tags?.includes("spoiler")} type="checkbox" />
                    Mark as Spolier
                    </label>
                    <label onClick={handleNsfw}>
                    <input defaultChecked={tags?.includes("nsfw")} type="checkbox" />
                    Mark as NSFW
                    </label>
                    <label>
                    <input type="checkbox" />
                    Send me reply notifications
                    </label>
                </div>
                </div>
                </div>
                </i>
            </div> }
            <div id="insights">
                <p>Post Insights</p>
                <p>Check back later to see views, shares, and more. <span>Share your post</span> to spread the word!</p>
            </div>
            <div className="comment-input">
               {user ? <p>Comment as <span>{user.username}</span></p> : "Please login"}
                <textarea onFocus={(() => setFocus(true))} onBlur={(() => setFocus(false))} value={comment} onChange={((e) => setComment(e.target.value))} placeholder="What are your thoughts?"></textarea>
            <div id={focus ? "my-comments2" : "my-comments"}>
                <i class="fi fi-rr-gif-square"></i>
                <i class="fi fi-rr-picture"></i>
                <div id="divider16"></div>
                <i class="fi fi-rr-bold"></i>
                <i class="fa-solid fa-italic"></i>
                <i class="fi fi-rr-link-alt"></i>
                <i class="fi fi-rr-strikethrough"></i>
                <i class="fi fi-rr-code-simple"></i>
                <i class="fa-solid fa-superscript"></i>
                <i class="fi fi-rr-diamond-exclamation"></i>
                <div id="divider16"></div>
                <i class="fi fi-rr-heading"></i>
                <i class="fi fi-rr-menu-dots"></i>
                {/* <i class="fi fi-rr-rectangle-list"></i>
                <i class="fa-solid fa-list-ol"></i>
                <i class="fi fi-rr-square-quote"></i>
                <i class="fi fi-rr-square-code"></i>
                <div id="divider16"></div>
                <i class="fa-brands fa-youtube"></i> */}
                <button id={!comment ? "submit-c" : "submit-c2"} onClick={handleComment}>Comment</button>
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
                { !comments || !comments.length ? <div id="any-comments">
                    <i class="fi fi-rr-comment-heart"></i>
                    <p>No Comments Yet</p>
                    <span>Be the first to share what you think</span>
                </div> :
                <div id="if-comments">
                    {comments.map((c, i) =>
                        <div onClick={(() => setC(c))} className="a-comment">
                            <div id="left-csec">
                            <img id="avatar6" src={pfp}></img>
                            <div id="c-line"></div>
                            </div>
                            <div id="right-csec">
                                <span><span id="username45">{c.User?.username}</span> { c.User && c.User.id === singlePost.userId ? <div id="OP">OP</div> : null} <div id="time-comm"> · {getTimeDifferenceString(c.createdAt)}</div></span>
                                { !(commentM && commentId2 === i) ? <p>{c.comment}</p> :
                                <div className="comment-input">
                                    <textarea onFocus={(() => setFocus3(true))} onBlur={(() => setFocus3(false))} defaultValue={c.comment} onChange={((e) => setComment2(e.target.value))}></textarea>
                                <div id={focus3 ? "my-comments2" : "my-comments"}>
                                <i class="fi fi-rr-gif-square"></i>
                                        <i class="fi fi-rr-picture"></i>
                                        <div id="divider16"></div>
                                        <i class="fi fi-rr-bold"></i>
                                        <i class="fa-solid fa-italic"></i>
                                        <i class="fi fi-rr-link-alt"></i>
                                        <i class="fi fi-rr-strikethrough"></i>
                                        <i class="fi fi-rr-code-simple"></i>
                                        <i class="fa-solid fa-superscript"></i>
                                        <i class="fi fi-rr-diamond-exclamation"></i>
                                        <div id="divider16"></div>
                                        <i class="fi fi-rr-heading"></i>
                                        <i class="fi fi-rr-menu-dots"></i>
                                        {/* <i class="fi fi-rr-rectangle-list"></i>
                                        <i class="fa-solid fa-list-ol"></i>
                                        <i class="fi fi-rr-square-quote"></i>
                                        <i class="fi fi-rr-square-code"></i>
                                        <div id="divider16"></div>
                                        <i class="fa-brands fa-youtube"></i> */}
                                    <button id="cancel-c" onClick={((e) => {
                                        e.stopPropagation()
                                        setCommentM(false)
                                        })}>Cancel</button>
                                    <button id="submit-c2" onClick={handleComment2}>Save Edits</button>
                                </div>
                                </div> }
                                { commentM && commentId2 === i ? null : <div id="comment-extras">
                                    <div>
                                        <CommentLikes comment={c} />
                                    </div>
                                    <div>
                                        <i class="fa-regular fa-message"></i>
                                        <p>Reply</p>
                                    </div>
                                    <div >
                                        <i class="fi fi-rs-heart-arrow"></i>
                                        <p>Share</p>
                                    </div>
                                    <i ref={targetRef} onClick={(() => {
                                        setIsVisible3(true)
                                        setCommentId(i)
                                       if (commentId === i) setIsVisible3(!isVisible3)
                                    })} class="fi fi-rr-menu-dots">
                                    { commentId === i ? <div className="menu">
                                    <div id="comm-sec25">
                                    <div onClick={((e) => e.stopPropagation())} id={editMenu2}>
                                    {c.userId !== user.id ? null : <p onClick={(() => {
                                        setCommentM(true)
                                        setIsVisible3(false)
                                        setCommentId2(i)
                                       // if (commentId !== i) setCommentM(!commentM)
                                        })}><i class="fi fi-rr-magic-wand"></i>Edit</p> }
                                     {c.userId === user.id ? null : <p><i class="fi fi-rr-flag"></i>Report</p>}
                                     <p><i class="fi fi-rr-bookmark"></i>Save</p>
                                     {c.userId === user.id ? null : <p><i class="fi fi-rs-cowbell"></i>Follow</p>}
                                     {c.userId !== user.id ? null : <p><i class="fi fi-rr-eye-crossed"></i>Hide</p>}
                                     {c.userId !== user.id ? null : <p onClick={(() => {
                                     setModalContent2(<div> <DeleteComment id={c.id} /></div>)
                                     setIsVisible(false)
                                     setIsVisible3(false)
                                     })}><i class="fi fi-rr-trash-xmark"></i>Delete</p> }
                                    {c.userId !== user.id ? null : <label>
                                     <input type="checkbox" />
                                     Send me reply notifications
                                     </label> }
                                     </div>
                                     </div>
                                    </div>
                                     : null }
                                    </i>

                                </div> }
                            </div>
                        </div>
                    )}
                </div>}
            </div>
            </div>
            </div>
            <div className="side-community2">
                { singlePost.Community?.id === 1 ? <CommunitiesProfile community={singlePost.Community} /> :
                 <div onClick={(() => {
                    history.push(`/communities/${singlePost.Community.id}/:page`)
                    closeModal()
                     })} id="your-community-profile">
                     {!singlePost.Community?.communityStyles.length ? <div id="header-profile-comm4">
                    </div> : <div className="header-postC"><img id="header-profile-comm10" src={singlePost.Community.communityStyles[0].header} ></img></div> }
                    <div id="profile-content">
                        <span id="profile-comm-title7"> { singlePost.Community?.communityStyles.length ? <img id="pfp10" src={singlePost.Community.communityStyles[0].profile}></img> : <div>l/</div>} {singlePost.Community?.name}</span>
                        <span id="profile-about7">{singlePost.Community?.about}</span>
                        <span id="when-created"><i class="fi fi-rr-cake-birthday"></i>Created {formattedDate}</span>
                        <div id="line"></div>
                        <div id="cs-side9">
                        <span><div>{singlePost.Community?.CommunityMembers}</div>Members</span>
                         <span><div id="online"><i class="fi fi-ss-bullet"></i>{randomNum}</div>Online</span>
                        </div>
                        <div id="line"></div>
                           { !member.length ? <button onClick={handleJoinClick} id="join-now">Join</button> :
                            <button onClick={handleUnjoinClick} id="join-now2"></button> }
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
                <button onClick={(() => window.alert("Feature not available"))} id="but4"><i class="fi fi-rr-envelope"></i>Message the mods</button>
                <div id="cs-side7">
                    {user ? <span>{singlePost.User.username}</span> : "" }
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
