import { useSelector, useDispatch } from "react-redux"
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import * as communityActions from "../../store/communities"
import { useEffect, useState } from "react";
import './CommunityPage.css'
import avatar from "./imagedit2.png"
import pfp from "./IMG6.jpg"
import YourCommunitesProfile from "./communites3";
import { useModal } from "../../context/Modal";
import PostPageModal from "../PostPage/PostPageModal";
import * as postsActions from '../../store/posts'
import PostLikes from "../HomePage/likes";
import Navigation from "../Navigation";

function CommunityPageEdit2() {
  const { id } = useParams();
  const { communities, singleCommunity, communityMemberships, userCommunities } = useSelector((state) => state.communities);
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.session);
  const { setModalContent } = useModal()
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const history = useHistory()
  const [ isLiked, setIsLiked ] = useState([]);
  const [ joined, setJoined ] = useState(null)
  const [ scrolling, setScrolling ] = useState(false)
  const [ icon, setIcon ] = useState(false)
  const [ banner, setBanner ] = useState(false)
  const [ body, setBody ] = useState(false)
  const [ message, setMessage] = useState(false)
  const [ button, setButton ] = useState(true)
  const [ base, setBase ] = useState(singleCommunity.CommunityStyle?.base)
  const [ highlight, setHighlight ] = useState(singleCommunity.CommunityStyle?.highlight)
  const [ background, setBackground ] = useState(singleCommunity.CommunityStyle?.background)
  const [ red, setRed ] = useState(false)
  const [ orange, setOrange ] = useState(false)
  const [ yellow, setYellow ] = useState(false)
  const [ green, setGreen ] = useState(false)
  const [ blue, setBlue ] = useState(false)
  const [ purple, setPurple ] = useState(false)
  const [ pink, setPink ] = useState(false)
  const [ grey, setGrey ] = useState(false)
  const [ colorPicker, setColorPicker ] = useState(false)
  const [ colorPicker2, setColorPicker2 ] = useState(false)
  const [ colorPicker3, setColorPicker3 ] = useState(false)
  const [ red2, setRed2 ] = useState(false)
  const [ orange2, setOrange2 ] = useState(false)
  const [ yellow2, setYellow2 ] = useState(false)
  const [ green2, setGreen2 ] = useState(false)
  const [ blue2, setBlue2 ] = useState(false)
  const [ purple2, setPurple2 ] = useState(false)
  const [ pink2, setPink2 ] = useState(false)
  const [ grey2, setGrey2 ] = useState(false)
  const [ red3, setRed3 ] = useState(false)
  const [ orange3, setOrange3 ] = useState(false)
  const [ yellow3, setYellow3 ] = useState(false)
  const [ green3, setGreen3 ] = useState(false)
  const [ blue3, setBlue3 ] = useState(false)
  const [ purple3, setPurple3 ] = useState(false)
  const [ pink3, setPink3 ] = useState(false)
  const [ grey3, setGrey3 ] = useState(false)
  const [ data3, setData3 ] = useState({})

  const handleIcon = () => {
    setIcon(true)
    setBanner(false)
    setBody(false)
  }

  useEffect(() => {
    setBase(singleCommunity.CommunityStyle?.base)
    setHighlight(singleCommunity.CommunityStyle?.highlight)
  }, [singleCommunity.CommunityStyle?.base])

  function handleColor(color, set) {
    if (color === "red") {
      setRed(true)
      setOrange(false)
      setYellow(false)
      setGreen(false)
      setBlue(false)
      setPurple(false)
      setPink(false)
      setGrey(false)
    }
    if (color === "orange") {
      setRed(false)
      setOrange(true)
      setYellow(false)
      setGreen(false)
      setBlue(false)
      setPurple(false)
      setPink(false)
      setGrey(false)
    }
    if (color === "yellow") {
      setRed(false)
      setOrange(false)
      setYellow(true)
      setGreen(false)
      setBlue(false)
      setPurple(false)
      setPink(false)
      setGrey(false)
    }
    if (color === "green") {
      setRed(false)
      setOrange(false)
      setYellow(false)
      setGreen(true)
      setBlue(false)
      setPurple(false)
      setPink(false)
      setGrey(false)
    }
    if (color === "blue") {
      setRed(false)
      setOrange(false)
      setYellow(false)
      setGreen(false)
      setBlue(true)
      setPurple(false)
      setPink(false)
      setGrey(false)
    }
    if (color === "purple") {
      setRed(false)
      setOrange(false)
      setYellow(false)
      setGreen(false)
      setBlue(false)
      setPurple(true)
      setPink(false)
      setGrey(false)
    }
    if (color === "pink") {
      setRed(false)
      setOrange(false)
      setYellow(false)
      setGreen(false)
      setBlue(false)
      setPurple(false)
      setPink(true)
      setGrey(false)
    }
    if (color === "grey") {
      setRed(false)
      setOrange(false)
      setYellow(false)
      setGreen(false)
      setBlue(false)
      setPurple(false)
      setPink(false)
      setGrey(true)
    }

    setBase(color)

  }

  function handleColor3(color) {
    if (color === "red") {
      setRed3(true)
      setOrange3(false)
      setYellow3(false)
      setGreen3(false)
      setBlue3(false)
      setPurple3(false)
      setPink3(false)
      setGrey3(false)
    }
    if (color === "orange") {
      setRed3(false)
      setOrange3(true)
      setYellow3(false)
      setGreen3(false)
      setBlue3(false)
      setPurple3(false)
      setPink3(false)
      setGrey3(false)
    }
    if (color === "yellow") {
      setRed3(false)
      setOrange3(false)
      setYellow3(true)
      setGreen3(false)
      setBlue3(false)
      setPurple3(false)
      setPink3(false)
      setGrey3(false)
    }
    if (color === "green") {
      setRed3(false)
      setOrange3(false)
      setYellow3(false)
      setGreen3(true)
      setBlue3(false)
      setPurple3(false)
      setPink3(false)
      setGrey3(false)
    }
    if (color === "blue") {
      setRed3(false)
      setOrange3(false)
      setYellow3(false)
      setGreen3(false)
      setBlue3(true)
      setPurple3(false)
      setPink3(false)
      setGrey3(false)
    }
    if (color === "purple") {
      setRed3(false)
      setOrange3(false)
      setYellow3(false)
      setGreen3(false)
      setBlue3(false)
      setPurple3(true)
      setPink3(false)
      setGrey3(false)
    }
    if (color === "pink") {
      setRed3(false)
      setOrange3(false)
      setYellow3(false)
      setGreen3(false)
      setBlue3(false)
      setPurple3(false)
      setPink3(true)
      setGrey3(false)
    }
    if (color === "grey") {
      setRed2(false)
      setOrange3(false)
      setYellow3(false)
      setGreen3(false)
      setBlue3(false)
      setPurple3(false)
      setPink3(false)
      setGrey3(true)
    }

    setBackground(color)

  }


  function handleColor2(color) {
    if (color === "red") {
      setRed2(true)
      setOrange2(false)
      setYellow2(false)
      setGreen2(false)
      setBlue2(false)
      setPurple2(false)
      setPink2(false)
      setGrey2(false)
    }
    if (color === "orange") {
      setRed2(false)
      setOrange2(true)
      setYellow2(false)
      setGreen2(false)
      setBlue2(false)
      setPurple2(false)
      setPink2(false)
      setGrey2(false)
    }
    if (color === "yellow") {
      setRed2(false)
      setOrange2(false)
      setYellow2(true)
      setGreen2(false)
      setBlue2(false)
      setPurple2(false)
      setPink2(false)
      setGrey2(false)
    }
    if (color === "green") {
      setRed2(false)
      setOrange2(false)
      setYellow2(false)
      setGreen2(true)
      setBlue2(false)
      setPurple2(false)
      setPink2(false)
      setGrey2(false)
    }
    if (color === "blue") {
      setRed2(false)
      setOrange2(false)
      setYellow2(false)
      setGreen2(false)
      setBlue2(true)
      setPurple2(false)
      setPink2(false)
      setGrey2(false)
    }
    if (color === "purple") {
      setRed2(false)
      setOrange2(false)
      setYellow2(false)
      setGreen2(false)
      setBlue2(false)
      setPurple2(true)
      setPink2(false)
      setGrey2(false)
    }
    if (color === "pink") {
      setRed2(false)
      setOrange2(false)
      setYellow2(false)
      setGreen2(false)
      setBlue2(false)
      setPurple2(false)
      setPink2(true)
      setGrey2(false)
    }
    if (color === "grey") {
      setRed2(false)
      setOrange2(false)
      setYellow2(false)
      setGreen2(false)
      setBlue2(false)
      setPurple2(false)
      setPink2(false)
      setGrey2(true)
    }

    setHighlight(color)

  }


  const handleBanner = () => {
    setIcon(false)
    setBanner(true)
    setBody(false)
  }

  const handleBody = () => {
    setIcon(false)
    setBanner(false)
    setBody(true)
  }

  const handleAll = () => {
    setIcon(false)
    setBanner(false)
    setBody(false)
    setBase(singleCommunity.CommunityStyle?.base)
    setHighlight(singleCommunity.CommunityStyle?.highlight)
    setBackground(singleCommunity.CommunityStyle?.background)
  }

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top instantly when the page loads
  }, []);

  useEffect(() => {

    async function fetchData() {

      await dispatch()
      if (id) await dispatch(communityActions.thunkGetCommunityMemberships())
      else return
    }

    fetchData()

    const member = memberships.filter((m) => m.communityId === singleCommunity.id)
    if (member) setJoined(true)
    if (!member) setJoined(false)

  }, [dispatch])

  useEffect(() => {

    async function fetchData() {
      if (id) await dispatch(communityActions.thunkGetDetailsById(id))
      else return
    }

    fetchData()

  }, [dispatch])

  useEffect(() => {

    async function fetchData() {
      let data = await dispatch(postsActions.thunkGetUserVotes())
      setIsLiked(data)
    }

    fetchData()

  }, [dispatch])

  useEffect(() => {

    async function fetchData() {
      let data = await dispatch(communityActions.thunkUpdateCommunityStyle(id, data3))
    }

    fetchData()

  }, [dispatch, data3, id])

  const handleStyling = () => {

      setData3({
          base: base,
          highlight: highlight ,
          background: background,
      })

      history.push(`/communities/${id}/:page`)

  }

  let top = isVisible ? "top" : "down"

