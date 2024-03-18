import { useModal2 } from "../../../context/Modal2";
import "../PostPage.css";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as postsActions from '../../../store/posts';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../../context/Modal";

function DeleteComment({ id, deleted }){
    const { closeModal2 } = useModal2();
    const { singlePost } = useSelector((state) => state.posts)
    const { userCommunities } = useSelector((state) => state.communities)
    const dispatch = useDispatch()
    const history = useHistory()
    const targetRef3 = useRef(null)
    const { closeModal } = useModal()
    let communities = Object.values(userCommunities)

    const handleClick = () => {
        dispatch(postsActions.thunkDeleteComment(id))
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
            <h2>Delete Comment?<i onClick={((e) => {
                e.stopPropagation()
                closeModal2()
            })} class="fi fi-rr-cross-small"></i></h2>
            <p>Are you sure you want to delete your Comment? You can't undo this.</p>
            <div id="delete-buttons">
            <button onClick={((e) => {
                e.stopPropagation()
                closeModal2()
            })}>Cancel</button>
            <button onClick={((e) => {
                e.stopPropagation()
                handleClick()
            })}>Delete Comment</button>
            </div>
        </div>
    )
}

export default DeleteComment
