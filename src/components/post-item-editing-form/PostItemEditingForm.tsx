import * as Yup from "yup";
import {  Box, Button, Card, CardActions, CardContent, useTheme } from "@mui/material";
import { Form, Formik } from "formik";
import { TextInput } from "../forms";
import { Post } from "../../types";

interface PostsItemProps {
  post: Post;
  onCancelEditing: () => void;
  onPostUpdate: (values: UpdatePostFormValues) => void;
}

interface UpdatePostFormValues {
  title: string;
  description: string;
}

const PostItemEditing = ({ post, onCancelEditing, onPostUpdate }: PostsItemProps) => {
  const { palette } = useTheme();
  const initialValues: UpdatePostFormValues = {
    title: post.title,
    description: post.description
  };
  
  return (
    <Card 
      elevation={0}
      sx={{ 
        marginBottom: '1rem',
        border: `1px solid ${palette.grey[300]}`
      }}
    >
      
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          title: Yup.string().required('Required'),
          description: Yup.string().required('Required'),
        })}
        
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          onPostUpdate(values);

          actions.setSubmitting(false);
          actions.resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <CardContent>
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
              </Box>
            </CardContent>

            <CardActions sx={{justifyContent: 'end'}}>
              <Button
                disabled={isSubmitting}
                size="small"
                color="success"
                type="submit"
              >
                Update
              </Button>
              <Button
                size="small" 
                color="error"
                onClick={onCancelEditing}
              >
                Cancel
              </Button>
            </CardActions>
          </Form>
        )}
      </Formik>
    </Card>
  )
}

export default PostItemEditing;