let memberships = []

//   const memberships = Object.values(communityMemberships)
//   const member = memberships.filter((m) => m.communityId === singleCommunity.id)


//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY < 450) {
//         setIsVisible2(false)

//       }
//       else if (window.scrollY > 460) {
//         setIsVisible(true);
//         setIsVisible2(true);

//       }
//       else {
//         setIsVisible(false);

//       }
//       };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };


//   }, [])

//   if (!Object.values(singleCommunity).length) return <h1 className="data-not-here">Loading...</h1>

//   const getTimeDifferenceString = (createdAt) => {
//     const currentTime = new Date();
//     const createdAtDate = new Date(createdAt);

//     const timeDifferenceInSeconds = Math.floor((currentTime - createdAtDate) / 1000);

//     if (timeDifferenceInSeconds < 60) {
//       return timeDifferenceInSeconds === 1 ? `${timeDifferenceInSeconds} sec ago` : `${timeDifferenceInSeconds} secs ago`;
//     } else if (timeDifferenceInSeconds < 3600) {
//       const minutes = Math.floor(timeDifferenceInSeconds / 60);
//       return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
//     } else if (timeDifferenceInSeconds < 86400) {
//       const hours = Math.floor(timeDifferenceInSeconds / 3600);
//       return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
//     } else if (timeDifferenceInSeconds < 2592000) {
//       const days = Math.floor(timeDifferenceInSeconds / 86400);
//       return days === 1 ? `${days} day ago` : `${days} days ago`;
//     } else if (timeDifferenceInSeconds < 31536000) {
//       const months = Math.floor(timeDifferenceInSeconds / 2592000);
//       return months === 1 ? `${months} month ago` : `${months} months ago`;
//     } else {
//       const years = Math.floor(timeDifferenceInSeconds / 31536000);
//       return years === 1 ? `${years} year ago` : `${years} years ago`;
//     }
//   };

