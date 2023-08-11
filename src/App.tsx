import { Route, Routes } from "react-router-dom"

import Home from "./pages/home/Home"
import People from "./pages/people/People"
import Navigation from "./components/navigation/Navigation"
import NotFound from "./pages/not-found/NotFound"
import SignIn from "./pages/auth/SingIn"
import SingUp from "./pages/auth/SingUp"
import Authorized from "./components/protected/Authorized"
import UnAuthorized from "./components/protected/UnAuthorized"

function App() {

  return (
    <>
      <Navigation />

      <Routes>
        <Route path='/' element={<Authorized component={<Home />} />} />
        <Route path='/home' element={<Authorized component={<Home />} />} />
        <Route path='people' element={<Authorized component={<People />} />} />

        <Route path='sign-in' element={<UnAuthorized component={<SignIn />} />} />
        <Route path='sign-up' element={<UnAuthorized component={<SingUp />} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
