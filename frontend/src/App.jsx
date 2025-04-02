import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import {Toaster} from 'react-hot-toast'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import VerifyEmail from './pages/VerifyEmail'
import ForgotPassword from './pages/ForgotPassword'
import OpenRoute from './components/core/Auth/OpenRoute'
import About from './pages/About'
import MyProfile from './components/core/dashboard/MyProfile'
import Dashboard from './pages/Dashboard'
import Settings from './components/core/dashboard/Settings'
import EnrolledCourses from './components/core/dashboard/EnrolledCourses'
// import MyCourses from './components/core/dashboard/MyCourses'

function App() {

  return (
    <div className='w-screen min-h-screen bg-richblack-900 font-inter'>

      <Toaster />

      <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      
      <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

    <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />  

      <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  

        <Route 
          path='about'
          element = {

              <About />
            
          }
          />


          <Route 
          path='dashboard'
          element = {
            <Dashboard />
          }
          >
          <Route 
          path='my-profile'
          element = {
            <MyProfile />
          }
          />
           <Route 
          path='enrolled-courses'
          element = {
            <EnrolledCourses />
          }
          />
           {/* <Route 
          path='cart'
          element = {
            <MyCourses />
          }
          /> */}

        <Route 
          path='settings'
          element = {
            <Settings />
          }
          />

          </Route>

        </Routes>
    </div>
  )
}

export default App
