/* eslint-disable react/jsx-no-undef */
import HomeScreen from './Screens/HomeScreen'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AboutUs from './Screens/AboutUs'
import ContactUs from './Screens/ContactUs'
import MoviesPage from './Screens/Movies'
import SingleMovie from './Screens/SingleMovie'
import WatchPage from './Screens/WatchPage'
import Login from './Screens/Login'
import Register from './Screens/Register'
import Profile from './Screens/Dashboard/Profile'
import Aos from "aos";
import Password from './Screens/Dashboard/Password'
import FavoriteMovies from './Screens/Dashboard/FavoriteMovies'
import MovieList from './Screens/Dashboard/Admin/MovieList'
import Dashboard from './Screens/Dashboard/Admin/Dashboard'
import Categories from './Screens/Dashboard/Admin/Categories'
import Users from './Screens/Dashboard/Admin/Users'
import AddMovie from './Screens/Dashboard/Admin/AddMovie'
import ScrollOnTop from './ScrollOnTop'
import DrawerContext from './Context/DrawerContext'
import ToastContainer from './Notifications/ToastContainer'
import { AdminProtectedRouter, ProtectedRouter } from './ProtectedRouter'
import NotFound from './Screens/NotFound'
import EditMovie from './Screens/Dashboard/Admin/EditMovie'
export default function App() {
  Aos.init();
  return (
    <>
      <ToastContainer />
      <DrawerContext>
        <ScrollOnTop>
          <Routes>
            {/* PUBLIC ROUTERS */}
            <Route path="/" element={<HomeScreen />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='/movies' element={<MoviesPage />} />
            <Route path='/movies/:search' element={<MoviesPage />} />
            <Route path='/movie/:id' element={<SingleMovie />} />
            <Route path='/watch/:id' element={<WatchPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<NotFound />} />
            {/* PRIVATE ROUTERS */}
            <Route element={<ProtectedRouter />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/password' element={<Password />} />
              <Route path='/favorites' element={<FavoriteMovies />} />
              {/* ADMIN ROUTERS */}
              <Route element={<AdminProtectedRouter />}>
                <Route path='/movieslist' element={<MovieList />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/categories' element={<Categories />} />
                <Route path='/users' element={<Users />} />
                <Route path='/addmovie' element={<AddMovie />} />
                <Route path='/edit/:id' element={<EditMovie />} />
              </Route>
            </Route>
          </Routes>
        </ScrollOnTop>
      </DrawerContext>
    </>
  )
}