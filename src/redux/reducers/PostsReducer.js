import { CLEAR_POSTS,
         GET_ALL_POSTS, 
         SET_SELECTED_POSTS, 
         SET_NEW_POST,
         DELETE_POST,
         SET_SUBSCRIPTIONS_POSTS, 
         SET_POST,
         SET_LIKES,
         SET_DISLIKE, 
         SET_NEW_SUBSCRIPTIONS_POSTS, 
         SET_NEW_IMAGE } from './types'

const initialState = {
    numberOfPosts : '',
    allPosts: [],
    selectedPosts: [],
    selectedPost: {}
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_ALL_POSTS:
            return {
                ...state,
                allPosts: [...action.payload.posts ],
                selectedPost: {},
                numberOfPosts: action.payload.numberOfPosts
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
        case SET_SUBSCRIPTIONS_POSTS: 
        console.log('overwrite')
            return {
                ...state,
                allPosts: [...action.payload]
            }
        case SET_NEW_SUBSCRIPTIONS_POSTS: 
        console.log('pushing new ones')
            return { 
                ...state,
                allPosts: [ ...state.allPosts, ...action.payload ] 
            }
        case CLEAR_POSTS:
            return {
                ...state,
                allPosts: []
            }
        case SET_POST:
            return {
                ...state,
                selectedPost: { ...action.payload }
            }   
        case SET_LIKES:
        case SET_DISLIKE: 
            return {
                 ...state,
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
        case SET_NEW_IMAGE:
            return {
                ...state,
                selectedPosts: state.selectedPosts.map(post => { 
                    if(post.userRef._id === action.payload.id) {
                        return { ...post, userRef: { ...post.userRef, profileImg: action.payload.profileImage } }
                    }
                    return post
                })
            }
        default: return state
    }
}