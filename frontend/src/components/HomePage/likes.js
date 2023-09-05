import * as postsActions from '../../store/posts'
const { useState, useEffect } = require("react")
const { useDispatch, useSelector } = require("react-redux")




function PostLikes({ post, p, h }) {
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

    if (post.Votes) vote = Object.values(post.Votes)



    useEffect(() => {

      async function fetchData() {
        let data
        if (user) data = await dispatch(postsActions.thunkGetUserVotes())
        setUserVotes(data)

      }

      fetchData()


    }, [dispatch, post])


    let voted

    if (vote.length) voted = vote.filter((v) => v.userId === user.id )

    let upVoted

    let downVoted

    if (voted && voted.length && voted.filter((v) => v.upVote === 1).length) {
      upVoted = true
    }
    else if (voted && voted.length && voted.filter((v) => v.downVote === 1).length) {
      downVoted = true
    }




    console.log(upVoted)


        const handleFavoriteClick = async () => {
            if (!user) return window.alert('Please login')
            if (upVoted) {
              await dispatch(postsActions.thunkDeleteVote(voted[0].id, post.id))
            }
            else if (downVoted) {
              await dispatch(postsActions.thunkDeleteVote(voted[0].id, post.id))
              await dispatch(postsActions.thunkCreateVote(post?.id, 1))
            }
            else await dispatch(postsActions.thunkCreateVote(post?.id, 1))
        }

        const handleFavoriteClick2 = async () => {
          if (!user) return window.alert('Please login')
          if (downVoted) {
            await dispatch(postsActions.thunkDeleteVote(voted[0].id, post.id))
          }
          else if (upVoted) {
            await dispatch(postsActions.thunkDeleteVote(voted[0].id, post.id))
            await dispatch(postsActions.thunkCreateVote(post?.id, 0))
          }
          else await dispatch(postsActions.thunkCreateVote(post?.id, 0))
      }

    return (
        <>
        <div id="upvote" onClick={((e) => {
            e.stopPropagation()
            handleFavoriteClick()
            })} >
        {upVoted ? <i id="upvoted"
       class="fi fi-rs-heart"></i> : <i id="upvote"
       class="fi fi-rs-heart"></i> }
       </div>
       <span>{ vote.length }</span>
       <div id="downvote" onClick={((e) => {
          e.stopPropagation()
          handleFavoriteClick2()
        })} >
       { downVoted ? <i
       id="downvoted"
       class="fi fi-rs-heart-crack"></i> : <i
       id="downvote"
       class="fi fi-rs-heart-crack"></i> }
       </div>
       </>
    )
}

export default PostLikes
