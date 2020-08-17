import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../users/UserContext";

import { Layout, Menu, Button } from "antd";
const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = ({ path }) => {
  const [, users, setUsers, ,] = useContext(UserContext);

  const handleSignOut = () => {
    setUsers(null);
    localStorage.removeItem("user");
  };

  const LoginMenu = ({ user, ...props }) => {
    return (
      <>
        {user ? (
          <Button type="primary" block size="large">
            <Link onClick={handleSignOut}>Logout</Link>
          </Button>
        ) : (
          <>
            <Button type="primary" block size="large">
              <Link to={`${path.url}login`}>Login</Link>
            </Button>
            <Button type="primary" block size="large">
              <Link to={`${path.url}register`}>Register</Link>
            </Button>
          </>
        )}
      </>
    );
  };

  return (
    <Sider width={200} className="site-layout-background">
      <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
        <LoginMenu user={users} />

        {users ? (
          <SubMenu
            key="sub2"
            title={
              <span>
                <span>Admin</span>
              </span>
            }
          >
            <Menu.Item key="4">
              <Link to={`${path.url}movies-list`}>Data Movies</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to={`${path.url}games-list`}>Data Games</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to={`${path.url}change-password`}>Change Password</Link>
            </Menu.Item>
          </SubMenu>
        ) : null}
      </Menu>
    </Sider>
  );
};

export default SideBar;
