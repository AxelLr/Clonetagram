import React from 'react'
// REDUX
import { deleteComment } from '../../../redux/actions/CommentsActions'
import { useDispatch } from 'react-redux'
// MUI
import ToolTip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'

export default function DeleteComment(props) {

    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteComment(props.comment_id, props.selectedPost._id))
    }
    return (
        <div>
            <ToolTip title="Borrar comentario" placement="bottom">
                    <IconButton onClick={handleDelete} > 
                        <CancelIcon color="primary"/>
                    </IconButton> 
                  </ToolTip>
        </div>
    )
}
