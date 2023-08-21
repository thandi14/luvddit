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

function PostPage() {
    const { singlePost } = useSelector((state) => state.posts)
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
    const { postComments } = useSelector((state) => state.comments)
    const [ data2, setData2 ] = useState({})
    const [ isLiked, setIsLiked ] = useState([]);

    const myCommunity = Object.values(userCommunities)

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
        console.log({
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

    let comments = Object.values(postComments)



    useEffect(() => {

        const handleDocumentClick = (event) => {
            console.log(isVisible)
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

        }
        fetchData()

    }, [dispatch, data1, id])

    if (!Object.values(singlePost).length) return <h2></h2>

    let editMenu = isVisible ? "edit-menu" : "hidden";

    console.log(singleCommunity)




    return (

    <>
    <div id="comm-head">
        <img src="https://external-preview.redd.it/2ha9O240cGSUZZ0mCk6FYku61NmKUDgoOAJHMCpMjOM.png?auto=webp&s=3decd6c3ec58dc0a850933af089fb3ad12d3a505"></img>
        <h1>l/{singleCommunity.name}</h1>
    </div>
    { myCommunity.length && myCommunity[0].id !== singlePost.communityId ? <div id="comm-head10">
        <p>Posts</p>
    </div> : null}
    <div className="whole-post-page">
        <div className="post-page">
        <div id="vote-side">
        <PostLikes post={singlePost}
        vote={isLiked.length && isLiked.some((l) => l.postId === singlePost.id && l.upVote === 1)}
        downVote={isLiked.length && isLiked.some((l) => l.postId === singlePost.id && l.downVote === 1)}
        />
        </div>
        <div id="details-side">
        <p>Posted by l/{singlePost?.User?.username} just now<i class="fi fi-rs-cowbell"></i></p>
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
        <div id="post-extras1">
            <div id="comment5">
            <i class="fa-regular fa-message"></i>
            <p>{singlePost.Comments?.length}</p>
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
        </div>
        <div id="insights">
            <p>Post Insights</p>
            <p>Check back later to see views, shares, and more. <span>Share your post</span> to spread the word!</p>
        </div>
        <div className="comment-input">
            <p>Comment as <span>{singlePost?.User?.username}</span></p>
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
        <div className="side-community">
        <CommunitiesProfile community={singlePost.Community} page={"/postId"}/>
        <button className="top2" onClick={((e) => window.scrollTo({ top: 0, left: 0, behavior: "smooth"}))}>Back to Top</button>
        </div>
    </div>
    </>
    )
}

export default PostPage
