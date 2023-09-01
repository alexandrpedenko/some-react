import * as Yup from "yup";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";

import { signUpSchema } from "./schemas/auth.schemas";
import { TextInput } from "../../components/forms";
import { RegistrationInput } from "../../types";
import { useAppDispatch } from "../../hooks"
import { signUpThunk } from "../../store/auth/auth-thunks";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const initialValues: RegistrationInput = {
    email: '', 
    password: '',
    username: ''
  };

  const onFormSubmit = (data: RegistrationInput) => {
    dispatch(signUpThunk(data));
    navigate('/sign-in');
  }

  return (
    <Container maxWidth='xl' sx={{ 
      display:'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 0',
    
    }}>
      <Typography variant='h3' sx={{ mb: '2rem'}}>Register Account</Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({...signUpSchema})}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          onFormSubmit(values)
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box sx={{
              display:'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <TextInput
                label="Enter your email"
                name="email"
                type="text"
                placeholder="example@mail.com"
                sx={{ mb: 4 }}
              />
              <TextInput
                label="Enter your password"
                name="password"
                type="password"
                sx={{ mb: 4 }}
              />
              <TextInput
                label="Enter your name"
                name="username"
                type="text"
                sx={{ mb: 4 }}
              />
              <Button disabled={isSubmitting} variant="outlined" color="primary" type="submit">SignUp</Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default SignUp