//   let ePost = singleCommunity.Posts?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


//   let style
//   if (singleCommunity.CommunityStyle) style = singleCommunity.CommunityStyle

//   function reduceOpacity(color, opacity) {
//     if (/^#/.test(color)) {
//       // If the color is a hex value
//       const hexColor = color.replace('#', '');
//       const r = parseInt(hexColor.slice(0, 2), 16);
//       const g = parseInt(hexColor.slice(2, 4), 16);
//       const b = parseInt(hexColor.slice(4, 6), 16);

//       return `rgba(${r}, ${g}, ${b}, ${opacity})`;
//     } else {
//       // If the color is a named color
//       const tempElement = document.createElement('div');
//       tempElement.style.color = color;
//       document.body.appendChild(tempElement);

//       const computedColor = getComputedStyle(tempElement).color;
//       const match = computedColor.match(/\d+/g);
//       const [r, g, b] = match ? match.map(Number) : [0, 0, 0];

//       document.body.removeChild(tempElement);

//       return `rgba(${r}, ${g}, ${b}, ${opacity})`;
//     }
//   }

//   const myMemberships = Object.values(memberships).concat(Object.values(userCommunities))

  console.log(colorPicker3)

    return (
        <></>
    //     <div id="fifty">
    //     <div id="edit-page-menu">
    //         <div id="twenty">
    //         <span id="a"><i onClick={((e) => {
    //           if (icon || banner || body) handleAll()
    //           else history.push(`/communities/${id}/mod`)
    //           })} class="fi fi-br-angle-left"></i><span onClick={((e) => {
    //             if (icon || banner || body) handleAll()
    //             else history.push(`/communities/${id}/mod`)
    //             })} id="d">Back to mod tools</span><i onClick={(() => history.push(`/communities/${id}/:page`))} class="fi fi-rr-cross-small"></i></span>
    //        {icon ?
    //        <>
    //        <span id="b">Name & icon</span>
    //         <div>
    //             <span style={{ height: "120px"}} id="e">Community Icon
    //             <div style={{ borderRadius: "4px", color: "#878A8C"}} id="upload-body" placholder="Feature not availble">
    //               <i style={{fontSize: "34px"}} class="fi fi-sr-cloud-upload-alt"></i>
    //               <span style={{fontSize: "12px"}}>Drag and Drop or Upload Image</span>
    //             </div></span>
    //         </div>
    //         <button id="save-style">Save</button>
    //         <button id="cancel-style">Cancel</button>
    //        </>
    //         : null}
    //         {banner ?
    //         <>
    //         <span id="b">Banner</span>
    //         <div>
    //         <span style={{ height: "200px"}} id="e">Background
    //             {/* <div style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "5% 0%"}}>
    //               <span style={{ color: "#878A8C", fontSize: "12px"}}>Color</span><div style={{ backgroundColor: `${highlight}`}} id="colorPick"><i style={{ fontSize: "24px", height: "24px" }} class="fi fi-rr-angle-small-down"></i></div></div> */}
    //             <span style={{ color: "#878A8C", fontSize: "12px"}}>Image</span>
    //             <div style={{ borderRadius: "4px", color: "#878A8C", height: "140px"}} id="upload-body" placholder="Feature not availble">
    //               <i style={{fontSize: "34px", marginTop: "20px", }} class="fi fi-sr-cloud-upload-alt"></i>
    //               <span style={{fontSize: "12px", marginBottom: "30px"}}>Drag and Drop or Upload Image</span>
    //             </div>
    //             </span>
    //         </div>
    //         <button id="save-style">Save</button>
    //         <button id="cancel-style">Cancel</button>
    //         </> : null}
    //         {body ?
    //         <>
    //         <span id="b">Color theme</span>
    //         <div>
    //             <span id="e">Theme Colors
    //             <div style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "5% 0%", alignItems: "center"}}>
    //               <span style={{ color: "#878A8C", fontSize: "12px"}}>Base</span>
    //                 <div style={{position: "relative", display: "flex", flexDirection: "column"}}>
    //                 <div onClick={(() => {
    //                   setColorPicker(!colorPicker)
    //                   setColorPicker2(false)
    //                   setColorPicker3(false)
    //                   })} style={{ backgroundColor: `${base}`}} id="colorPick">
    //                 <i style={{ fontSize: "24px", height: "24px" }} class="fi fi-rr-angle-small-down">
    //                 </i>
    //                 </div>
    //                 { colorPicker && <div className="pick-color">
    //                   <div id="color-h" style={{ padding: "6% 6%"}}>
    //                   <span>Color picker</span>
    //                   <div style={{ display: "flex", width: "100%", marginTop: "8px", marginBottom: "12px", alignItems: "center"}}>
    //                   <div onClick={(() => handleColor("red"))} style={{ borderColor: `${red ? "black" : "red"}` }} id="red"></div>
    //                   <div onClick={(() => handleColor("orange"))}  style={{ borderColor: `${orange ? "black" : "orange"}` }} id="orange"></div>
    //                   <div onClick={(() => handleColor("yellow"))} style={{ borderColor: `${yellow ? "black" : "yellow"}` }}id="yellow"></div>
    //                   <div onClick={(() => handleColor("green"))} style={{ borderColor: `${green ? "black" : "green"}` }} id="green"></div>
    //                   <div onClick={(() => handleColor("blue"))} style={{ borderColor: `${blue ? "black" : "blue"}` }}id="blue"></div>
    //                   <div onClick={(() => handleColor("purple"))} style={{ borderColor: `${purple ? "black" : "purple"}` }} id="purple"></div>
    //                   <div onClick={(() => handleColor("pink"))} style={{ borderColor: `${pink ? "black" : "pink"}` }} id="pink"></div>
    //                   <div onClick={(() => handleColor("grey"))} style={{ borderColor: `${grey ? "black" : "grey"}` }}id="grey"></div>
    //                   </div>
    //                   <span style={{ paddingBottom: "10px"}}>Hex Code</span>
    //                   <div style={{ display: "flex", gap: "12px", width: "100%", marginTop: "8px", marginBottom: "14px"}}>
    //                   <div style={{ borderRadius: "2px", border: "1px solid #EDEFF1", width: "28px", height: "28px", backgroundColor: `${base}`}}></div>
    //                   <input value={base} style={{ borderRadius: "2px", width: "60%", border: "1px solid #EDEFF1"}}></input>
    //                   </div>
    //                   <span>USE BROWSER COLOR PICKER</span>
    //                   </div>
    //                 </div> }
    //                 </div>
    //             </div>
    //                <div style={{ width: "100%", display: "flex", justifyContent: "space-between", paddingBottom: "10%", alignItems: "center"}}>
    //               <span style={{ color: "#878A8C", fontSize: "12px"}}>Highlight</span>
    //                 <div style={{position: "relative", display: "flex", flexDirection: "column"}}>
    //                 <div onClick={(() => {
    //                   setColorPicker2(!colorPicker2)
    //                   setColorPicker(false)
    //                   setColorPicker3(false)
    //                   })} style={{ backgroundColor: `${highlight}`}} id="colorPick">
    //                 <i style={{ fontSize: "24px", height: "24px" }} class="fi fi-rr-angle-small-down">
    //                 </i>
    //                 </div>
    //                 { colorPicker2 && <div className="pick-color">
    //                   <div id="color-h" style={{ padding: "6% 6%"}}>
    //                   <span>Color picker</span>
    //                   <div style={{ display: "flex", width: "100%", marginTop: "8px", marginBottom: "12px"}}>
    //                   <div onClick={(() => handleColor2("red"))} style={{ borderColor: `${red2 ? "black" : "red"}` }} id="red"></div>
    //                   <div onClick={(() => handleColor2("orange"))}  style={{ borderColor: `${orange2 ? "black" : "orange"}` }} id="orange"></div>
    //                   <div onClick={(() => handleColor2("yellow"))} style={{ borderColor: `${yellow2 ? "black" : "yellow"}` }}id="yellow"></div>
    //                   <div onClick={(() => handleColor2("green"))} style={{ borderColor: `${green2 ? "black" : "green"}` }} id="green"></div>
    //                   <div onClick={(() => handleColor2("blue"))} style={{ borderColor: `${blue2 ? "black" : "blue"}` }}id="blue"></div>
    //                   <div onClick={(() => handleColor2("purple"))} style={{ borderColor: `${purple2 ? "black" : "purple"}` }} id="purple"></div>
    //                   <div onClick={(() => handleColor2("pink"))} style={{ borderColor: `${pink2 ? "black" : "pink"}` }} id="pink"></div>
    //                   <div onClick={(() => handleColor2("grey"))} style={{ borderColor: `${grey2 ? "black" : "grey"}` }}id="grey"></div>
    //                   </div>
    //                   <span style={{ paddingBottom: "10px"}}>Hex Code</span>
    //                   <div style={{ display: "flex", gap: "12px", width: "100%", marginTop: "8px", marginBottom: "14px"}}>
    //                   <div style={{ borderRadius: "2px", border: "1px solid #EDEFF1", width: "28px", height: "28px", backgroundColor: `${base}`}}></div>
    //                   <input value={base} style={{ borderRadius: "2px", width: "60%", border: "1px solid #EDEFF1"}}></input>
    //                   </div>
    //                   <span>USE BROWSER COLOR PICKER</span>
    //                   </div>
    //                 </div> }
    //                 </div>
    //             </div>
    //             </span>
    //             <span id="e">Body Background
    //             <div style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "5% 0%", alignItems: "center"}}>
    //               <span style={{ color: "#878A8C", fontSize: "12px"}}>Color</span>
    //                 <div style={{position: "relative", display: "flex", flexDirection: "column"}}>
    //                 <div onClick={(() => {
    //                   setColorPicker(false)
    //                   setColorPicker2(false)
    //                   setColorPicker3(!colorPicker3)
    //                   })} style={{ backgroundColor: `${background}`}} id="colorPick">
    //                 <i style={{ fontSize: "24px", height: "24px" }} class="fi fi-rr-angle-small-down">
    //                 </i>
    //                 </div>
    //                 { colorPicker3 && <div className="pick-color">
    //                   <div id="color-h" style={{ padding: "6% 6%"}}>
    //                   <span>Color picker</span>
    //                   <div style={{ display: "flex", width: "100%", marginTop: "8px", marginBottom: "12px", alignItems: "center"}}>
    //                   <div onClick={(() => handleColor3("red"))} style={{ borderColor: `${red3 ? "black" : "red"}` }} id="red"></div>
    //                   <div onClick={(() => handleColor3("orange"))}  style={{ borderColor: `${orange3 ? "black" : "orange"}` }} id="orange"></div>
    //                   <div onClick={(() => handleColor3("yellow"))} style={{ borderColor: `${yellow3 ? "black" : "yellow"}` }}id="yellow"></div>
    //                   <div onClick={(() => handleColor3("green"))} style={{ borderColor: `${green3 ? "black" : "green"}` }} id="green"></div>
    //                   <div onClick={(() => handleColor3("blue"))} style={{ borderColor: `${blue3 ? "black" : "blue"}` }}id="blue"></div>
    //                   <div onClick={(() => handleColor3("purple"))} style={{ borderColor: `${purple3 ? "black" : "purple"}` }} id="purple"></div>
    //                   <div onClick={(() => handleColor3("pink"))} style={{ borderColor: `${pink3 ? "black" : "pink"}` }} id="pink"></div>
    //                   <div onClick={(() => handleColor3("grey"))} style={{ borderColor: `${grey3 ? "black" : "grey"}` }}id="grey"></div>
    //                   </div>
    //                   <span style={{ paddingBottom: "10px"}}>Hex Code</span>
    //                   <div style={{ display: "flex", gap: "12px", width: "100%", marginTop: "8px", marginBottom: "14px"}}>
    //                   <div style={{ borderRadius: "2px", border: "1px solid #EDEFF1", width: "28px", height: "28px", backgroundColor: `${background}`}}></div>
    //                   <input value={background} style={{ borderRadius: "2px", width: "60%", border: "1px solid #EDEFF1"}}></input>
    //                   </div>
    //                   <span>USE BROWSER COLOR PICKER</span>
    //                   </div>
    //                 </div> }
    //                 </div>
    //             </div>
    //             <span style={{ color: "#878A8C", fontSize: "12px"}}>Image</span>
    //             <div style={{ borderRadius: "4px", color: "#878A8C"}} id="upload-body" placholder="Feature not availble">
    //               <i style={{fontSize: "34px"}} class="fi fi-sr-cloud-upload-alt"></i>
    //               <span style={{fontSize: "12px"}}>Drag and Drop or Upload Image</span>
    //             </div>
    //             </span>
    //         </div>
    //         <button onClick={handleStyling} style={{ marginTop: "10px"}} id="save-style">Save</button>
    //         <button onClick={handleAll} id="cancel-style">Cancel</button>
    //         </> : null}
    //         { !icon && !banner && !body ?
    //         <>
    //             <span id="b">Apperance</span>
    //         <div>
    //             <span id="e2" style={{ height: "30px"}} onClick={handleBody}>Color theme<i class="fi fi-br-angle-right"></i></span>
    //             <span id="e2" style={{ height: "30px"}} onClick={handleIcon}>Name & Icon<i class="fi fi-br-angle-right"></i></span>
    //             <span id="e2" style={{ height: "30px", marginTop: "10px"}} onClick={handleBanner}>Banner<i class="fi fi-br-angle-right"></i></span>
    //         </div>
    //         <span id="c">RESET TO DEFAULTS</span>
    //         </>
    //         : null}
    //         </div>
    //     </div>
    //     <div style={{ backgroundColor: `${background}`}} onClick={(() => history.push(`/communities/${singleCommunity.id}/:page`))} id="edit-page">
    //         <Navigation />
    //     <div className="community-page-header2">
    //     { style ? <div style={{
    //     width: '100%',
    //     height: '200px',
    //     backgroundImage: `url(${style.banner})`, // Replace with the actual path to your image
    //     backgroundColor: `${base}`,
    //     filter: 'brightness(90%)',
    //     backgroundSize: '100% 100%',
    //     backgroundPosition: 'center',
    //     }}></div> :
    //     <div id="community-page-header"></div> }
    //     <div id="community-page-title">
    //         <div id="community-title-head">
    //         { style && style.icon ? <img id="img-pfp"src={style.icon}></img> : <div style={{ backgroundColor: `${base}`}} id="comm-pfp">l/</div> }
    //         <div id="communityName">
    //             {singleCommunity.name}
    //             <span>l/{singleCommunity.name}</span>
    //         </div>
    //         {user && myMemberships.length && joined && button ? <button  onMouseEnter={(() => setButton(false))} style={{ color: `${highlight}`, border: `1px solid ${highlight}`}} id="joined">Joined</button> : null }
    //         {user && myMemberships.length && joined && !button ? <button  onMouseLeave={(() => setButton(true))} style={{ backgroundColor: `${reduceOpacity(highlight, 0.1)}`, color: `${highlight}`, border: `1px solid ${highlight}`}} id="joined">Leave</button> : null }
    //         </div>
    //     </div>
    //     {user && singleCommunity.userId !== user.id ? <div id="comm-head11">
    //     <p>Posts</p>
    //     </div> : null}
    //     </div>
    //     <div className="community-page-content">

    //     </div>
    //     <div className="community-page-content2">
    //         <div className="posts">
    //             <div className="create">
    //                 <img src={pfp}></img>
    //                 <input type="text" placeholder="Create Post"></input>
    //                 <div><i class="fi fi-rr-picture"></i></div>
    //                 <div><i class="fi fi-rr-link-alt"></i></div>
    //             </div>
    //             <div className="filter">
    //             <div id="filter-side1">
    //             <div id="best">
    //             <i style={{ color: `${highlight}`}} class="fi fi-rs-flame"></i>
    //             <p style={{ color: `${highlight}`}}>Hot</p>
    //             </div>
    //             <div id="best">
    //             <i class="fi fi-rr-bahai"></i>
    //             <p>New</p>
    //             </div>
    //             <div id="best">
    //             <i class="fi fi-rs-signal-bars-good"></i>
    //             <p>Top</p>
    //             </div>
    //             <i class="fi fi-rr-menu-dots"></i>
    //             </div>
    //             <div id="filter-side2">
    //             <i class="fi fi-rr-horizontal-rule"></i>
    //             <i class="fa-regular fa-square"></i>
    //             <i class="fa-solid fa-chevron-down"></i>
    //             </div>
    //             </div>
    //             {ePost?.map((post) =>
    //                 <div className="post-content">
    //                 <div id="pc-side1">
    //                 <PostLikes post={post}/>
    //                 </div>
    //                 <div id="pc-side2">
    //                 <div id="nameOf">
    //                 {/* <img src={pfp}></img> */}
    //                 <p>Posted by <span className="userName">u/{post.User?.username}</span> {getTimeDifferenceString(post.createdAt)}</p>
    //                 </div>
    //                 <h3 id="title6">{post.title}</h3>
    //                 <div id="content">
    //                 <div id="img">
    //                 {post.PostImages?.length ? <img src={post.PostImages[0]?.imgURL} alt="meaningful-text"></img> : null}
    //                 </div>
    //                 </div>
    //                 {post.User.id !== user.id ?<div id="post-extras3">
    //                 <div id="comment">
    //                 <i class="fa-regular fa-message"></i>
    //                 <p >{post.Comments?.length} Comments</p>
    //                 </div>
    //                 <div id="comment">
    //                 <i class="fi fi-rr-box-heart"></i>
    //                 <p>Awards</p>
    //                 </div>
    //                 <div id="comment">
    //                 <i class="fi fi-rs-heart-arrow"></i>
    //                 <p>Share</p>
    //                 </div>
    //                 <div id="comment">
    //                 <i class="fi fi-rr-bookmark"></i>
    //                 <p>Save</p>
    //                 </div>
    //                 <i class="fi fi-rr-menu-dots"></i>
    //         </div> :
    //                 <div id="post-extras">
    //                 <div id="comment">
    //                 <i class="fa-regular fa-message"></i>
    //                 <p>{post.Comments.length}</p>
    //                 </div>
    //                 <div id="comment">
    //                 <i class="fi fi-rs-heart-arrow"></i>
    //                 <p>Share</p>
    //                 </div>
    //                 <div id="comment">
    //                 <i class="fi fi-rs-check-circle"></i>
    //                 <p>Approved</p>
    //                 </div>
    //                 <div id="comment">
    //                 <i class="fi fi-rs-circle-cross"></i>
    //                 <p>Removed</p>
    //                 </div>
    //                 <div id="comment">
    //                 <i class="fi fi-rr-box"></i>
    //                 <p>Spam</p>
    //                 </div>
    //                 <div id="comment">
    //                 <i class="fi fi-rs-shield"></i>
    //                 </div>
    //                 <i class="fi fi-rr-menu-dots"></i>
    //                 </div>}
    //                 </div>
    //                 </div>
    //             )}
    //         </div>
    //         <div className="sidebar">


    //             <YourCommunitesProfile base={base} highlight={highlight} />
    //             <div className="home-section">
    //             <div style={{ backgroundColor: `${base}`}} id="cs-background">
    //                 <p>Moderators</p>
    //             </div>
    //             <div id="home-section">
    //             { !message && <button onMouseEnter={(() => setMessage(!message))} style={{ borderColor: `${highlight}`, color: `${highlight}`}} onClick={(() => window.alert("Feature not available"))} id="but4"><i class="fi fi-rr-envelope"></i> Message the mods</button>}
    //             { message && <button onMouseLeave={(() => setMessage(!message))} style={{backgroundColor: `${reduceOpacity(highlight, 0.1)}`, borderColor: `${highlight}`, color: `${highlight}`}} onClick={(() => window.alert("Feature not available"))} id="but4"><i class="fi fi-rr-envelope"></i> Message the mods</button>}
    //             <div id="cs-side6">
    //                 {user?.id !== singleCommunity.User?.id ? <span style={{ color: `${highlight}` }} > {singleCommunity.User?.username}</span> : "" }
    //                 {user?.id === singleCommunity.User?.id ? <span style={{ color: `${highlight}` }} > {singleCommunity.User?.username}</span> : "" }
    //                 <span style={{ color: `${highlight}` }}>VIEW ALL MODERATORS</span>
    //             </div>
    //             </div>

    //             </div>
    //             { isVisible2 ? <button className={top} >Back to Top</button> : null}
    //         </div>
    //     </div>

    //     </div>
    //     </div>
    )
}


export default CommunityPageEdit2
