import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { Redirect } from "react-router-dom";

import { Typography, Form, Input, Button, Col, Row } from "antd";
const { Text, Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  const [, , setUsers, inputUser, setInputUser] = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      inputUser.username.replace(/\s/g, "") === "" ||
      inputUser.password.replace(/\s/g, "") === ""
    ) {
      setHelperText("Please Input Username or Password");
      return;
    }

    axios
      .post(`https://backendexample.sanbersy.com/api/login`, {
        username: inputUser.username,
        password: inputUser.password,
      })
      .then((res) => {
        setUsers({
          username: res.data.username,
          password: res.data.password,
        });
        if (res.data.id) {
          console.log(res.data);
          setHelperText("");
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: res.data.id,
              username: res.data.username,
              password: res.data.password,
            })
          );
          setRedirect(true);
          setHelperText("Login Successfully");
        } else {
          setRedirect(false);
          setHelperText("Incorrect username or password");
        }
      });
    setInputUser({
      username: "",
      password: "",
    });
  };

  const handleChange = (event) => {
    let typeOfInput = event.target.name;

    switch (typeOfInput) {
      case "username":
        setInputUser({ ...inputUser, username: event.target.value });
        break;
      case "password":
        setInputUser({ ...inputUser, password: event.target.value });
        break;
      default:
        break;
    }
  };

  return (
    <>
      {redirect ? <Redirect to="/" /> : null}
      <Row>
        <Col span={8} offset={6}>
          <Title>Login</Title>
          <form {...layout} name="basic" noValidate onSubmit={handleSubmit}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={inputUser.username}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={inputUser.password}
                onChange={handleChange}
              />
            </Form.Item>
            <Text type="danger">{helperText}</Text>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
