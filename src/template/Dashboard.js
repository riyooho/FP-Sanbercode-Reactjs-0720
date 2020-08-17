import React from "react";
import { Layout } from "antd";
import HeaderBar from "./HeaderBar";
import SideBar from "./SideBar";
import Section from "./Section";
import FooterBar from "./FooterBar";
import "antd/dist/antd.css";

const Dashboard = ({ match }) => {
  return (
    <Layout>
      <HeaderBar path={match} />
      <Layout>
        <SideBar path={match} />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Section path={match} />
        </Layout>
      </Layout>
      <FooterBar path={match} />
    </Layout>
  );
};

export default Dashboard;
