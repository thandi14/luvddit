import { csrfFetch } from "./csrf";


const GET_POSTS = 'posts/getPosts';
const GET_HISTORY = 'posts/getHistory';
const ADD_HISTORY = 'posts/addHistory';
const GET_DETAILS = 'posts/getDetails';
const GET_UPDATES = 'posts/getUpdates';
const GET_COMMENT_DETAILS = 'posts/getCommentDetails';
const GET_COMMENT_UPDATES = 'posts/getCommentUpdates';
const GET_VOTE_DETAILS = 'posts/getVoteDetails';
const GET_VOTE_DETAILS2 = 'posts/getVoteDetails2';
const GET_USER_POSTS = 'posts/getUserPosts';
const REMOVE_POST = 'posts/removePosts'
// const REMOVE_HISTORY = 'posts/removeHistory'
const REMOVE_COMMENT = 'posts/removeComment'
const REMOVE_VOTE = 'posts/removeVote'
const REMOVE_VOTE2 = 'posts/removeVote2'

const getPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
    }
}

const getHistory = (posts) => {
  return {
      type: GET_HISTORY,
      posts
  }
}

const addHistory = (history) => {
  return {
      type: ADD_HISTORY,
      history
  }
}



const getDetails = (details) => {
    return {
        type: GET_DETAILS,
        details
    }
}

const getUpdates = (updates) => {
  return {
      type: GET_UPDATES,
      updates
  }
}


const getCommentDetails = (details) => {
  return {
      type: GET_COMMENT_DETAILS,
      details
  }
}

const getCommentUpdates = (updates) => {
  return {
      type: GET_COMMENT_UPDATES,
      updates
  }
}

const getVoteDetails = (details) => {
  return {
      type: GET_VOTE_DETAILS,
      details
  }
}

const getVoteDetails2 = (details, commentId) => {
  return {
      type: GET_VOTE_DETAILS2,
      details,
      commentId
  }
}


const removePost = (id) => {
    return {
        type: REMOVE_POST,
        id
    }
}

// const removeHistory = (postId) => {
//   return {
//       type: REMOVE_HISTORY,
//       postId
//   }
// }


const removeComment = (commentId) => {
  return {
      type: REMOVE_COMMENT,
      commentId
  }
}

const removeVote = (voteId, postId) => {
  return {
      type: REMOVE_VOTE,
      voteId,
      postId
  }
}

const removeVote2 = (voteId, commentId) => {
  return {
      type: REMOVE_VOTE2,
      voteId,
      commentId
  }
}



const getUserPosts = (posts) => ({
    type: GET_USER_POSTS,
    posts,
});


export const thunkGetAllPosts = (page) => async (dispatch) => {
  const response1 = await csrfFetch(`/api/posts?page=${page}`);
  let data1 = await response1.json();
    dispatch(getPosts(data1));
    return response1;
}

export const thunkGetHistory = () => async (dispatch) => {
  const response1 = await csrfFetch('/api/posts/history')
  let data1 = await response1.json();
  // for (let h of data1) {
  //   h.Post.historyId = h.id
  // }
  dispatch(getHistory(data1));
  return response1;
}

export const thunkGetHistoryDetails = (id) => async (dispatch) => {
  const response1 = await csrfFetch(`/api/posts/${id}/history`)
  let data1 = await response1.json();
  return data1;
}




export const thunkGetUserVotes = () => async (dispatch) => {
  const response1 = await csrfFetch(`/api/posts/votes/current`)
  const data1 = await response1.json();
  return data1;
}


export const thunkGetDetailsById = (id) => async (dispatch) => {
    const response1 = await csrfFetch(`/api/posts/${id}`)
    const data1 = await response1.json();
    dispatch(getDetails(data1));
    return data1;
}

