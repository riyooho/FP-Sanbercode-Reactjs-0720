import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

import { Form, Input, Button, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
const { Text, Title } = Typography;

const ChangePassword = () => {
  const [apiUser, , , ,] = useContext(UserContext);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [inputPassword, setInputPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [messages, setMessages] = useState("");

  const formLayout = {
    labelCol: {
      xs: { span: 3 },
      sm: { span: 0 },
    },
    wrapperCol: {
      xs: { span: 0 },
      sm: { span: 10 },
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      inputPassword.oldPassword.replace(/\s/g, "") === "" ||
      inputPassword.newPassword.replace(/\s/g, "") === "" ||
      inputPassword.confirmPassword.replace(/\s/g, "") === ""
    ) {
      setMessages("Please Input Required Field");
      return;
    }

    if (currentUser.password !== inputPassword.oldPassword) {
      setMessages("Wrong old Password");
      return;
    }

    if (inputPassword.newPassword !== inputPassword.confirmPassword) {
      setMessages("Please Re-type your new password");
      return;
    }

    axios
      .put(`${apiUser}/${currentUser.id}`, {
        updated_at: new Date(),
        password: inputPassword.newPassword,
      })
      .then((res) => {
        currentUser.password = inputPassword.newPassword;
        setMessages("Success");
      });

    setInputPassword({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleChange = (event) => {
    let typeOfInput = event.target.name;

    switch (typeOfInput) {
      case "oldPassword":
        setInputPassword({ ...inputPassword, oldPassword: event.target.value });
        break;
      case "newPassword":
        setInputPassword({ ...inputPassword, newPassword: event.target.value });
        break;
      case "confirmPassword":
        setInputPassword({
          ...inputPassword,
          confirmPassword: event.target.value,
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Title level={2}>Change Password</Title>
      <Form {...formLayout}>
        <form onSubmit={handleSubmit}>
          <Form.Item name="OldPassword" rules={[{ required: true }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Old Password"
              name="oldPassword"
              id="oldPassword"
              label="Old Password"
              value={inputPassword.oldPassword}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="NewPassword" rules={[{ required: true }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="New Password"
              name="newPassword"
              id="newPassword"
              label="New Password"
              value={inputPassword.newPassword}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="ConfirmPassword" rules={[{ required: true }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Re-Type Password"
              name="confirmPassword"
              id="confirmPassword"
              label="Re-Type Password"
              value={inputPassword.confirmPassword}
              onChange={handleChange}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          {messages !== "" ? <Text type="danger">{messages}</Text> : null}
        </form>
      </Form>
    </>
  );
};

export default ChangePassword;
