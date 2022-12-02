import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <>
      <Navbar authenticateUser = {props.authenticateUser} user={props.user}/>
      <Outlet />
    </>
  );
};

export default Layout;