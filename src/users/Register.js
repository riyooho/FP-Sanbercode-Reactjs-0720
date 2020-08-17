import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useHistory, Redirect } from "react-router-dom";

import { Typography, Form, Input, Button, Col, Row } from "antd";
const { Text, Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Register = () => {
  const [apiUser, , setUsers, inputUser, setInputUser] = useContext(
    UserContext
  );
  const [redirect, setRedirect] = useState(false);
  const [helperText, setHelperText] = useState("");
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      inputUser.username.replace(/\s/g, "") === "" ||
      inputUser.password.replace(/\s/g, "") === ""
    ) {
      setHelperText("Please Fill Username and Password");
      return;
    }

    axios
      .post(apiUser, {
        created_at: new Date(),
        username: inputUser.username,
        password: inputUser.password,
      })
      .then((res) => {
        if (res.data.id) {
          setUsers(null);
          setRedirect(true);
          history.goBack();
        } else {
          setRedirect(false);
          setHelperText(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setHelperText(error.messages);
      });

    setInputUser({
      username: "",
      password: "",
    });
    setHelperText("");
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
      {redirect ? <Redirect to="/signin" /> : null}
      <Row>
        <Col span={8} offset={6}>
          <Title>Register</Title>
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
                Register
              </Button>
            </Form.Item>
          </form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
