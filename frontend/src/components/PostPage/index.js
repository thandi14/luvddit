import './PostPage.css'
import '../CreatePostPage/CreatePostPage.css'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import * as postActions from '../../store/posts'
import '../CreatePostPage/CreatePostPage.css'
import CommunitiesProfile from '../CreatePostPage/communites2';
import * as communityActions from '../../store/communities'
import DeletePost from './delete';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useModal2 } from '../../context/Modal2';
import pfp from "./IMG6.jpg";
import * as commentActions from '../../store/comments'
import PostLikes from '../HomePage/likes';
import DeleteComment from "./deleteC";
import CommentLikes from '../HomePage/likesC';

function PostPage() {
    const { singlePost } = useSelector((state) => state.posts)
    const { user } = useSelector((state) => state.session)
    const { singleCommunity, userCommunities } = useSelector((state) => state.communities)
    const { id } = useParams();
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(false);
    const [ deleted, setDeleted ] = useState("")
    const targetRef = useRef(null);
    const { setModalContent2 } = useModal2()
    const [isVisible2, setIsVisible2] = useState(false);
    const [ description, setDescription ] = useState("");
    const [ data1, setData1 ] = useState(null);
    const history = useHistory()
    const [ comment, setComment ] = useState("")
    const [ data2, setData2 ] = useState({})
    const [isVisible3, setIsVisible3] = useState(false);
    const [ commentId, setCommentId ] = useState(null)
    const [ focus, setFocus ] = useState(false)
    const [ focus2, setFocus2 ] = useState(false)
    const [ focus3, setFocus3 ] = useState(false)
    const [ newComment, setNewComment ] = useState("")
    const [ commentM, setCommentM ] = useState(false)
    const [ commentId2, setCommentId2 ] = useState(null);
    const [ data3, setData3 ] = useState({})
    const [ comment2, setComment2 ] = useState("")
    const [ c, setC ] = useState(null)
    const [ tag, setTag ] = useState(null)
    const [ tags, setTags ] = useState(null)



    const myCommunity = Object.values(userCommunities)


    useEffect( () => {

        async function fetchData() {
            const response = await dispatch(postActions.thunkCreateComment(data2, singlePost.id))
        }
        fetchData()

    }, [dispatch, data2, singlePost.id])

    console.log(comment2)


    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    const handleClick2 = () => {
        setIsVisible2(!isVisible2);
    };

    const handleSave = (e) => {

        setData1({
            description
        })

        setIsVisible2(false)

    }

    const handleComment = (e) => {
        e.preventDefault()


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


    let comments

    if (singlePost.Comments && singlePost.Comments.length) comments = Object.values(singlePost.Comments).reverse()

    useEffect( () => {

        async function fetchData() {
            let response
            if (c && c.id) response = await dispatch(postActions.thunkUpdateComment(data3, c.id))
        }
        fetchData()

    }, [dispatch, c, data3])

    useEffect(() => {

        const handleDocumentClick = (event) => {
            if (isVisible && targetRef.current && !targetRef.current.contains(event.target)) {
                setIsVisible(false);

            }

        };

      document.addEventListener('click', handleDocumentClick);
      return () => {
          document.removeEventListener('click', handleDocumentClick);
        };

    }, [isVisible]);

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


    useEffect( () => {

        async function fetchData() {
            if (data1)  await dispatch(postActions.thunkUpdatePosts(singlePost?.id, data1))
            let data
            if (id) data =  await dispatch(postActions.thunkGetDetailsById(id))
            setDeleted(data)
            if (data)  await dispatch(communityActions.thunkGetDetailsById(data?.communityId))

            console.log("TAGS", data1)
        }
        fetchData()


    }, [dispatch, data1, id])

    useEffect( () => {

        async function fetchData() {

            if (singlePost.PostSetting?.history) await dispatch(postActions.thunkUpdateHistory(singlePost.id))
            else if (!singlePost.PostSetting || singlePost.PostSetting && !singlePost.PostSetting.history) await dispatch(postActions.thunkCreateHistory(singlePost.id))

        }
        fetchData()

    }, [dispatch, singlePost.PostSetting])


    useEffect( () => {
        if (singlePost.tags) setTags(singlePost.tags.split(','))
    }, [dispatch, singlePost.tags])

    if (!Object.values(singlePost).length) return <h2></h2>



    let editMenu = isVisible ? "edit-menu" : "hidden";

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

    let editMenu2 = isVisible3 ? "edit-menu" : "hidden";



    return (

    <>
    <div onClick={(() => history.push(`/communities/${singleCommunity.id}`))} id="comm-head">
        <img src={ singlePost.Community && singlePost.Community.communityStyles && singlePost.Community.communityStyles.length ? singlePost.Community.communityStyles[0].profile : "https://external-preview.redd.it/2ha9O240cGSUZZ0mCk6FYku61NmKUDgoOAJHMCpMjOM.png?auto=webp&s=3decd6c3ec58dc0a850933af089fb3ad12d3a505"}></img>
        <h1>l/{singleCommunity.name}</h1>
    </div>
    { myCommunity.length && myCommunity[0].id !== singlePost.communityId ? <div id="comm-head10">
        <p>Posts</p>
    </div> : null}
    <div className="whole-post-page">
        <div className="post-page">
        <div id="vote-side">
        <PostLikes post={singlePost} />
        </div>
        <div id="details-side">
        <p>Posted by l/{singlePost?.User?.username} just now<i class="fi fi-rs-cowbell"></i></p>
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
        { isVisible2 ? <div id="save"><button onClick={handleClick2} >Cancel</button> <button id={ !description ? "save-submit" : "save-submit2"} onClick={handleSave}>Save</button></div> : null}
        <div id="post-extras1">
            <div id="comment5">
            <i class="fa-regular fa-message"></i>
            <p>{comments && comments.length}</p>
            </div>
            <div onClick={(() => window.alert("Feature not avaliable"))} id="comment4">
                <i class="fi fi-rs-heart-arrow"></i>
                <p>Share</p>
            </div>
            <div onClick={(() => window.alert("Feature not avaliable"))} id="comment4">
                <i class="fi fi-rs-check-circle"></i>
                <p>Approved</p>
            </div>
            <div onClick={(() => window.alert("Feature not avaliable"))} id="comment4">
                <i class="fi fi-rs-circle-cross"></i>
                <p>Removed</p>
            </div>
            <div onClick={(() => window.alert("Feature not avaliable"))} id="comment4">
                <i class="fi fi-rr-box"></i>
                <p>Spam</p>
            </div>
            <div onClick={(() => window.alert("Feature not avaliable"))} id="comment4">
                <i class="fi fi-rs-shield"></i>
            </div>
            <div id="comment4">
                <i class="fa-brands fa-reddit-alien"></i>
            </div>
            <i  onClick={handleClick} id="menu" class="fi fi-rr-menu-dots"></i>
            <div className="menu">
            <div ref={targetRef} id={editMenu}>
                {!singlePost.PostImages?.length ? <p onClick={(() => setIsVisible2(true))}><i class="fi fi-rr-magic-wand"></i>Edit</p> : null}
                <p><i class="fi fi-rr-bookmark"></i>Save</p>
                <p><i class="fi fi-rr-eye-crossed"></i>Hide</p>
                <p onClick={(() => {
                    setModalContent2(<DeletePost id={id} deleted={deleted}/>)
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
        <div id="insights">
            <p>Post Insights</p>
            <p>Check back later to see views, shares, and more. <span>Share your post</span> to spread the word!</p>
        </div>
        <div className="comment-input">
        {user ? <p>Comment as <span>{user.username}</span></p> : "Please login"}
            <textarea onFocus={(() => setFocus(true))} onBlur={(() => setFocus(false))}  value={comment} onChange={((e) => setComment(e.target.value))} placeholder="What are your thoughts?"></textarea>
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
            <button id={!comment ? "submit-c3" : "submit-c4"} onClick={handleComment}>Comment</button>

        </div>
        </div>
        <div className="comments-for-post">
            <div onClick={(() => window.alert("Feature not avaliable"))} id="sort-comments">
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
                                    <textarea onFocus={(() => setFocus3(true))} onBlur={(() => setFocus3(false))} defaultValue={c.comment} onChange={((e) => setComment2(e.target.value))} ></textarea>
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
        <div className="side-community">
        <CommunitiesProfile community={singlePost.Community} page={"/postId"}/>
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
        <button className="top2" onClick={((e) => window.scrollTo({ top: 0, left: 0, behavior: "smooth"}))}>Back to Top</button>
        </div>
    </div>
    </>
    )
}

export default PostPage
