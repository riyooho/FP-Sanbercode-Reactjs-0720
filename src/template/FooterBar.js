import React from "react";

import { Layout } from "antd";
const { Footer } = Layout;

const FooterBar = ({ path }) => {
  return (
    <Footer style={{ textAlign: "center", backgroundColor: "#bbb" }}>
      Ant Design ©2020{" "}
      <a href="http://github.com/staticriou">Wahyu Satrio Nugroho</a>
    </Footer>
  );
};

export default FooterBar;
