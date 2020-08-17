import React from "react";
import { Link } from "react-router-dom";

import { Layout, Menu } from "antd";
const { Header } = Layout;

const HeaderBar = ({ path }) => {
  return (
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Menu.Item key="1">
          <Link to={`${path.url}movies`}>Movies</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={`${path.url}games`}>Games</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderBar;
