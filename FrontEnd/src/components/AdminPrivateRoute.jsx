import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"
// Outlet is liye use kr rhy hn taky agr hmri condition thk ho gai to ye us k children ko access kr sky
export default function AdminPrivateRoute() {
    const { currentUser } = useSelector((state) => state.user)
    return currentUser && currentUser.isAdmin ? <Outlet /> : <Navigate to="/sign-in" />
}