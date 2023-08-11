import * as Yup from "yup";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";

// import { useAppDispatch } from "../../hooks"
// import { testLogin } from "../../store/auth";
import { TextInput } from "../../components/forms";
import { logInSchema, signUpSchema } from "./schemas/auth.schemas";

interface SingUpForm {
  email: string;
  password: string;
  username: string;
}

const SignUp = () => {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  
  const initialValues: SingUpForm = {
    email: '', 
    password: '',
    username: ''
  };

  // const testHere = () => {
  //   dispatch(testLogin())
  //   navigate('/')
  // }

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

          console.log({ values, actions });

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