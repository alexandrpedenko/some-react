import * as Yup from "yup";

export const logInSchema = {
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(4, 'Min 4 character for password').required('Required'),
}

export const signUpSchema = {
  ...logInSchema,
  username: Yup.string().min(2, 'Min 4 character for username').required('Required'),
}