export const thunkGetUserPosts = () => async (dispatch) => {
    let response = await fetch(`/api/posts/current`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    dispatch(getUserPosts(data));
    return data;
  };

export const thunkCreatePost = (data, id, img) => async (dispatch) => {
  if (Object.values(data).length) {
        const response = await csrfFetch(`/api/communities/${id}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        })

        const data1 = await response.json()
        const postId = data1.id

        if (Object.values(img).length) {
        const response2 = await csrfFetch(`/api/posts/${postId}/images`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(img)
        })
        }

        dispatch(getDetails(data1))
        return data1

    }
}

export const thunkUpdatePosts = (id, data) => async (dispatch) => {
    if (Object.values(data).length) {
        const response = await csrfFetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        })
        const data1 = await response.json()
        dispatch(getUpdates(data1))
       // console.log("REDUCER", data1)
        return response
    }
}

export const thunkDeletePosts = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
    })
    let data = await response.json()
    dispatch(removePost(id))
    return data
}

export const thunkCreateHistory = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/${id}/history`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
  })
  let data = await response.json()
  dispatch(addHistory(data))
  return data
}

export const thunkUpdateHistory = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/history/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
        },
  })
  let data = await response.json()
  dispatch(addHistory(data))
  return data
}


// export const thunkRemoveHistory = (historyId, postId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/posts/history/${historyId}`, {
//       method: 'DELETE',
//       headers: {
//           'Content-Type': 'application/json'
//         },
//   })
//   let data = await response.json()
//   console.log("IS THIS WORKING?", data)
//   dispatch(removeHistory(postId))
//   return data
// }



export const thunkDeleteVote = (id, postId) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/votes/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
        },
  })
  let data = await response.json()
  dispatch(removeVote(id, postId))
  return data
}

export const thunkCreateVote = (id, boolean) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/${id}/votes?boolean=${boolean}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
  })
  let data = await response.json()
  dispatch(getVoteDetails(data))
  return data
}

export const thunkUpdateVote = (id, boolean) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/${id}/votes?boolean=${boolean}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
        },
  })
  let data = await response.json()
  dispatch(getVoteDetails(data))
  return data
}


export const thunkCreateCommentVote = (id, boolean) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/comment/${id}/votes?boolean=${boolean}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
  })
  let data = await response.json()
  dispatch(getVoteDetails2(data, id))
  return data
}

export const thunkDeleteCommentVote = (id, commentId) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/votes/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
        },
  })
  let data = await response.json()
  dispatch(removeVote2(id, commentId))
  return data
}


export const thunkCreateComment = (data, id) => async (dispatch) => {
  if (Object.values(data).length) {
      const response = await csrfFetch(`/api/posts/${id}/comment`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(data)
      })

      const data1 = await response.json()
      dispatch(getCommentDetails(data1))
      return data1

  }
}

