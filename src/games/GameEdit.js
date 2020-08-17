import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GamesContext } from "./GamesContext";
import { Redirect } from "react-router-dom";

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

const GameEdit = ({ match }) => {
  const [apiGame, games, setGames, inputGame, setInputGame] = useContext(
    GamesContext
  );
  const [game, setGame] = useState({
    id: 0,
    name: "",
    genre: "",
    singlePlayer: true,
    multiplayer: true,
    platform: "",
    release: new Date().getFullYear(),
    image_url: "",
  });
  const [selectedId, setSelectedId] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const gameId = parseInt(match.params.gamesId);

  useEffect(() => {
    console.log(gameId);
    if (game.id === 0) {
      let selectGame = games.find((el) => el.id === gameId);
      setInputGame({
        name: selectGame.name !== null ? selectGame.name : "",
        genre: selectGame.genre !== null ? selectGame.genre : "",
        singlePlayer:
          selectGame.singlePlayer !== null ? selectGame.singlePlayer : 1,
        multiplayer:
          selectGame.multiplayer !== null ? selectGame.multiplayer : 1,
        platform: selectGame.platform !== null ? selectGame.platform : "",
        release:
          selectGame.release !== null
            ? selectGame.release
            : new Date().getFullYear(),
        image_url: selectGame.image_url !== null ? selectGame.image_url : "",
      });
      setSelectedId(gameId);
    }
  }, [game]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      inputGame.name.replace(/\s/g, "") === "" ||
      inputGame.genre.toString().replace(/\s/g, "") !== "" ||
      inputGame.singlePlayer.toString().replace(/\s/g, "") !== "" ||
      inputGame.multiplayer.toString().replace(/\s/g, "") !== "" ||
      inputGame.platform.toString().replace(/\s/g, "") !== "" ||
      inputGame.release.toString().replace(/\s/g, "") !== "" ||
      inputGame.image_url.toString().replace(/\s/g, "") !== ""
    ) {
      axios
        .put(`${apiGame}/${gameId}`, {
          updated_at: new Date(),
          name: inputGame.name,
          genre: inputGame.genre,
          singlePlayer: inputGame.singlePlayer,
          multiplayer: inputGame.multiplayer,
          platform: inputGame.platform,
          release: parseInt(inputGame.release),
          image_url: inputGame.image_url,
        })
        .then((res) => {
          let selectedGame = games.find((el) => el.id === gameId);
          selectedGame.name = inputGame.name;
          selectedGame.genre = inputGame.genre;
          selectedGame.singlePlayer = inputGame.singlePlayer;
          selectedGame.multiplayer = inputGame.multiplayer;
          selectedGame.platform = inputGame.platform;
          selectedGame.release = inputGame.release;
          selectedGame.image_url = inputGame.image_url;
          setGames([...games]);
          setRedirect(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setSelectedId(0);
    setInputGame({
      name: "",
      genre: "",
      singlePlayer: false,
      multiplayer: false,
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
      <Title level={2}>Edit Game</Title>
      <Form {...formLayout}>
        <form onSubmit={handleSubmit}>
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
              Submit
            </Button>
          </Form.Item>
        </form>
      </Form>
    </>
  );
};

export default GameEdit;
