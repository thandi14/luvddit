import "./CreatePostPage.css"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as postActions from "../../store/posts"
import { useHistory, useParams } from "react-router-dom";

function PostForm() {
    const { communities, singleCommunity } = useSelector((state) => state.communities)
    const { singlePost } = useSelector((state) => state.posts)
    const history = useHistory()
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ imageDescription, setImageDescription ] = useState("");
    const [ linkDescription, setLinkDescription ] = useState("");
    const [ oc, setOc ] = useState(false);
    const [ spoiler, setSpolier ] = useState(false);
    const [ nsfw, setNsfw ] = useState(false);
    const [ isDisabled, setIsDisabled ] = useState(false)
    const [ data1, setData1 ] = useState({});
    const [ dataImg, setDataImg ] = useState({});
    const [ post, setPost ] = useState(true)
    const [ image, setImage ] = useState(false)
    const [ link, setLink ] = useState(false)
    const { button } = useParams()


    useEffect(() => {
        if (button === "image") {
            setImage(true)
            setPost(false)
            setLink(false)
        }
        if (button === "link") {
            setLink(true)
            setImage(false)
            setPost(false)
        }

    }, [])


    const handlePost = () => {
        setPost(true)
        setImage(false)
        setLink(false)

    }

    const handlePicture = () => {
        setImage(true)
        setPost(false)
        setLink(false)
    }

    const handleLink = () => {
        setLink(true)
        setImage(false)
        setPost(false)
    }

    let postIdName = post ? "p2" : "p"
    let imageIdName = image ? "i2" : "i"
    let linkIdName = link ? "l2" : "l"

    const dispatch = useDispatch()

    useEffect(() => {
        if (Object.values(singleCommunity).length && title.length) {
          setIsDisabled(false);
        } else {
          setIsDisabled(true);
        }
    }, [singleCommunity, title]);


    useEffect( () => {

        async function fetchData() {
            const response = await dispatch(postActions.thunkCreatePost(data1, singleCommunity.id, dataImg))
            console.log(response)
            if (response) history.push(`/posts/${response.id}`)

        }
        fetchData()

    }, [dispatch, data1, singleCommunity])



    const handleSubmit = async () => {
        let tags = ""

        if (oc) tags += ",oc"
        if (spoiler) tags += ",spoiler"
        if (nsfw) tags += ",nsfw"

        console.log("!!!!!!!!", tags)

        if (tags) {
            tags = tags.slice(1, tags.length)
            setData1({
                title,
                description,
                tags,
             })

        }
        if (imageDescription) {
            setData1({
                title
            })
            setDataImg({
                imgURL: imageDescription
            })
        }
        else if (!tags) {
            setData1({
                title,
                description
            })

        }



    }

    console.log(data1)


    return (
            <div className="form">
                    <div id="type-of-post">
                    <p onClick={handlePost} id={postIdName}><i class="fi fi-rr-blog-text"></i>Post</p>
                    <p onClick={handlePicture}id={imageIdName}><i class="fi fi-rr-picture"></i>Image & Video</p>
                    <p onClick={handleLink}id={linkIdName}><i class="fi fi-rr-link-alt"></i>Link</p>
                    <p id="pol"><i class="fi fi-rr-square-poll-vertical"></i>Poll</p>
                    </div>
                    <div id="padding3">
                    <div className="post-input2">
                    <input type="text" placeholder="Title" onChange={((e) => setTitle(e.target.value))}></input>
                    </div>
                    <div className="post-input">
                    {post && <div id="add-to">
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
                    </div>}
                    {post && <textarea onChange={((e) => setDescription(e.target.value))} placeholder="Text(optional)"></textarea>}
                    {image && <input onChange={((e) => setImageDescription(e.target.value))} placeholder="ImageUrl"></input>}
                    {link && <input onChange={((e) => setLinkDescription(e.target.value))} placeholder="Url"></input>}
                    </div>
                    <div id="tags">
                        <button onClick={((e) => setOc(!oc))} id={!oc ? "oc" : "oc2"}>
                           { !oc ? <i class="fi fi-rr-plus"></i> : <i class="fi fi-rr-check"></i> }
                            OC
                        </button>
                        <button onClick={((e) => setSpolier(!spoiler))} id={!spoiler ? "spoiler" : "spoiler2"}>
                            { !spoiler ? <i class="fi fi-rr-plus"></i> : <i class="fi fi-rr-check"></i> }
                            Spolier
                        </button>
                        <button onClick={((e) => setNsfw(!nsfw))} id={!nsfw ? "nsfw" : "nsfw2"}>
                            { !nsfw ? <i class="fi fi-rr-plus"></i> : <i class="fi fi-rr-check"></i> }
                            NSFW
                        </button>
                        <button onClick={(() => window.alert("Feature not avaliable"))} id="flair">
                            <i class="fi fi-rr-bookmark"></i>
                            Flair
                            <i class="fa-solid fa-chevron-down"></i>
                        </button>
                    </div>
                    <div id="border3"></div>
                    <div id="submit-buttons">
                        <button onClick={(() => window.alert("Feature not avaliable"))} id="draft">Save Draft</button>
                        <button disabled={isDisabled} id={isDisabled ? "post" : "post2"} onClick={handleSubmit}>Post</button>
                    </div>
                    </div>
                    <div id="notify-me">
                    <label>
                    <input type="checkbox" />
                    Send me post reply notifications
                    </label>
                    <p onClick={(() => window.alert("Feature not avaliable"))} >Connect accounts to share your post<i class="fi fi-rr-info"></i></p>
                    </div>
                </div>
    )
}

export default PostForm
