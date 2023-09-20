import "./CreatePostPage.css"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as postActions from "../../store/posts"
import { useHistory, useParams } from "react-router-dom";
import * as communityActions from '../../store/communities'
import { useRef } from "react";
// import axios from "axios";



function PostForm() {
    const { communities, singleCommunity, communityMemberships, userCommunities } = useSelector((state) => state.communities)
    //const { singleCommunity2 } = useSelector((state) => state.posts)
    const { user } = useSelector((state) => state.session)
    const history = useHistory()
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ imageDescription, setImageDescription ] = useState("");
    const [ linkDescription, setLinkDescription ] = useState("");
    const [ oc, setOc ] = useState(false);
    const [ spoiler, setSpolier ] = useState(false);
    const [ nsfw, setNsfw ] = useState(false);
    const [ isDisabled, setIsDisabled ] = useState(false)
    const [ isDisabled2, setIsDisabled2 ] = useState(false)
    const [ data1, setData1 ] = useState({});
    const [ dataImg, setDataImg ] = useState({});
    const [ post, setPost ] = useState(true)
    const [ image, setImage ] = useState(false)
    const [ link, setLink ] = useState(false)
    const { button } = useParams()
    const [ focus, setFocus ] = useState(false)
    const fileInputRef = useRef(null);
    const fileInputRef2 = useRef(null);
    const fileInputRef3 = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imagePreview2, setImagePreview2] = useState(null);
    const [imagePreview3, setImagePreview3] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [ numImages, setNumImages ] = useState([])
    const [ imageId, setImageId ] = useState(null)
    const [ moreImages, setMoreImages ] = useState(null)
    const [ boxOne, setBoxOne ] = useState(false)
    const [ boxTwo, setBoxTwo ] = useState(false)
    const [ boxThree, setBoxThree ] = useState(false)
    const [ boxFour, setBoxFour ] = useState(false)
    const [ restrict, setRestrict ] = useState(false)



    let images = []


    let members
    if (communityMemberships) members = Object.values(communityMemberships)

    let approved = members.some((m) => m.status === "Approved" && m.userId === user.id) && singleCommunity.id

    approved = !approved && singleCommunity.id ? false : true

    let profile = Object.values(userCommunities).filter((c) => c.type === "Profile" && c.userId === user.id)

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

        async function fetchData() {
          if (singleCommunity && singleCommunity.id)  await dispatch(communityActions.thunkGetCommunityMemberships(singleCommunity.id))
        }
        fetchData()

        if (singleCommunity.type === "Public" && title.length) {
          setIsDisabled(false);
        }
        else if (!approved && singleCommunity.type === "Restricted" || !approved && singleCommunity.type === "Private") {
            setIsDisabled(true);
        }
        else if (title.length && singleCommunity.type === "Profile") {
            setIsDisabled(false)
        }
        else if (approved && singleCommunity.type === "Restricted" && title.length || approved && singleCommunity.type === "Private" && title.length) {
            setIsDisabled(false)
        }
        else if (singleCommunity.userId === user.id && title.length ) {
            setIsDisabled(false)
        }
        else if (!singleCommunity.id) {
            setIsDisabled(true)
        }
        else {
          setIsDisabled(true);
        }

        if (approved && title.length && singleCommunity.id) {
            setIsDisabled2(false)
        }
        else {
            setIsDisabled2(true)
        }

    }, [singleCommunity.id, title, approved]);

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [selectedImage3, setSelectedImage3] = useState(null);

    const triggerFileInput = () => {
        fileInputRef.current.click();

    };

    const triggerFileInput2 = () => {
        fileInputRef2.current.click();
    };

    const triggerFileInput3 = () => {
        fileInputRef3.current.click();
    };



    const handleImageChange2 = (e) => {
      const file = e.target.files[0];

      if (file) {
          setSelectedImage2(file);

        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreview2(reader.result);
        };


        reader.readAsDataURL(file); // Read the selected file as a data URL
      } else {
        setSelectedImage2(null);
        setImagePreview2(null);
      }
    };

    const handleImageChange = (e) => {
        //setSelectedImage(e.target.files[0]);
        const file = e.target.files[0];

        if (file) {
            setSelectedImage(file);

          const reader = new FileReader();

          reader.onloadend = () => {
              setImagePreview(reader.result);
              setNumImages([...numImages, { imagePreview: reader.result }]);
          };


          reader.readAsDataURL(file);
        } else {
          setSelectedImage(null);
          setImagePreview(null);
        }
      };

      const handleImageChange3 = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedImage3(file);

          const reader = new FileReader();

          reader.onloadend = () => {
              setImagePreview3(reader.result);
          };


          reader.readAsDataURL(file);
        } else {
          setSelectedImage3(null);
          setImagePreview3(null);
        }
      };


    const [ key, setKey ] = useState(Date.now()); // Create a unique key
    const [ key2, setKey2 ] = useState(Date.now()); // Create a unique key
    const [ key3, setKey3 ] = useState(Date.now()); // Create a unique key


    function cancelImageChange() {
        setSelectedImage(null);
        setImagePreview(null)
        setBoxOne(false)
        setKey(Date.now());
    }

    function cancelImageChange2() {
        setSelectedImage2(null);
        setImagePreview2(null)
        setBoxTwo(false)
        setKey2(Date.now());
    }

    function cancelImageChange3() {
        setSelectedImage3(null);
        setImagePreview3(null)
        setBoxThree(false)
        setKey3(Date.now());
    }


    const [isHovered, setIsHovered] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);

    function handleMouseEnter(i) {
      setImageId(i)
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setImageId(null)
      setIsHovered(false);
    };

    useEffect(() => {

        async function fetchData() {

            const postResponse = await dispatch(postActions.thunkCreatePost(data1, singleCommunity.id, moreImages));

            if (!postResponse) {
                return;
            }

            history.push(`/posts/${postResponse.id}`);
        }

        fetchData();
        }, [dispatch, data1, moreImages, history]);

       const [ load, setLoad ] = useState()


    const handleSubmit = async () => {

        setLoad(true)

        if (selectedImage && selectedImage2 && selectedImage3 ) {
            setMoreImages([
                selectedImage, selectedImage2, selectedImage3
            ])
        }
        else if (selectedImage && selectedImage2 ) {
            setMoreImages([
                selectedImage, selectedImage2
            ])
        }

        let tags = ""

        if (oc) tags += ",oc"
        if (spoiler) tags += ",spoiler"
        if (nsfw) tags += ",nsfw"

        if (tags) {

            if (title) {
                tags = tags.slice(1, tags.length)
                setData1({
                    title,
                    tags,
                 })

            }
            if (title && description) {
                tags = tags.slice(1, tags.length)
                setData1({
                    title,
                    description,
                    tags,
                 })

            }
            if (linkDescription) {
                tags = tags.slice(1, tags.length)
                setData1({
                    title,
                    description: linkDescription,
                    tags,
                 })
            }
            else if (!tags && description) {
                setData1({
                    title,
                    description
                })

            }
            else if (!tags && linkDescription) {
                setData1({
                    title,
                    description: linkDescription
                })

            }


        }
        else {
            setData1({
                title,
                description
            })

        }

    }
    let idName = isVisible ? "search2" : "hidden";
    let idName2 = !isVisible ? "choose-comms3" : "choose-comms1";


    return (
            <div className="form">
                    <div id="type-of-post">
                    <p onClick={handlePost} id={postIdName}><i class="fi fi-rr-blog-text"></i><span>Post</span></p>
                    <p onClick={handlePicture}id={imageIdName}><i class="fi fi-rr-picture"></i><span>Image & Video</span></p>
                    <p onClick={handleLink}id={linkIdName}><i class="fi fi-rr-link-alt"></i><span>Link</span></p>
                    <p id="pol"><i class="fi fi-rr-square-poll-vertical"></i>Poll</p>
                    </div>
                    <div id="padding3">
                    <div style={{ position: "relative"}} className="post-input2">
                    <input type="text" placeholder="Title" maxLength={300} onChange={((e) => setTitle(e.target.value))}></input>
                    <span id="title-limit">{title.length}/300</span>
                    </div>
                    <div className="post-input">
                    {post && <div id={ focus ? "add-to2" : "add-to"}>
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
                    {post && <textarea onFocus={(() => setFocus(true))} onBlur={(() => setFocus(false))} id="description-posts" onChange={((e) => setDescription(e.target.value))} placeholder="Text(optional)"></textarea>}
                        { image &&
                        <>
                        <input
                        id="boxOne"
                        key={key} // Set the key on the file input
                        ref={fileInputRef}
                        onChange={((e) => {
                            if (selectedImage) cancelImageChange()
                            handleImageChange(e)
                            setBoxOne(true)
                        })}
                        style={{ position: "absolute", zIndex: "-1"}} type="file">
                        </input>
                        <input
                        id="boxTwo"
                        ref={fileInputRef2}
                        key={key2} // Set the key on the file input
                        onChange={((e) => {
                            if (selectedImage2) cancelImageChange2()
                            handleImageChange2(e)
                            setBoxTwo(true)
                        })}
                        style={{ position: "absolute", zIndex: "-1"}} type="file">
                        </input>
                        <input
                        id="boxThree"
                        key={key3} // Set the key on the file input
                        ref={fileInputRef3}
                        onChange={((e) => {
                            if (selectedImage3) cancelImageChange3()
                            handleImageChange3(e)
                            setBoxThree(true)

                        })}
                        style={{ position: "absolute", zIndex: "-1"}} type="file">
                        </input>
                        </>

                        }
                        {image && !selectedImage && !selectedImage2 && !selectedImage3 ? <div id="input-upload">
                        <label style={{ width: "100%", position: "absolute", zIndex: "2", display: "flex", gap: "10px", alignItems: "center", justifyContent: "center", color: `${singleCommunity.CommunityStyle?.highlight}` }}><span>Drag and drop images or</span>
                        <button onClick={(() => {
                            triggerFileInput()

                        })} style={{ cursur: "pointer", color: `${singleCommunity.CommunityStyle?.highlight}`, borderColor: `${singleCommunity.CommunityStyle?.highlight}`}}id="upload-b">Upload</button></label>
                        </div> :
                        image && <div id="input-uploaded">
                            <>
                       { (boxOne || selectedImage) && <div id="i-selected"
                        onMouseEnter={(() => setIsHovered(true))}
                        onMouseLeave={(() => setIsHovered(false))}
                        >
                        <i onClick={(() => {
                            cancelImageChange()

                        })} id={ isHovered ? "i-no" : "hidden"}
                        class="fi fi-sr-cross-circle"></i>
                        <img style={{ width: "100%", height: "100%", borderRadius: "4px"}} src={imagePreview}></img>
                        </div>}
                        { (boxTwo || selectedImage2) &&<div id="i-selected"
                        onMouseEnter={(() => setIsHovered2(true))}
                        onMouseLeave={(() => setIsHovered2(false))}
                        >
                        <i onClick={(() => {
                            cancelImageChange2()
                        })} id={ isHovered2 ? "i-no" : "hidden"}
                        class="fi fi-sr-cross-circle"></i>
                        <img style={{ width: "100%", height: "100%", borderRadius: "4px"}} src={imagePreview2}></img>
                        </div>}
                        { (boxThree || selectedImage3) && <div id="i-selected"
                        onMouseEnter={(() => setIsHovered3(true))}
                        onMouseLeave={(() => setIsHovered3(false))}
                        >
                        <i onClick={(() => {
                            cancelImageChange3()
                        })} id={ isHovered3 ? "i-no" : "hidden"}
                        class="fi fi-sr-cross-circle"></i>
                        <img style={{ width: "100%", height: "100%", borderRadius: "4px"}} src={imagePreview3}></img>
                        </div>}
                        { boxOne && !selectedImage2 && <div
                            onClick={(() => {
                                triggerFileInput2()
                            })}
                            id="i-more"><i id="i-m" class="fa-solid fa-plus"></i></div>}
                        { boxOne && boxTwo && !selectedImage3 && <div
                            onClick={(() => {
                            triggerFileInput3()
                            })} id="i-more"><i id="i-m" class="fa-solid fa-plus"></i></div>}
                            { !boxOne && !selectedImage && <div
                            onClick={(() => {
                            triggerFileInput()
                            })} id="i-more"><i id="i-m" class="fa-solid fa-plus"></i></div>}
                        { boxThree && boxOne && boxTwo && <div onClick={(() => window.alert("You can only upload up to three"))} id="i-more"><i id="i-m" class="fa-solid fa-plus"></i></div>}
                            </>
                        </div>
                        }
                    {link && <input onChange={((e) => setLinkDescription(e.target.value))} placeholder="Url"></input>}
                    </div>
                    {(singleCommunity.type === "Restricted" || singleCommunity.type === "Private") && !approved && (profile[0]?.id !== singleCommunity?.id) && <div id="Unapproved">
                            <span style={{ fontSize: "12px", fontWeight: "900", marginBottom: "4px"}}>Request to post is pending...</span>
                            <span style={{ fontSize: "14px"}}>Your request to post in {singleCommunity.name} was sent and is pending. In the meantime, you can draft a post and</span>
                            <span style={{ fontSize: "14px", color: "#0079D3", cursor: "pointer"}}>browse the community</span>
                    </div> }
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
                        {singleCommunity.type !== "Profile" ? <i onClick={(() => window.alert("Feature not available"))} class="fi fi-rr-followcollection"></i> : null}
                        <button onClick={(() => window.alert("Feature not avaliable"))} id="draft">Save Draft</button>
                    { singleCommunity.userId === user.id && isDisabled && <button className={singleCommunity.type !== "Profile" ? "marg" : ""} disabled={isDisabled} id={"post"}>Post{singleCommunity.type !== "Profile" ? <i style={{ backgroundColor: `${singleCommunity.CommunityStyle?.highlight}`}} class="fi fi-sr-tool-box"></i> : null }</button> }
                    { !load && singleCommunity.userId === user.id && !isDisabled && <button style={{ backgroundColor: `${singleCommunity.CommunityStyle?.highlight}`}} className={singleCommunity.type !== "Profile" ? "marg" : ""} disabled={isDisabled} id={"post2"} onClick={handleSubmit}>Post{singleCommunity.type !== "Profile" ? <i style={{ backgroundColor: `${singleCommunity.CommunityStyle?.highlight}`}} class="fi fi-sr-tool-box"></i> : null }</button> }
                    { load && singleCommunity.userId === user.id && !isDisabled ? <button id="post"><i id="load" style={{ fontSize: "20px", height: "20px"}} class="fi fi-rr-spinner"></i></button> : null}

                    { singleCommunity.userId !== user.id && isDisabled2 ? <button onClick={(() => !approved ? setRestrict(true) : setRestrict(false))} className={""} id={"post"} >Post</button> : null}
                    { !load && singleCommunity.userId !== user.id && !isDisabled2 ? <button style={{ backgroundColor: `${singleCommunity.CommunityStyle?.highlight}`}} className={""} disabled={isDisabled2} id={"post2"} onClick={handleSubmit}>Post</button> : null}
                    { load && singleCommunity.userId !== user.id && !isDisabled2 ? <button id="post"><i id="load" style={{ fontSize: "20px", height: "20px"}} class="fi fi-rr-spinner"></i></button> : null}
                    </div>
                    { restrict ? <p style={{ textAlign: "right", color: "red", fontSize: "12px"}}>This community only allows trusted members to post here</p> : null}
                    </div>
                    <div id="notify-me">
                    <label>
                    <input type="checkbox" />
                    Send me post reply notifications
                    </label>
                    <p  style={{ color: `${singleCommunity.CommunityStyle?.highlight}`}} onClick={(() => window.alert("Feature not avaliable"))} >Connect accounts to share your post<i class="fi fi-rr-info"></i></p>
                    </div>
                </div>
    )
}

export default PostForm
