import { csrfFetch } from "./csrf";


const GET_COMMUNITIES = 'communities/getCommunities';
const GET_COMMUNITY_POSTS = 'communities/getCommunityPosts';
const GET_COMMUNITY_COMMENTS = 'communities/getCommunityComments';
const GET_DETAILS = 'communities/getDetails';
const GET_USER_COMMUNITIES = 'communities/getUserCommunities';
const REMOVE_COMMUNITIES = 'communities/removeCommunities'
const GET_COMMUNITY_MEMBERSHIPS = 'communities/getCommunityMemberships';
const ADD_COMMUNITY_MEMBERSHIPS = 'communities/addCommunityMemberships';
const REMOVE_COMMUNITY_MEMBERSHIPS = 'communities/removeCommunityMemberships';
const GET_COMMUNITY_MEMBERS = 'communities/getCommunityMembers';
const ADD_COMMUNITY_MEMBER = 'communities/addCommunityMembers';
const REMOVE_COMMUNITY_MEMBER = 'communities/removeCommunityMembers';
const GET_MEMBERSHIPS = 'communities/getMemberships';
const SEARCHED_COMMUNITIES = 'communities/searchedCommunities'
const SEARCHED_PROFILES = 'communities/searchedProfiles'

const getCommunities = (communities) => {
    return {
        type: GET_COMMUNITIES,
        communities
    }
}

const getCommunitySearchedPosts = (posts) => {
    return {
        type: GET_COMMUNITY_POSTS,
        posts
    }
}
const getCommunitySearchedComments = (comments) => {
    return {
        type: GET_COMMUNITY_COMMENTS,
        comments
    }
}

const searchedCommunities = (communities) => {
    return {
        type: SEARCHED_COMMUNITIES,
        communities
    }
}

