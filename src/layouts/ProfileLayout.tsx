import NavProfile from "@/components/profile/NavProfile";
import { Outlet } from "react-router-dom";


export default function ProfileLayout() {

  return (
    <>
    <NavProfile />
    
    <div className="my-10">
      <Outlet />
    </div>
    </>
  )
}
