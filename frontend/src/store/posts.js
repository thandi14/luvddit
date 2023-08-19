import { csrfFetch } from "./csrf";


const GET_POSTS = 'posts/getPosts';
const GET_DETAILS = 'posts/getDetails';
const GET_USER_POSTS = 'posts/getUserPosts';
const REMOVE_POST = 'posts/removePosts'


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

const removePost = (id) => {
    return {
        type: REMOVE_POST,
        id
    }
}

const getUserPosts = (posts) => ({
    type: GET_USER_POSTS,
    posts,
  });



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
        console.log("thunk", response)

        if (Object.values(img).length) {
        const response2 = await csrfFetch(`/api/posts/${postId}/images`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(img)
        })
        }

        console.log(data1)
        dispatch(getDetails(data1))
        return data1

    }
}

export const thunkUpdatePosts = (id, data) => async (dispatch) => {
  console.log(data)
    if (Object.values(data).length) {
        const response = await csrfFetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        })
        const data1 = await response.json()
        dispatch(getDetails(data1))
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
};


const postsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_POSTS:
        newState = { ...state };
        console.log(action.posts)
        action.posts.forEach(
          (post) => (newState.posts[post.id] = post)
        );
      return newState;
    case GET_DETAILS: {
        newState = { ...state };
        const post = action.details;
        newState.singlePost = { ...post };
        return newState;
    }
    case REMOVE_POST: {
        newState = { ...state };
        newState.posts = { ...newState.posts };
        newState.userPosts = { ...newState.userPosts };
        newState.singlePost = {};
        delete newState.posts[action.id];
        delete newState.userPosts[action.id];
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
