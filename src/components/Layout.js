import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <>
      <Navbar authenticateUser = {props.authenticateUser} authenticatedUser = {props.authenticatedUser}/>
      <Outlet />
    </>
  );
};

export default Layout;