import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { signoutSuccess } from "../redux/user/user.slice.js"


export default function DashSidebar() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user)
    const [tab, setTab] = useState();
    const location = useLocation();
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get("tab")
        if (tabFromUrl) {
            setTab(tabFromUrl)
        }
    }, [location.search])

    const handleSignOutUser = async () => {
        try {
            const res = await fetch("/api/user/signout", {
                method: "POST"
            })
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            }
            else {
                dispatch(signoutSuccess())
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (

        <Sidebar className="w-100 md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup className="flex flex-col gap-1">
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item as="div" active={tab === "profile"} href="#" labelColor="dark" label={currentUser.isAdmin ? "Admin" : "user"} icon={HiUser}>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {currentUser.isAdmin && (
                        <Link to="/dashboard?tab=posts">
                            <Sidebar.Item as="div" active={tab === "posts"} href="#" icon={HiDocumentText}>
                                Post
                            </Sidebar.Item>
                        </Link>
                    )}

                    {currentUser.isAdmin && (
                        <Link to="/dashboard?tab=users">
                            <Sidebar.Item as="div" active={tab === "users"} href="#" icon={HiOutlineUserGroup}>
                                Users
                            </Sidebar.Item>
                        </Link>
                    )}

                    <Sidebar.Item onClick={() => handleSignOutUser()} href="#" icon={HiArrowSmRight}>
                        Sign out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>

    );
}
