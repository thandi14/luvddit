import "./CreateCommunityModel.css"
import { useModal } from "../../context/Modal"
import { useState, useEffect } from "react";
import * as communityActions from "../../store/communities"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function CreateCommunity() {
    const { closeModal } = useModal();
    const [ name, setName ] = useState("");
    const [ data1, setData1 ] = useState("");
    const dispatch = useDispatch()
    const history = useHistory()
    const [ type, setType ] = useState("Public")
    const [ errors, setErrors ] = useState(false)

    function isNotAllSpaces(inputString) {
        return !/^[\s]+$/.test(inputString);
    }

    const handleSubmit = async () => {


        if (name.length >= 3 && isNotAllSpaces(name)) {
            setData1({
                name,
                type
             })

        }
        else {
            setErrors(true)
        }

    }

    useEffect( () => {

        async function fetchData() {
            const response = await dispatch(communityActions.thunkCreateCommunity(data1))
            if (response) {
                history.push(`/communities/${response.id}/:page`)
                closeModal()
            }

        }
        fetchData()

    }, [dispatch, data1])



    return (
        <div className="community-post">
            <span>Create a community<i onClick={(() => closeModal())} class="fi fi-rr-cross-small"></i></span>
            <div id="div10"></div>
            <div id="cc-name">
            <span>Name</span>
            <span>Community names including capitalization cannot be changed.</span>
            <div>
            <span>l/</span>
            <input maxLength={21} onChange={((e) => setName(e.target.value))} type="text"></input>
            </div>
            <span className={name.length === 21 ? "red" : "grey"}> { 21 - name.length} Characters remaining</span>
            { errors ? <span style={{ fontSize: "12px", color: "red"}}>Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores.</span> : null}
            </div>
            <div id="cc-type">
                <span>Community type</span>
                <span>
                <i onClick={(() => setType("Public"))}
                id={ type === "Public" ? "c-type" : "" }
                class={ type === "Public" ? "fi fi-ss-dot-circle" : "fi fi-rr-circle" }></i>
                <div><i class="fi fi-rr-following"></i>Public</div>
                Anyone can view, post, and comment to this community</span>
                <span>
                <i onClick={(() => setType("Restricted"))}
                id={ type === "Restricted" ? "c-type" : "" }
                class={ type === "Restricted" ? "fi fi-ss-dot-circle" : "fi fi-rr-circle" }></i>
                <div><i class="fi fi-rs-crossed-eye"></i>Restricted</div>
                Anyone can view this community, but only approved users can post</span>
                <span>
                <i onClick={(() => setType("Private"))}
                id={ type === "Private" ? "c-type" : "" }
                class={ type === "Private" ? "fi fi-ss-dot-circle" : "fi fi-rr-circle" }></i>
                <div><i class="fi fi-rr-lock"></i>Private</div>
                Only approved users can view and submit to this community</span>
            </div>
            <div id="cc-content">
            <span>Adult content</span>
            <div>
            <label>
                <input type="checkbox" />
                </label>
                <span><div>NSFW</div>18+ year old community</span>
            </div>
            </div>
            <div id="cc-submit">
                <button onClick={(() => closeModal())}>Cancel</button>
                <button id={name.length >= 3 && isNotAllSpaces(name) ? "eleven" : "eleven2"} onClick={handleSubmit}>Create Community</button>
            </div>
        </div>
    )
}

export default CreateCommunity
