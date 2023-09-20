import { useModal2 } from "../../context/Modal2";
import ".././PostPage/PostPage.css";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as postsActions from '../../store/posts';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import { useFilter } from "../../context/filter";

function UndoChanges({ id, undo }){
    const { closeModal2 } = useModal2();
    const { singlePost } = useSelector((state) => state.posts)
    const { userCommunities } = useSelector((state) => state.communities)
    const dispatch = useDispatch()
    const history = useHistory()
    const targetRef3 = useRef(null)
    const { closeModal } = useModal()
    let communities = Object.values(userCommunities)
    const { filter, setFilter } = useFilter()

    const handleClick = () => {
        if (!undo) history.push(`/communities/${id}/:page`)
        if (undo) setFilter("undo")
        closeModal2()
    }

    useEffect(() => {

        const handleDocumentClick = (event) => {
            if (targetRef3.current && !targetRef3.current.contains(event.target)) {
                closeModal2();

            }

        };

      document.addEventListener('click', handleDocumentClick);
      return () => {
          document.removeEventListener('click', handleDocumentClick);
        };

    }, []);


    return (
        <div ref={targetRef3} className="deletePost">
            <h2>Discard unsaved changes before leaving?<i onClick={(() => closeModal2())} class="fi fi-rr-cross-small"></i></h2>
            <p>You have made some changes to your community, do you wish to leave this menu without saving?</p>
            <div id="delete-buttons">
            <button onClick={(() => closeModal2())}>Cancel</button>
            <button onClick={(() => {
                handleClick()
            })}>Discard</button>
            </div>
        </div>
    )
}

export default UndoChanges
