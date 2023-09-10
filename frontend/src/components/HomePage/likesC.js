import * as postsActions from '../../store/posts'
const { useState, useEffect } = require("react")
const { useDispatch, useSelector } = require("react-redux")




function CommentLikes({ comment, h }) {
    const { user } = useSelector((state) => state.session)
    const [ userVotes, setUserVotes ] = useState(false)
    const [ boolean, setBoolean ] = useState(null)
    const [ boolean2, setBoolean2 ] = useState(null)
    const [ data1, setData1 ] = useState(null)
    const [ data, setData ] = useState(null)
    const [ add, setAdd ] = useState(null)
    const [ sub, setSub] = useState(null)
    const dispatch = useDispatch()


    let vote

    if (comment.Votes) vote = Object.values(comment.Votes)

    useEffect(() => {

      async function fetchData() {
        let data
        if (user) data = await dispatch(postsActions.thunkGetUserVotes())
        setUserVotes(data)

      }

      fetchData()


    }, [dispatch, comment])


    let voted

    if (vote && vote.length) voted = vote.filter((v) => v.userId === user.id )

    let upVoted

    let downVoted

    if (voted && voted.length && voted.filter((v) => v.upVote === 1).length) {
      upVoted = true
    }
    else if (voted && voted.length && voted.filter((v) => v.downVote === 1).length) {
      downVoted = true
    }


        const handleFavoriteClick = async () => {
            if (!user) return window.alert('Please login')
            if (upVoted) {
              await dispatch(postsActions.thunkDeleteCommentVote(voted[0].id, comment.id))
            }
            else if (downVoted) {
              await dispatch(postsActions.thunkDeleteCommentVote(voted[0].id, comment.id))
              await dispatch(postsActions.thunkCreateCommentVote(comment?.id, 1))
            }
            else await dispatch(postsActions.thunkCreateCommentVote(comment?.id, 1))
        }

        const handleFavoriteClick2 = async () => {
          if (!user) return window.alert('Please login')
          if (downVoted) {
            await dispatch(postsActions.thunkDeleteCommentVote(voted[0].id, comment.id))
          }
          else if (upVoted) {
            await dispatch(postsActions.thunkDeleteCommentVote(voted[0].id, comment.id))
            await dispatch(postsActions.thunkCreateCommentVote(comment?.id, 0))
          }
          else await dispatch(postsActions.thunkCreateCommentVote(comment?.id, 0))
      }

    return (
        <>
        <div id="upvote4" onClick={((e) => {
            e.stopPropagation()
            handleFavoriteClick()
            })} >
        {upVoted ? <i id="upvoted4"
       class="fi fi-rs-heart"></i> : <i id="upvote4"
       class="fi fi-rs-heart"></i> }
       </div>
       <span>{ vote && vote.length === 0 ? "Love" : vote && vote.length }</span>
       <div id="downvote4" onClick={((e) => {
          e.stopPropagation()
          handleFavoriteClick2()
        })} >
       { downVoted ? <i
       id="downvoted4"
       class="fi fi-rs-heart-crack"></i> : <i
       id="downvote4"
       class="fi fi-rs-heart-crack"></i> }
       </div>
       </>
    )
}

export default CommentLikes
