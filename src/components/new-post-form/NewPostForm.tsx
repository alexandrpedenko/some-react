import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Form, Formik } from "formik";

import { TextInput } from "../../components/forms";
import { AlertTypeEnum, CreatePostInput, Post } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks"
import { createPost } from "../../api/post";
import { showAlert } from "../../store/alert";

interface NewPostFormValues {
  title: string;
  description: string;
}

const NewPostForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  const { mutate } = useMutation({
    mutationFn: (post: CreatePostInput) => {
      return createPost(post)
    },
    onSuccess: (data) => {
      dispatch(
        showAlert({
          type: AlertTypeEnum.Success,
          message: 'Post created!'
        })
      );

      // NOTE: Update from mutation response
      queryClient.setQueryData<Post[]>(['posts'], (oldData) => {
        return oldData ? [data, ...oldData] : oldData;
      })
    },
    onError: (error) => {
      const errorT = error as Error;
      dispatch(
        showAlert({
          type: AlertTypeEnum.Error,
          message: errorT.message
      }));
    }
  });
  
  const initialValues: NewPostFormValues = {
    title: '',
    description: ''
  };

  const onFormSubmit = ({ title, description }: NewPostFormValues) => {
    if (user) {
      mutate({
        title,
        description,
        author: user._id
      });
    }
  };

  return (
    <Box
      sx={{
        marginBottom: '2rem'
      }}
    >
      <Paper sx={{ padding: '1.3rem'}}>
        <Typography variant='h5' sx={{ mb: '1rem'}}>Create post</Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            title: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
          })}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            onFormSubmit(values)

            actions.setSubmitting(false);
            actions.resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box sx={{
                display:'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                width: '100%'
              }}>
                <TextInput
                  label="Title"
                  name="title"
                  type="text"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <TextInput
                  label="Description"
                  name="description"
                  minRows={1}
                  maxRows={6}
                  sx={{ mb: 2 }}
                  multiline
                />
                <Button 
                  disabled={isSubmitting} 
                  variant="outlined" 
                  color="primary" 
                  type="submit"
                  sx={{ alignSelf: 'end' }}
                >
                  Post
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  )
}

export default NewPostForm