const searchProfiles = (communities) => {
    return {
        type: SEARCHED_PROFILES,
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

const getMemberships = (memberships) => {
    return {
        type: GET_MEMBERSHIPS,
        memberships,

    }
};


const getCommunityMemberships = (memberships) => {
    return {
        type: GET_COMMUNITY_MEMBERSHIPS,
        memberships,
    }
};


const addCommunityMemberships = (memberships) => {
    return {
        type: ADD_COMMUNITY_MEMBERSHIPS,
        memberships,
    }
};

const removeCommunityMemberships = (id) => {
    return {
        type: REMOVE_COMMUNITY_MEMBERSHIPS,
        id,
    }
};

const getCommunityMembers = (memberships) => {
    return {
        type: GET_COMMUNITY_MEMBERS,
        memberships,
    }
};


const addCommunityMember = (membership) => {
    return {
        type: ADD_COMMUNITY_MEMBER,
        membership,
    }
};

const removeCommunityMember = (userId) => {
    return {
        type: REMOVE_COMMUNITY_MEMBER,
        userId,
    }
};








export const thunkGetAllCommunities = () => async (dispatch) => {
    const response1 = await csrfFetch('/api/communities')
    const data1 = await response1.json();
    dispatch(getCommunities(data1));
    // console.log("WTF IS HAPPENING???", data1)
    return response1;
}


export const thunkGetAllSearchedCommunitites = (page) => async (dispatch) => {
    const response1 = await csrfFetch(`/api/communities/search?page=${page}`);
    let data1 = await response1.json();
    dispatch(getCommunities(data1));
    return response1;

}

export const thunkGetAllSearched2Communitites = (page, search) => async (dispatch) => {
    const response1 = await csrfFetch(`/api/communities/search/community?page=${page}&search=${search}`);
    let data1 = await response1.json();
    dispatch(searchedCommunities(data1));
    return response1;

}

export const thunkGetSearchedCommunitiyPosts = (id, page, search) => async (dispatch) => {
    const response1 = await csrfFetch(`/api/communities/${id}/posts?page=${page}&search=${search}`);
    let data1 = await response1.json();
    dispatch(getCommunitySearchedPosts(data1));
    return response1;

}

export const thunkGetSearchedCommunitiyComments = (id, page, search) => async (dispatch) => {
    const response1 = await csrfFetch(`/api/communities/${id}/comments?page=${page}&search=${search}`);
    let data1 = await response1.json();
    dispatch(getCommunitySearchedComments(data1));
    return response1;

}


export const thunkGetAllSearched3Communitites = (page, search) => async (dispatch) => {
    const response1 = await csrfFetch(`/api/communities/search/community2?page=${page}&search=${search}`);
    let data1 = await response1.json();
    dispatch(searchProfiles(data1));
    return response1;

}


export const thunkGetAllSearchedProfiles = (page) => async (dispatch) => {
    const response1 = await csrfFetch(`/api/communities/search2?page=${page}`);
    let data1 = await response1.json();
    dispatch(getCommunities(data1));
    return response1;

}

export const thunkRefreshSearch = (id) => async (dispatch) => {

    dispatch(searchProfiles([]))
    dispatch(searchedCommunities([]))
    return "succesfully refreshed"
  }


export const thunkGetDetailsById = (id) => async (dispatch) => {
    const response1 = await csrfFetch(`/api/communities/${id}`)
    const data1 = await response1.json();
    if (data1) dispatch(getDetails(data1));
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
    // console.log("WTF IS HAPPENING???", data)
    return data;
};

export const thunkGetCommunityMemberships = (id) => async (dispatch) => {
    let response = await fetch(`/api/communities/${id}/memberships`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    dispatch(getCommunityMemberships(data));
    // console.log("WTF IS HAPPENING???", data)
    return data;
};

export const thunkGetCommunityMembers = (id) => async (dispatch) => {
    let response = await fetch(`/api/communities/${id}/membership`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    dispatch(getCommunityMembers(data));
    // console.log("WTF IS HAPPENING???", data)
    return data;
};

export const thunkGetMemberships = () => async (dispatch) => {
    let response = await fetch(`/api/communities/other`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    dispatch(getMemberships(data));
    // console.log("WTF IS HAPPENING???", data)
    return data;
};



export const thunkCreateCommunity = (data) => async (dispatch) => {
    if (Object.values(data).length) {
        const response = await csrfFetch(`/api/communities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        })
        const data1 = await response.json()
        // console.log("REDUCER", data1)
        dispatch(getDetails(data1))
       // console.log("WTF IS HAPPENING???", data1)
        return data1
    }
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
        dispatch(getDetails(data1))
        return data1
    }
}

export const thunkUpdateCommunityStyle = (id, icon, banner, background) => async (dispatch) => {
    let response
    if (icon && Object.values(icon).length) {
         response = await csrfFetch(`/api/communities/${id}/style?i=${true}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(icon)
            })
    }
    if (banner && Object.values(banner).length) {
         response = await csrfFetch(`/api/communities/${id}/style?ban=${true}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(banner)
            })
    }
    if (background && Object.values(background).length) {
         response = await csrfFetch(`/api/communities/${id}/style?bg=${true}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(background)
            })
    }

    const data1 = await response?.json()
    dispatch(getDetails(data1))
    return data1

}

export const thunkUpdateCommunityImages = (id, images) => async (dispatch) => {

    const formData = new FormData();

    if (images && images.length !== 0) {
        for (var i = 0; i < images.length; i++) {
        formData.append("image", images[i]);
        }
    }


    let response

    if (images && images.length) {
            if (images[0]) {
            response = await csrfFetch(`/api/communities/${id}/style/images?icon=${true}`, {
                method: 'PUT',
                headers: {
                "Content-Type": "multipart/form-data",
                },
                body: formData

            })
            }
            if ( images[1] )
            response = await csrfFetch(`/api/communities/${id}/style/images?banner=${true}`, {
            method: 'PUT',
            headers: {
            "Content-Type": "multipart/form-data",
            },
            body: formData

            })
            if ( images[2] )
            response = await csrfFetch(`/api/communities/${id}/style/images?bg=${true}`, {
            method: 'PUT',
            headers: {
            "Content-Type": "multipart/form-data",
            },
            body: formData

            })



        }

        const data1 = await response?.json()
        dispatch(getDetails(data1))
        return data1

}


export const thunkJoinCommunities = (id, type) => async (dispatch) => {

    let status

    if (!type) {
        status = { status: "Unapproved" }
    }

    const response = await csrfFetch(`/api/communities/${id}/memberships`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(status)
        })
        const data1 = await response.json(response)
        dispatch(addCommunityMemberships(data1))
        // console.log("WTF IS HAPPENING???", data1)
        return data1
}

export const thunkUnjoinCommunities = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/communities/${id}/memberships`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
    })
    let data = await response.json();
    dispatch(removeCommunityMemberships(id))
    // console.log("WTF IS HAPPENING???", data)
    return data
}

export const thunkAddMember = (communityId, userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/communities/${communityId}/member/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data1 = await response.json(response)
        // console.log("REDUCER", data1)
        dispatch(addCommunityMember(data1))
        return data1
}

export const thunkUpdateMember = (communityId, userId, status) => async (dispatch) => {
    // console.log("REDUCER, STATUS:", status)
    const response = await csrfFetch(`/api/communities/${communityId}/member/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        })
        const data1 = await response.json(response)
        // console.log("REDUCER", data1)
        dispatch(addCommunityMember(data1))
        return data1
}

