import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import { setUser } from '../redux/features/userSlice'
import axios from 'axios'

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)

  const getUser = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/getUserData',
        { token: localStorage.getItem('token') },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
      dispatch(hideLoading())
      if (res.data.success) {
        dispatch(setUser(res.data.data))
      } else {
        // Clear token and redirect to login if not successful
        localStorage.removeItem("token")
        window.location.href = '/login'
      }
    } catch (err) {
      dispatch(hideLoading())
      console.log(err)
      // Clear token and redirect to login if error occurs
      localStorage.removeItem("token")
      window.location.href = '/login'
    }
  };

  useEffect(() => {
    if (!user) {
      getUser()
    }
  }, [user,getUser])

  if (localStorage.getItem("token")) {
    return children
  } else {
    return <Navigate to="/login" />
  }
}

export default ProtectedRoute
