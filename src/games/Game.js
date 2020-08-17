import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GamesContext } from "./GamesContext";

import { Typography, Row, Col } from "antd";
const { Title } = Typography;

const Game = ({ match }) => {
  const [apiGame] = useContext(GamesContext);
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
  const gameId = parseInt(match.params.gamesId);

  useEffect(() => {
    if (game.id === 0) {
      axios.get(`${apiGame}/${gameId}`).then((res) => {
        console.log(res.data);
        setGame({
          id: res.data.id,
          name: res.data.name,
          genre: res.data.genre,
          singlePlayer: res.data.singlePlayer,
          multiplayer: res.data.multiplayer,
          platform: res.data.platform,
          release: res.data.release,
          image_url: res.data.image_url,
        });
      });
    }
  }, [game]);

  return (
    <Row
      style={{
        backgroundColor: "#fff",
        border: "1px solid #aaa",
        borderRadius: "20px",
        padding: "20px",
      }}
    >
      <Col span={8}>
        <span align="center">
          <img
            src={game.image_url}
            style={{
              maxHeight: "500px",
              maxWidth: "300px",
            }}
            alt={game.name}
          />
        </span>
      </Col>
      <Col span={16}>
        <Title>{game.name}</Title>
        <Title level={4}>{game.genre}</Title>
        {game.singlePlayer === 1 ? (
          <Title level={4}>Single Player</Title>
        ) : null}
        {game.multiplayer === 1 ? <Title level={4}>Multi Player</Title> : null}
        <Title level={4}>{game.platform}</Title>
        <Title level={4}>{game.release}</Title>
      </Col>
    </Row>
  );
};

export default Game;
