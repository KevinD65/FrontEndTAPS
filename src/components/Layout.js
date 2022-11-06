import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <>
      <Navbar authenticateUser = {props.authenticateUser}/>
      <Outlet />
    </>
  );
};

export default Layout;