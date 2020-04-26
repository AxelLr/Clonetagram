import React from 'react'
// MUI
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
// COMPONENTS
import Reply from './components/Reply'
import AddReply from './components/AddRepply'

export default function Replies ({ replies, comment, selectedPost }) {

    return (
       <ExpansionPanelDetails style={{ width: '100%', maxHeight: 450, padding: 0 }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', maxHeight: 400, overflow: 'auto'}}>
                <AddReply comment={comment} selectedPost={selectedPost} />
                { replies.map((reply, key) => <Reply reply={reply} key={key} comment={comment} />) }
            </div> 
      </ExpansionPanelDetails>
    )
}
