import React from 'react'
// COMPONENTS
import AddComment from './components/comment/components/AddComment'
import List from '@material-ui/core/List'
import Comment from './components/comment/Comment'

export default function CommentsList({ selectedPost, comments }) {
  return (
      <div> 
        <AddComment selectedPost={selectedPost} />  
        <List>
          { comments.map((comment, key) => <Comment comment={comment} key={key} />) }
        </List>
      </div>   
  )}