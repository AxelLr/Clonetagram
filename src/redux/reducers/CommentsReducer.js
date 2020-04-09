// TYPES
import { SET_POST_COMMENTS, SET_REPLYS } from './types'

const initialState = { 
    comments: []
}

export default function (state = initialState, action) {
    switch(action.type) {
    case SET_POST_COMMENTS: 
        return {
            comments: [ ...action.payload ] 
        }   
    case SET_REPLYS: {
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
    default: return state
}
}