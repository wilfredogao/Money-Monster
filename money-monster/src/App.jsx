import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './App.css'
import SignUp from './Components/LoginSignUp/SignUp'
import LogIn from './Components/LoginSignUp/Login'
import Banner from './Components/Banner/Banner'
import Main from './Components/Main/Main'
import Home from './Components/Home/Home'

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <div>
        <Banner/>
        <Main/>
      </div>
  },
  {
    path: "/signup",
    element:
      <div>
        <Banner/>
        <SignUp/>
      </div>
  },
  {
    path: "/login",
    element:
      <div>
        <Banner/>
        <LogIn/>
      </div>
  },
  {
    path: "/app",
    element:
      <div>
        <Banner/>
        <Home />
      </div>
  }
])

function App() {
  

  return (
    <RouterProvider router={router} />
  )
}

export default App;
