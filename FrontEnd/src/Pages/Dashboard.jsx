import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom" // ye hm is liye use kr rhy hn taky dashboard mn ye pta kr sky k hm kis tab pay hn.
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";


export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab")
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Side bar */}
        <DashSidebar />
      </div>
      {tab === "profile" && <DashProfile />}
      {/* profile section */}
    </div>
  )
}
