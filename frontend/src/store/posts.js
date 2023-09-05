import { csrfFetch } from "./csrf";


const GET_POSTS = 'posts/getPosts';
const GET_DETAILS = 'posts/getDetails';
const GET_UPDATES = 'posts/getUpdates';
const GET_COMMENT_DETAILS = 'posts/getCommentDetails';
const GET_DETAILS2 = 'posts/getDetails2';
const GET_USER_POSTS = 'posts/getUserPosts';
const REMOVE_POST = 'posts/removePosts'
const REMOVE_COMMENT = 'posts/removeComment'

const getPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
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

const removePost = (id) => {
    return {
        type: REMOVE_POST,
        id
    }
}

const removeComment = (commentId) => {
  return {
      type: REMOVE_COMMENT,
      commentId
  }
}

const getDetails2 = (details) => {
  return {
      type: GET_DETAILS2,
      details
  }
}



const getUserPosts = (posts) => ({
    type: GET_USER_POSTS,
    posts,
});

export const thunkCommGetDetailsById = (id) => async (dispatch) => {
  const response1 = await csrfFetch(`/api/communities/${id}`)
  const data1 = await response1.json();
  dispatch(getDetails2(data1));
  return data1;
}

export const thunkUpdateCommunities = (id, data) => async (dispatch) => {
  if (Object.values(data).length) {
      const response = await csrfFetch(`/api/communities/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(data)
      })
      const data1 = await response.json()
      dispatch(getDetails2(data1))
      return data1
  }
}


export const thunkGetAllPosts = () => async (dispatch) => {
    const response1 = await csrfFetch('/api/posts')
    let data1 = await response1.json();
    dispatch(getPosts(data1));
    return response1;
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

export const thunkDeleteVote = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/votes/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
        },
  })
  let data = await response.json()
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
    singleCommunity2: {},

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
    case GET_DETAILS: {
        newState = { ...state };
        const post = action.details;
        newState.singlePost = { ...post };
        newState.posts[post.id] = post
        //newState.posts = { ...newState, post }
        return newState;
    }
    case GET_UPDATES: {
      newState = { ...state };
      const post = action.updates;
      newState.singlePost = { ...post };
      newState.posts[post.id] = { ...post }
      return newState;
  }
    case GET_COMMENT_DETAILS:
      newState = { ...state };
      let comment = action.details;
      newState.singlePost.Comments[comment.id] = comment
      let post = newState.posts[comment.postId]
      if (post && post.Comments) post.Comments[comment.id] = comment
      return newState
    case REMOVE_POST: {
        newState = { ...state };
        newState.posts = { ...newState.posts };
        newState.userPosts = { ...newState.userPosts };
        newState.communities = { ...newState.communities };
        newState.singlePost = {};
        console.log("action.id", action.id)
        delete newState.posts[action.id];
        // delete newState.singleCommunity.Posts[action.id];
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
    case GET_DETAILS2: {
      newState = { ...state };
      const community = action.details;
      newState.singleCommunity2 = { ...community };
      return newState;
    }
    default:
      return state;
  }
};

export default postsReducer
