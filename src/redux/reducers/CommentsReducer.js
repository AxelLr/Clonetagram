// TYPES
import { SET_POST_COMMENTS, SET_REPLIES, SET_NEW_COMMENT, DELETE_COMMENT, DELETE_REPLY } from './types'

const initialState = { 
    comments: []
}
export default function (state = initialState, action) {
    switch(action.type) {
    case SET_POST_COMMENTS: 
        return {
            comments: [ ...action.payload ] 
        }   
    case SET_REPLIES: {
        console.log(action.payload)
        return {
            comments: state.comments.map(comment => {
                if(comment._id === action.payload._id) {
                    return comment = action.payload
                }
                return comment
            })
        }
    }
    case SET_NEW_COMMENT: 
        return {
            comments: [...state.comments, action.payload]
        }
    case DELETE_COMMENT: 
        return { 
            comments: state.comments.filter(comment => comment._id !== action.payload)
        }
    case DELETE_REPLY:
        return {
            comments: state.comments.map(comment => {
                if(comment._id === action.payload.comment_id) {
                    return { ...comment, replies: comment.replies.filter(reply => reply._id !== action.payload.reply_id)}
                }
                return comment
            })
        }
    default: return state
}
}