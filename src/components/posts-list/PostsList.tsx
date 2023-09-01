import { Box } from "@mui/material"
import { Post } from "../../types"
import PostOwnerItem from "../post-owner-item/PostOwnerItem"

interface PostsListProps {
  posts: Post[]
}

const PostsList = ({ posts }: PostsListProps) => {

  return (
    <Box>
      {posts.map(post => (
        <PostOwnerItem key={post._id} post={post} />
      ))}
    </Box>
  )
}

export default PostsList