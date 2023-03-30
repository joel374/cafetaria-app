import { Route, Routes } from "react-router-dom"
import Login from "./pages/users/Login"
import Menu from "./pages/users/Menu"
import Navbar from "./components/Navbar"
import AdminOrder from "./pages/admin/AdminOrder"
import AdminRoute from "./components/AdminRoute"
import { useEffect, useState } from "react"
import { axiosInstance } from "./api"
import { useDispatch } from "react-redux"
import { login } from "./redux/features/authSlice"
import { attach } from "./redux/features/resetSlice"

function App() {
  const [authCheck, setAuthCheck] = useState(false)
  const dispatch = useDispatch()
  const keepUserLoggedIn = async () => {
    try {
      const auth_token = localStorage.getItem("auth_token")

      if (!auth_token) {
        setAuthCheck(true)
        return
      }

      const response = await axiosInstance.get("/auth/refresh-token")

      dispatch(login(response.data.data))

      localStorage.setItem("auth_token", response.data.token)
      setAuthCheck(true)
    } catch (err) {
      console.log(err)
      setAuthCheck(true)
    } finally {
      setAuthCheck(true)
    }
  }

  const userResetData = async () => {
    try {
      const reset_token = localStorage.getItem("reset_token")

      if (!reset_token) {
        setAuthCheck(true)
        return
      }

      const response = await axiosInstance.get("/auth/refresh-token")

      dispatch(attach(response.data.data))

      localStorage.setItem("reset_token", response.data.token)
      setAuthCheck(true)
    } catch (err) {
      console.log(err)
      setAuthCheck(true)
    } finally {
      setAuthCheck(true)
    }
  }

  useEffect(() => {
    keepUserLoggedIn()
    userResetData()
  }, [])
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Menu />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminOrder />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
