import { Box, CircularProgress, Container, Paper, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"

import NewPostForm from "../../components/new-post-form/NewPostForm"
import PostsList from "../../components/posts-list/PostsList"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { getUserPosts } from "../../api/post"
import { AlertTypeEnum } from "../../types"
import { showAlert } from "../../store/alert"
import { useEffect } from "react"


const Home = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const userId = user ? user._id : '';

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getUserPosts(userId)
  });

  useEffect(() => {
    if (isError) {
      const errorT = error as Error;
      dispatch(
        showAlert({
          type: AlertTypeEnum.Error,
          message: errorT.message
      }));
    }
  }, [isError, error, dispatch]);
  
  const loader = (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );
  
  const dataContent = () => {
    if (data?.length) {
      return <PostsList posts={data} />
    }

    return (
      <Paper sx={{ padding: '10px' }}>
        <Typography fontWeight={600}>
          No post created yet
        </Typography>
      </Paper>
    )
  }

  return (
    <Container maxWidth='sm' className="container" >
      <NewPostForm />
      {isLoading ? loader : dataContent()}
    </Container>
  )
}

export default Home