import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import { GamesContext } from "./GamesContext";

import { Typography, Form, Input, Button, InputNumber, Checkbox } from "antd";
const { Title } = Typography;

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
const tailLayout = {
  wrapperCol: {
    xs: {
      span: 0,
      offset: 3,
    },
    sm: {
      span: 0,
      offset: 3,
    },
  },
};

const GameAdd = () => {
  const [apiGame, games, setGames, inputGame, setInputGame] = useContext(
    GamesContext
  );
  const [redirect] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (apiGame !== null) {
      setInputGame({
        name: "",
        genre: "",
        singlePlayer: true,
        multiplayer: true,
        platform: "",
        release: new Date().getFullYear(),
        image_url: "",
      });
    }
  }, [games]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputGame.name.replace(/\s/g, "") === "") {
      return;
    }

    axios
      .post(apiGame, inputGame)
      .then((res) => {
        console.log(res.data);
        setGames([
          ...games,
          {
            id: res.data.id,
            name: res.data.name,
            genre: res.data.genre,
            singlePlayer: res.data.singlePlayer,
            multiplayer: res.data.multiplayer,
            platform: res.data.platform,
            release: res.data.release,
            image_url: res.data.image_url,
          },
        ]);
        history.goBack();
      })
      .catch((error) => {
        console.log(error);
        history.goBack();
      });

    setInputGame({
      name: "",
      genre: "",
      singlePlayer: true,
      multiplayer: true,
      platform: "",
      release: new Date().getFullYear(),
      image_url: "",
    });
  };

  const handleChange = (event) => {
    let typeOfInput = event.target.name;

    switch (typeOfInput) {
      case "name":
        setInputGame({ ...inputGame, name: event.target.value });
        break;
      case "genre":
        setInputGame({ ...inputGame, genre: event.target.value });
        break;
      case "singlePlayer":
        setInputGame({ ...inputGame, singlePlayer: event.target.checked });
        break;
      case "multiplayer":
        setInputGame({ ...inputGame, multiplayer: event.target.checked });
        break;
      case "platform":
        setInputGame({ ...inputGame, platform: event.target.value });
        break;
      case "release":
        setInputGame({ ...inputGame, release: event.target.value });
        break;
      case "image_url":
        setInputGame({ ...inputGame, image_url: event.target.value });
        break;

      default:
        break;
    }
  };

  return (
    <>
      {redirect ? <Redirect to="/games-list" /> : null}
      <Title level={2}>Add Game</Title>
      <Form {...formLayout}>
        <form onSubmit={handleSubmit} noValidate>
          <Form.Item label="Name" rules={[{ required: true }]}>
            <Input
              name="name"
              id="name"
              label="Name"
              value={inputGame.name}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Genre" rules={[{ required: true }]}>
            <Input
              id="genre"
              label="Genre"
              name="genre"
              value={inputGame.genre}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item valuePropName="checked" {...tailLayout}>
            <Checkbox
              name="singlePlayer"
              id="singlePlayer"
              checked={inputGame.singlePlayer}
              onChange={handleChange}
            >
              Single Player
            </Checkbox>
          </Form.Item>
          <Form.Item valuePropName="checked" {...tailLayout}>
            <Checkbox
              id="multiplayer"
              name="multiplayer"
              checked={inputGame.multiplayer}
              onChange={handleChange}
            >
              Multiplayer
            </Checkbox>
          </Form.Item>
          <Form.Item label="Platform" rules={[{ required: true }]}>
            <Input
              name="platform"
              label="Platform"
              id="platform"
              value={inputGame.platform}
              onChange={handleChange}
            />{" "}
          </Form.Item>
          <Form.Item label="Release">
            <InputNumber
              id="release"
              label="Release"
              name="release"
              value={inputGame.release}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Image URL" rules={[{ required: true }]}>
            <Input
              id="image_url"
              label="Image Url"
              name="image_url"
              value={inputGame.image_url}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </form>
      </Form>
    </>
  );
};

export default GameAdd;
