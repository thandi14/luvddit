import { csrfFetch } from "./csrf";


const GET_COMMUNITIES = 'communities/getCommunities';
const GET_DETAILS = 'communities/getDetails';
const GET_USER_COMMUNITIES = 'communities/getUserCommunities';
const REMOVE_COMMUNITIES = 'communities/removeCommunities'
const GET_COMMUNITY_MEMBERSHIPS = 'communities/getCommunityMemberships';


const getCommunities = (communities) => {
    return {
        type: GET_COMMUNITIES,
        communities
    }
}

const getDetails = (details) => {
    return {
        type: GET_DETAILS,
        details
    }
}

const removeCommunities = (id) => {
    return {
        type: REMOVE_COMMUNITIES,
        id
    }
}

const getUserCommunities = (communities) => {
    return {
        type: GET_USER_COMMUNITIES,
        communities,

    }
};

const getCommunityMemberships = (memberships) => {
    return {
        type: GET_COMMUNITY_MEMBERSHIPS,
        memberships,
    }
};




export const thunkGetAllCommunities = () => async (dispatch) => {
    const response1 = await csrfFetch('/api/communities')
    const data1 = await response1.json();
    dispatch(getCommunities(data1));
    return response1;
}



export const thunkGetDetailsById = (id) => async (dispatch) => {
    const response1 = await csrfFetch(`/api/communities/${id}`)
    const data1 = await response1.json();
    dispatch(getDetails(data1));
    return data1;
}

export const thunkGetUserCommunities = () => async (dispatch) => {
    let response = await fetch(`/api/communities/current`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    dispatch(getUserCommunities(data));
    return data;
};

export const thunkGetCommunityMemberships = () => async (dispatch) => {
    let response = await fetch(`/api/communities/memberships`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    dispatch(getCommunityMemberships(data));
    return data;
};

// export const thunkCreatePost = (data, id) => async (dispatch) => {
//     if (Object.values(data).length) {
//         const response = await csrfFetch(`/api/communities/:${id}/posts`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//               },
//             body: JSON.stringify(data)
//         })
//         const data = await response.json()
//         dispatch(getDetails(data))
//         return response
//     }
// }

// export const thunkUpdatePosts = (id, data) => async (dispatch) => {
//     if (Object.values(data).length) {
//         const response = await csrfFetch(`/api/posts/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//               },
//             body: JSON.stringify(data)
//         })
//         const data = await response.json()
//         dispatch(getDetails(data))
//         return response
//     }
// }

// export const deletePosts = (id) => async (dispatch) => {
//     const response = await csrfFetch(`/api/posts/${id}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//           },
//     })
//     // let data = await response.json()
//     dispatch(removePost(id))
//     return response
// }

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
    communities: {},
    userCommunities: {},
    singleCommunity: {},
    communityMemberships: {},
};


const communitiesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_COMMUNITIES:
        newState = { ...state };
        action.communities.forEach(
          (community) => (newState.communities[community.id] = community)
        );
      return newState;
    case GET_DETAILS: {
        newState = { ...state };
        const community = action.details;
        newState.singleCommunity = { ...community };
        return newState;
    }
    case REMOVE_COMMUNITIES: {
        newState = { ...state };
        newState.communities = { ...newState.communities };
        newState.userCommunities = { ...newState.userCommunities };
        newState.singleCommunity = {};
        delete newState.communities[action.id];
        delete newState.userCommunities[action.id];
        return newState;
    }
    case GET_USER_COMMUNITIES: {
        newState = { ...state };
        newState.userCommunities = {};
        action.communities.forEach(
          (community) => (newState.userCommunities[community.id] = community)
        );
        return newState;
    }
    case GET_COMMUNITY_MEMBERSHIPS: {
        newState = { ...state };
        newState.communityMemberships = {};
        action.memberships.forEach(
          (community) => (newState.communityMemberships[community.communityId] = community)
        );
        return newState;
    }
    default:
      return state;
  }
};

export default communitiesReducer
