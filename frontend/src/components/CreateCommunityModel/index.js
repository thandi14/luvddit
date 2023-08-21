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

    const handleSubmit = async () => {

        if (name) {
            setData1({
                name,
             })

        }

    }

    useEffect( () => {

        async function fetchData() {
            const response = await dispatch(communityActions.thunkCreateCommunity(data1))
            console.log(response)
            if (response) {
                history.push(`/communities/${response.id}`)
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
            <span id={name.length === 21 ? "red" : "grey"}> { 21 - name.length} Characters remaining</span>
            </div>
            <div id="cc-type">
                <span>Community type</span>
                <span><i class="fi fi-ss-dot-circle"></i><div><i class="fi fi-rr-following"></i>Public</div>Anyone can view, post, and comment to this community</span>
                <span><i class="fi fi-rr-circle"></i><div><i class="fi fi-rs-crossed-eye"></i>Restricted</div>Anyone can view this community, but only approved users can post</span>
                <span><i class="fi fi-rr-circle"></i><div><i class="fi fi-rr-lock"></i>Private</div>Only approved users can view and submit to this community</span>
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
                <button id={name ? "eleven" : "eleven2"} onClick={handleSubmit}>Create Community</button>
            </div>
        </div>
    )
}

export default CreateCommunity
