import { CLEAN_POSTS, GET_ALL_POSTS, SET_SELECTED_PROFILE,
         SET_SELECTED_POSTS, SET_NEW_POST, DELETE_POST,
         DATA_LOADING, DATA_LOADED, SET_SUBSCRIPTIONS_POSTS, 
         SET_USERS, SET_POST, SET_REPLYS, SET_LIKES,
         SET_POST_COMMENTS, SET_DISLIKE } from './types'

const initialState = {
    allPosts: [],
    loading: false,
    selectedProfile: {},
    selectedPosts: [],
    usersList: [],
    selectedPost: {},
    comments: []
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_ALL_POSTS:
            return {
                ...state,
                allPosts: [...action.payload ],
                selectedPost: {}
            }
        case SET_SELECTED_PROFILE: 
            return {
                ...state,
                selectedProfile: { ...action.payload }
            }
        case SET_SELECTED_POSTS:
            return {
                ...state,
                selectedPosts: [ ...action.payload ]
            }
        case SET_NEW_POST:
            return {
                ...state,
                allPosts: [ { ...action.payload }, ...state.allPosts ],
                selectedPosts: [ { ...action.payload }, ...state.selectedPosts ]
            }
        case DELETE_POST:
            return {
                ...state,
                allPosts: state.allPosts.filter(post => post._id !== action.payload),
                selectedPosts: state.selectedPosts.filter(post => post._id !== action.payload),
                selectedPost: ''
            }
        case DATA_LOADING:
            return {
                ...state,
                loading: true
        }
        case DATA_LOADED:
            return {
                ...state,
                loading: false
        }
        case SET_SUBSCRIPTIONS_POSTS: 
            console.log(action.payload)
            return {
                ...state,
                allPosts: [...action.payload]
            }
        case CLEAN_POSTS:
            return {
                ...state,
                allPosts: []
            }
        case SET_USERS:
            return {
                ...state,
                usersList: [...action.payload ]
            }
        case SET_POST:
            return {
                ...state,
                selectedPost: { ...action.payload }
            } 
        case SET_POST_COMMENTS: 
            return {
                ...state,
                comments: [ ...action.payload ] 
            }
        case SET_REPLYS: {
            console.log(action.payload)
            return {
                ...state,
                comments: state.comments.map(comment => {
                    if(comment._id === action.payload._id) {
                        return comment = action.payload
                    }
                    return comment
                })
            }
        }    
        case SET_LIKES:
        case SET_DISLIKE: 
            return { ...state,
             allPosts: state.allPosts.map(post => {
                if (post._id === action.payload._id) {
                  return {...post, likes: [...action.payload.likes]}
                };
                return post;
              }),
             selectedPosts: state.selectedPosts.map(post => {
                 if(post._id === action.payload._id) {
                     return {...post, likes: [...action.payload.likes ]}
                 }
                 return post;
             }),
             selectedPost: {...state.selectedPost, likes: [...action.payload.likes]}
            }            
        default: return state
    }
}