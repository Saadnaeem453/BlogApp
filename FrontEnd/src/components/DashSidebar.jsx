import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { signoutSuccess } from "../redux/user/user.slice.js"


export default function DashSidebar() {
    const dispatch = useDispatch();

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
                <Sidebar.ItemGroup>
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item as="div" active={tab === "profile"} href="#" labelColor="dark" label="user" icon={HiUser}>
                            Profile
                        </Sidebar.Item>
                    </Link>

                    <Sidebar.Item onClick={() => handleSignOutUser()} href="#" icon={HiArrowSmRight}>
                        Sign out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>

    );
}