export const thunkUpdateComment = (data, id) => async (dispatch) => {
  if (Object.values(data).length) {
      const response = await csrfFetch(`/api/comments/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(data)
      })

      const data1 = await response.json()
      dispatch(getCommentUpdates(data1))
      return data1

  }
}

export const thunkDeleteComment = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
        },
  })
  let data = await response.json()
  dispatch(removeComment(id))
  return data
}




// export const addPostImages = (id, data) => async (dispatch) => {
//     const response = await csrfFetch(`/api/posts/${id}/images`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     return response
// }


let initialState = {
    posts: {},
    userPosts: {},
    singlePost: {},
    removedPost: {},
    postsHistory: {},
};


const postsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_POSTS:
        newState = { ...state };
        action.posts.forEach(
          (post) => (newState.posts[post.id] = post)
        );
      return newState;
    case GET_HISTORY:
        newState = { ...state };
        action.posts.forEach(
          (h) => (newState.postsHistory[h.Post.id] = h.Post)
      );
    return newState;
    case ADD_HISTORY: {
      newState = { ...state };
      const history = action.history;
      newState.postsHistory[history.postId] = { ...history.Post }
      return newState;
    }
    case GET_DETAILS: {
        newState = { ...state };
        const post = action.details;
        newState.singlePost = { ...post };
        newState.posts[post.id] = { ...post }
        return newState;
    }
    case GET_VOTE_DETAILS: {
      newState = { ...state };
      const vote = action.details;
      if (Object.values(newState.singlePost).length) newState.singlePost.Votes[vote.id] = { ...vote };
      newState.posts[vote.postId].Votes[vote.id] = { ...vote }
      if (newState.postsHistory[vote.postId]) newState.postsHistory[vote.postId].Votes[vote.id] = { ...vote }
      return newState;
    }
    case GET_VOTE_DETAILS2: {
      newState = { ...state };
      const vote = action.details;
      if (Object.values(newState.singlePost.Comments).length) newState.singlePost.Comments.filter((c) => c.id === action.commentId)[0].Votes[vote.id] = { ...vote };
      //newState.posts[vote.postId].Votes[vote.id] = { ...vote }
      return newState;
    }
    case REMOVE_VOTE: {
      newState = { ...state };
      let votes = newState.singlePost.Votes
      let votes2 = newState.postsHistory[action.postId] ? newState.postsHistory[action.postId].Votes : null
      if (Object.values(newState.singlePost).length) newState.singlePost.Votes = votes.filter((v) => v.id !== action.voteId)
      delete newState.posts[action.postId].Votes[action.voteId]
      if (newState.postsHistory[action.postId] && Object.values(newState.postsHistory[action.postId].Votes).length) delete newState.postsHistory[action.postId].Votes[action.voteId]
      if (votes) {
        newState.posts[action.postId].Votes = votes.filter((v) => v.id !== action.voteId)
      }
      else if (votes2) {
        newState.postsHistory[action.postId].Votes = votes2.filter((v) => v.id !== action.voteId)
        newState.posts[action.postId].Votes = votes2.filter((v) => v.id !== action.voteId)
      }
      return newState;
    }
    case REMOVE_VOTE2: {
      newState = { ...state };
      let votes = newState.singlePost.Votes
      if (Object.values(newState.singlePost.Comments).length) newState.singlePost.Comments.filter((c) => c.id === action.commentId)[0].Votes = votes.filter((v) => v.id !== action.voteId)
      return newState;
    }
    case GET_UPDATES: {
      newState = { ...state };
      const post = action.updates;
      newState.singlePost = { ...post };
      newState.posts[post.id] = { ...post }
      return newState;
    }
    case GET_COMMENT_DETAILS: {
      newState = { ...state };
      let comment = action.details;
      newState.singlePost.Comments[comment.id] = comment
      let post = newState.posts[comment.postId]
      if (post && post.Comments) post.Comments[comment.id] = comment
      return newState
    }
    case GET_COMMENT_UPDATES: {
      newState = { ...state };
      let comment = action.updates;
      newState.singlePost.Comments = newState.singlePost.Comments.filter((c) => c.id !== comment.id)
      newState.singlePost.Comments[comment.id] = comment
      let post = newState.posts[comment.postId]
      if (post && post.Comments) post.Comments[comment.id] = comment
      return newState
    }
    case REMOVE_POST: {
        newState = { ...state };
        newState.posts = { ...newState.posts };
        newState.userPosts = { ...newState.userPosts };
        newState.communities = { ...newState.communities };
        newState.singlePost = {};
        delete newState.posts[action.id];
        delete newState.postsHistory[action.id];
        return newState;
    }
    case REMOVE_COMMENT: {
      newState = { ...state };
      newState.singlePost.Comments = newState.singlePost.Comments.filter((c) => c.id !== action.commentId);
      let post = newState.posts[newState.singlePost.id]
      post.Comments = post.Comments.filter((c) => c.id !== action.commentId)
      return newState;
    }
    case GET_USER_POSTS: {
        newState = { ...state };
        newState.userPosts = {};
        action.posts.forEach(
          (post) => (newState.userPosts[post.id] = post)
        );
        return newState;
    }
    default:
      return state;
  }
};

export default postsReducer
