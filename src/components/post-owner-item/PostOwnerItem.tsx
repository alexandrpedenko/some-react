import { Button } from "@mui/material";
import PostItemEditing from "../post-item-editing-form/PostItemEditingForm";
import PostItem from "../post-item/PostItem";
import { usePostDelete, usePostUpdate } from "../../hooks";
import { Post } from "../../types";

interface PostsItemProps {
  post: Post
}

const PostOwnerItem = ({ post }: PostsItemProps) => {
  const {
    isEditMode,
    onPostUpdate,
    cancelEditMode,
    switchToEditMode,
  } = usePostUpdate(post._id);
  const { onDeletePost } = usePostDelete(post._id);

  
  const actions = (
    <>
      <Button 
        size="small"
        onClick={switchToEditMode}
      >
        Edit
      </Button>
      <Button
        size="small" 
        color="error"
        onClick={onDeletePost}
      >
        Delete
      </Button>
    </>
  )
  
  return (
    <>
      {isEditMode 
        ? <PostItemEditing 
            post={post} 
            onCancelEditing={cancelEditMode} 
            onPostUpdate={onPostUpdate}
          /> 
        : <PostItem post={post} actions={actions} />
      }
    </>
  )
}

export default PostOwnerItem;
