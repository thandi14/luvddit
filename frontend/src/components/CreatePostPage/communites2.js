import { useSelector, useDispatch } from "react-redux"
import avatar from './IMG6.jpg'
import { useState, useEffect, useRef } from "react"
import * as communityActions from "../../store/communities"
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min"
import { useModal } from "../../context/Modal"


function CommunitiesProfile({ page, community }) {
    const { communities, userCommunities, singleCommunity, communityMemberships, memberships } = useSelector((state) => state.communities)
    const { user } = useSelector((state) => state.session)
    const [ id, setId ] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()
    const [ button, setButton ] = useState(false)
    const { closeModal } = useModal()
    const location = useLocation();
    const fileInputRef = useRef(null);
    const fileInputRef2 = useRef(null);
    let joined = null
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imagePreview2, setImagePreview2] = useState(null);
    const [ numI, setNumI ] = useState([])
    const [ numImages, setNumImages ] = useState([])
    const [ imageData, setImageData ] = useState([])

    let members
    if (communityMemberships) members = Object.values(communityMemberships)

    let approved = members.some((m) => m.status === "Approved" && m.userId === user?.id) && singleCommunity.id

    approved = !approved && singleCommunity.id ? false : true

    const myMemberships = Object.values(memberships)
    const member = myMemberships.filter((m) => m.id === singleCommunity.id)

    if (member) joined = true
    if (!member.length) joined = false


    useEffect(() => {

        async function fetchData() {
            if (location.pathname.includes("/profile/")) {
                if (community && community?.id) await dispatch(communityActions.thunkUpdateCommunityImages(community.id, [selectedImage || "", selectedImage2 || ""]))
              //  if (id) await dispatch(communityActions.thunkGetDetailsById(id))
                if (community && community?.id) await dispatch(communityActions.thunkGetDetailsById(community?.id))
            }
        }

        fetchData()

    }, [dispatch, id, selectedImage, selectedImage2])

    const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 101));

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const newRandomNum = Math.floor(Math.random() * 101);
            setRandomNum(newRandomNum);
        }, 10000);

        return () => {
            clearTimeout(timeoutId);
        };

    }, []);

    const handleJoinClick = async (e) => {
        let response
        e.stopPropagation()
        joined = true
        if (singleCommunity.type === "Public") await dispatch(communityActions.thunkJoinCommunities(singleCommunity.id))
        if (singleCommunity.type === "Private" || singleCommunity.type === "Restricted") await dispatch(communityActions.thunkJoinCommunities(singleCommunity.id, singleCommunity.type))
      }

      const handleUnjoinClick = async (e) => {
        let response
        e.stopPropagation()
        joined = false
        response = await dispatch(communityActions.thunkUnjoinCommunities(singleCommunity.id))
      }

    const handleClick = (e) => {
        e.stopPropagation()
        if (community.type === "Profile") return
        closeModal()
        history.push(`/communities/${community.id}/:page`)

    }

    if (!community) return <h1></h1>
    let userCommunity = Object.values(community)

    let createdAt
    if (Object.values(community).length) createdAt = new Date(community.createdAt)

    const dateObject = new Date(createdAt);

    const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const triggerFileInput = (e) => {
        e.stopPropagation()
        fileInputRef.current.click();

    };

    const triggerFileInput2 = (e) => {
        e.stopPropagation()
        fileInputRef2.current.click();
    };



    let myCommunities
    if (Object.values(userCommunities).length) myCommunities = Object.values(userCommunities)

    let firstCommunity
    if (myCommunities) firstCommunity = myCommunities[0].id

    const formattedDate = `${months[dateObject.getMonth()]}, ${dateObject.getDate()}, ${dateObject.getFullYear()}`;

    let style
    if (community.CommunityStyle) style = community.CommunityStyle

    function cancelImageChange() {
        setSelectedImage(null);
        setNumI(numI - 1)
        // Assuming that you need to trigger a re-render
    }

    function cancelImageChange2() {
        setSelectedImage2(null);
        setNumI(numI - 1)
        // Assuming that you need to trigger a re-render
    }

 const handleImageChange2 = async (e) => {
        //setSelectedImage(e.target.files[0]);
    const file = e.target.files[0];

    //   numImages.push(1)

    // Check if a file was selected
    if (file) {
        setSelectedImage2(file)
        await dispatch(communityActions.thunkUpdateCommunityImages(community.id, [selectedImage || "", selectedImage2 || ""]))

        // if (selectedImage) setImageData([ selectedImage, selectedImage2])
        // else setImageData([ "", selectedImage2])
       // handleProfile()
        // Create a FileReader to read and display the image
        const reader = new FileReader();

        // reader.onloadend = () => {
        //     images.push(reader.result)
        //     setNumImages(images)

        // };
        reader.onloadend = () => {
            setImagePreview2(reader.result);
        };


        reader.readAsDataURL(file); // Read the selected file as a data URL
    } else {
        setSelectedImage2(null);
        setImagePreview2(null);
    }
    };

    const handleImageChange = async (e) => {
        //setSelectedImage(e.target.files[0]);
        const file = e.target.files[0];
        //   numImages.push(1)

        // Check if a file was selected
        if (file) {
            setSelectedImage(file);

       //  handleProfile()
       await dispatch(communityActions.thunkUpdateCommunityImages(community.id, [selectedImage || "", selectedImage2 || ""]))

        //   if (selectedImage2) setImageData([ selectedImage, selectedImage2])
        //   else setImageData([selectedImage, ""])

        // Create a FileReader to read and display the image
        const reader = new FileReader();

        // reader.onloadend = () => {
        //     images.push(reader.result)
        //     setNumImages(images)

        // };
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setNumImages([...numImages, { imagePreview: reader.result }]);
        };


        reader.readAsDataURL(file); // Read the selected file as a data URL
        } else {
        setSelectedImage(null);
        setImagePreview(null);
        }
    };


    function isURLOrFile(str) {
        const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
        if (urlRegex) return urlRegex.test(str);
        const filePathRegex = /^[a-zA-Z]:\\([a-zA-Z0-9\s_@-^!#$%&+={}[\]]+\\)*[a-zA-Z0-9\s_@-^!#$%&+={}[\]]+\.\w{1,}$/;
        if (filePathRegex) return filePathRegex.test(str);
    }


    function reduceOpacity(color, opacity) {
        if (/^#/.test(color)) {
          // If the color is a hex value
          const hexColor = color.replace('#', '');
          const r = parseInt(hexColor.slice(0, 2), 16);
          const g = parseInt(hexColor.slice(2, 4), 16);
          const b = parseInt(hexColor.slice(4, 6), 16);

          return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        } else {
          // If the color is a named color
          const tempElement = document.createElement('div');
          tempElement.style.color = color;
          document.body.appendChild(tempElement);

          const computedColor = getComputedStyle(tempElement).color;
          const match = computedColor.match(/\d+/g);
          const [r, g, b] = match ? match.map(Number) : [0, 0, 0];

          document.body.removeChild(tempElement);

          return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
      }


    return (
        <>

        <input type="file"
        ref={fileInputRef}
        onChange={((e) => {
            handleImageChange(e)
            setNumI(1)
        })}
        style={{ position: "absolute", zIndex: "-1", width: "0px"}}></input>
        <input type="file"
        ref={fileInputRef2}
        onChange={((e) => {
            handleImageChange2(e)
            setNumI(2)
        })}
        style={{ position: "absolute", zIndex: "-3", width: "0px"}}></input>
        {community.type === "Profile" ? <div onClick={(() => closeModal())} className="your-community">
       { isURLOrFile(community.CommunityStyle?.banner) || imagePreview2 ? <div onClick={((e) => {
                    if (community.User?.id === user?.id || singleCommunity.User?.id === user?.id ) history.push('/profile/:page')
                    return
                    })}style={{ position: "relative", backgroundSize: "100% 100%", backgroundImage: imagePreview2 ? `url(${imagePreview2})` : `url(${community.CommunityStyle.banner})`}} id="profile-header">
        {community.User?.id === user?.id || singleCommunity.User?.id === user?.id ? <span onClick={triggerFileInput2}id="a-img2"><i class="fi fi-rr-camera"></i></span> : null }
        </div>
        :
        <div onClick={((e) => {
            if (community.User?.id === user?.id || singleCommunity.User?.id === user?.id ) history.push('/profile/:page')
            return
            })}style={{ position: "relative" }} id="profile-header">
        {community.User?.id === user?.id || singleCommunity.User?.id === user?.id  ? <span onClick={triggerFileInput2}id="a-img2"><i class="fi fi-rr-camera"></i></span> : null }
        </div>}
        <div id="your-community">
        <div style={{ position: "relative" }} id="yc-avatar">
        { !imagePreview && !community.CommunityStyle?.icon && <img src={avatar}></img>}
        { imagePreview && <img src={imagePreview}></img>}
        { !imagePreview && community.CommunityStyle?.icon && <img src={community.CommunityStyle?.icon}></img>}
        { community.User?.id === user?.id || singleCommunity.User?.id === user?.id  ?<span onClick={triggerFileInput} id="a-img"><i class="fi fi-rr-camera"></i></span> : null }
        </div>
        <div id="user-community2">
        <span onClick={((e) => {
                    if (community.User?.id === user?.id || singleCommunity.User?.id === user?.id ) history.push('/profile/:page')
                    return
                    })}>u/{userCommunity[2]}</span>
        { community.User?.id === user?.id && <i onClick={(() => window.alert("Feature not available"))} class="fi fi-rr-settings"></i> }
        </div>
        {community.User?.id === user?.id ? <button onClick={(() => window.alert("Feature not available"))} id="user-button"><p>Create Avatar</p><i class="fi fi-rr-angle-small-right"></i></button> : null}
        <div id="community-info">
            <div>
            <span id="ci-name">Karma</span>
            <span id="ci-icon"><i class="fi fi-rr-star-christmas"></i>{user?.karma}</span>
            </div>
            <div>
            <span id="ci-name">Cake day</span>
            <span id="ci-icon"><i class="fi fi-rr-cake-birthday"></i>{formattedDate}</span>
            </div>
        </div>
        { community.User?.id === user?.id ? <button onClick={(() => window.alert("Feature not available"))} id="social-button"><i class="fi fi-rr-plus"></i>Add social link</button> : null }
        { community.User?.id !== user?.id ? <button onClick={((e) => {
            e.stopPropagation()
            window.alert('Feature not avaliable')
            })} id="follow">Follow</button> : null }
        {page === "/postId" || page === '/profile' ? <button onClick={(e) => {
            e.stopPropagation()
            history.push('/posts/new')
        }} style={{ margin: "0px" }} id="another">New Post</button> : null}
        <div id="options-link">
        <span onClick={((e) => {
            e.stopPropagation()
            window.alert('Feature not avaliable')
            })} >More Options</span>
        </div>
        </div>
        </div> :
         <div onClick={handleClick} id="your-community-profile">
                    {!singleCommunity.CommunityStyle?.banner ? <div style={{ backgroundColor: `${singleCommunity.CommunityStyle?.base}`}} id="header-profile-comm4">
                    </div> : <div className="header-postC"><img id="header-profile-comm10" src={singleCommunity.CommunityStyle?.banner} ></img></div> }
                    <div id="profile-content">
                        <span id="profile-comm-title7">{ singleCommunity.CommunityStyle?.icon ? <img id="PFP36" src={singleCommunity.CommunityStyle?.icon}></img> : <div style={{ backgroundColor: `${singleCommunity.CommunityStyle?.base}`}} >l/</div>}{community?.name}</span>
                        <span id="profile-about7">{community?.about}</span>
                        <span id="when-created"><i class="fi fi-rr-cake-birthday"></i>Created {formattedDate}</span>
                        <div id="line"></div>
                        <div id="cs-side9">
                        <span><div>{community?.CommunityMembers}</div>Members</span>
                         <span><div id="online"><i class="fi fi-ss-bullet"></i>{randomNum}</div>Online</span>
                        </div>
                        <div id="line"></div>
                        {location.pathname.includes("/new") ? null : user && myMemberships.length && joined && !button ? <button  onMouseEnter={(() => setButton(true))} style={{ color: `${style.highlight}`, border: `1px solid ${style.highlight}`, width: "100%"}} onClick={handleUnjoinClick} id="joined">Joined</button> : null }
                        {location.pathname.includes("/new") ? null : user && myMemberships.length && joined && button ? <button  onMouseLeave={(() => setButton(false))} style={{ backgroundColor: `${reduceOpacity(style.highlight, 0.1)}`, color: `${style.highlight}`, border: `1px solid ${style.highlight}`, width: "100%"}} onClick={handleUnjoinClick} id="joined">Leave</button> : null }
                        {location.pathname.includes("/new") ? null : user && !myMemberships.length && !joined ? <button style={{ width: "100%", backgroundColor: `${style.highlight}`, border: `1px solid ${style.highlight}`}} onClick={handleJoinClick} id="join">Join</button> : null }
                        {/* {location.pathname.includes("/new") ? null : user && myMemberships.length && joined && button ? <button  onMouseEnter={(() => setButton(false))} style={{ color: `${style.highlight}`, border: `1px solid ${style.highlight}`, width: "92%", boxSizing: "border-box"}} onClick={handleUnjoinClick} id="joined">Joined</button> : null }
                        {location.pathname.includes("/new") ? null : user && myMemberships.length && joined && !button ? <button  onMouseLeave={(() => setButton(true))} style={{ color: `${style.highlight}`, border: `1px solid ${style.highlight}`, width: "92%"}} onClick={handleUnjoinClick} id="joined">Leave</button> : null }
                        {location.pathname.includes("/new") ? null : user && !myMemberships.length && !joined ? <button style={{ backgroundColor: `${style.highlight}`, border: `1px solid ${style.highlight}`}} onClick={handleJoinClick} id="join">Join</button> : null } */}
                        {/* {location.pathname.includes("/new") ? null : member.length && joined ? <button onClick={handleUnjoinClick} id="join-now2">Joined</button> : <button onClick={handleJoinClick} id="join-now">Join</button> }
                        {!location.pathname.includes("/new") && <div id="line"></div>} */}
                        <div id="cs-side5">
                        <span onClick={(() => window.alert("Feature coming soon"))}>COMMUNITY OPTIONS</span>
                        <i class="fa-solid fa-chevron-down"></i>
                </div>

                </div>

                </div> }
        </>
    )
}

export default CommunitiesProfile
