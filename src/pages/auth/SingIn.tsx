import * as Yup from "yup";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";

import { useAppDispatch } from "../../hooks"
import { TextInput } from "../../components/forms";
import { logInSchema } from "./schemas/auth.schemas";
import { signInThunk } from "../../store/auth/thunks";

interface SingInForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const initialValues: SingInForm = {
    email: '', 
    password: ''
  };

  const onFormSubmit = (data: SingInForm) => {
    dispatch(signInThunk(data))
    navigate('/')
  }

  return (
    <Container maxWidth='xl' sx={{ 
      display:'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 0',
    
    }}>
      <Typography variant='h3' sx={{ mb: '2rem'}}>Sign In</Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({...logInSchema})}
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
              <Button disabled={isSubmitting} variant="outlined" color="primary" type="submit">Login</Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default SignIn