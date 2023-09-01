import {  Card, CardActions, CardContent, Typography, useTheme } from "@mui/material"
import { Post } from "../../types"

interface PostsItemProps {
  post: Post,
  actions?: JSX.Element
}

const PostItem = ({ post, actions }: PostsItemProps) => {
  const { palette } = useTheme();
  
  return (
    <Card 
      elevation={0}
      sx={{ 
        marginBottom: '1rem',
        border: `1px solid ${palette.grey[300]}`
      }} 
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          { post.title }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { post.description }
        </Typography>
      </CardContent>
      
      {actions && (
        <CardActions sx={{justifyContent: 'end'}}>
          {actions}
        </CardActions>
      )}
    </Card>
  )
}

export default PostItem;
