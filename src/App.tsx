import { Route, Routes } from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";
import People from "./pages/people/People";
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";
import SignIn from "./pages/auth/SingIn";
import SingUp from "./pages/auth/SingUp";
import AppAlert from "./components/alert/Alert";
import Authorized from "./components/protected/Authorized";
import UnAuthorized from "./components/protected/UnAuthorized";
import Navigation from "./components/navigation/Navigation";
import { useInterceptor } from "./hooks/useInterceptor";
import { useAppSelector } from "./hooks";


function App() {
  useInterceptor();
  const { isLoading } = useAppSelector(state => state.auth);

  const loader = (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );

  const router = (
    <Routes>
      <Route path='/' element={<Authorized component={<Home />} />} />
      <Route path='/home' element={<Authorized component={<Home />} />} />
      <Route path='people' element={<Authorized component={<People />} />} />

      <Route path='sign-in' element={<UnAuthorized component={<SignIn />} />} />
      <Route path='sign-up' element={<UnAuthorized component={<SingUp />} />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );

  return (
    <>
      <Navigation />
      <AppAlert />

      {
        isLoading ?
          loader :
          router
      }
    </>
  )
}

export default App