// export const thunkRemoveMember = (communityId, userId) => async (dispatch) => {
//     console.log("REDUCER, USERID:", userId)
//     const response = await csrfFetch(`/api/communities/${communityId}/member2/${userId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//           },
//     })
//     let data = await response.json();
//     dispatch(addCommunityMember(userId))
//     return data
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
    communityMembers: {},
    memberships: {},
    searchCommunities: {},
    searchProfiles: {},
    searchPosts: {},
    searchComments: {},
    hotCommunityPosts: {},
    topCommunityPosts: {}
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
      case SEARCHED_COMMUNITIES:
        newState = { ...state };
        if (!action.communities?.length) return newState
        action.communities.forEach(
          (community) => (newState.searchCommunities[community.id] = community)
        );
      return newState;
      case GET_COMMUNITY_POSTS:
        newState = { ...state };
        if (!action.posts?.length) return newState
        action.posts.forEach(
          (post) => (newState.searchPosts[post.id] = post)
        );
      return newState;
      case GET_COMMUNITY_COMMENTS:
        newState = { ...state };
        if (!action.comments?.length) return newState
        action.comments.forEach(
          (comment) => (newState.searchComments[comment.id] = comment)
        );
      return newState;
      case SEARCHED_PROFILES:
        newState = { ...state };
        if (!action.communities?.length) return newState
        action.communities.forEach(
          (community) => (newState.searchProfiles[community.id] = community)
        );
      return newState;
    case GET_DETAILS: {
        newState = { ...state };
        const community = action.details?.community2;
        const community2 = action.details
        const member = action.details?.member
        if (community) newState.singleCommunity = { ...community };
        if (community2) newState.singleCommunity = { ...community2 };
        if (member) newState.memberships[member.communityId] = { ...member.Community }
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
        if (action.communities && action.communities.length) action.communities.forEach(
          (community) => (newState.userCommunities[community.id] = community)
        );
        return newState;
    }
    case GET_COMMUNITY_MEMBERSHIPS: {
        newState = { ...state };
        newState.communityMemberships = {};
        if (action.memberships.length) action.memberships?.forEach(
          (member) => (newState.communityMemberships[member.userId] = member)
        );
        return newState;
    }
    case GET_MEMBERSHIPS: {
        newState = { ...state };
        newState.memberships = {};
        action.memberships?.forEach(
          (memberships) => (newState.memberships[memberships.Community.id] = memberships.Community)
        );
        return newState;
    }
    case ADD_COMMUNITY_MEMBERSHIPS: {
        newState = { ...state };
        const community = action.memberships;
        newState.communityMemberships[community.id] = { ...community };
        newState.memberships[community.communityId] = { ...community.Community }
        return newState;
    }
    case REMOVE_COMMUNITY_MEMBERSHIPS: {
        newState = { ...state };
        delete newState.communityMemberships[action.id]
        delete newState.memberships[action.id]
        return newState;
    }
    case GET_COMMUNITY_MEMBERS: {
        newState = { ...state };
        newState.communityMembers = {};
        action.memberships.forEach(
          (member) => (newState.communityMembers[member.userId] = member.User)
        );
        return newState;
    }
    case ADD_COMMUNITY_MEMBER: {
        newState = { ...state };
        const member = action.membership;
       //delete newState.communityMemberships[member.userId];
        newState.communityMemberships[member.userId] = member;
        return newState;
    }
    case REMOVE_COMMUNITY_MEMBER: {
        newState = { ...state };
        delete newState.communityMemberships[action.userId]
        return newState;
    }
    default:
      return state;
  }
};

export default communitiesReducer
