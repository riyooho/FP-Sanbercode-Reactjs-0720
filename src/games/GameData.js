import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { GamesContext } from "./GamesContext";
import { Link } from "react-router-dom";

import { RetweetOutlined } from "@ant-design/icons";
import { Row, Col, Button, Typography, Input } from "antd";
const { Title } = Typography;
const { Search } = Input;

const GameData = () => {
  const [apiGame, games, setGames, setInputGame] = useContext(GamesContext);

  const [setSelectedId] = useState(0);
  const [sortType, setSortType] = useState(true); // true : asc , false : desc

  useEffect(() => {
    if (games === null) {
      axios.get(apiGame).then((res) => {
        setGames(
          res.data.map((el) => {
            return {
              id: el.id,
              created_at: el.created_at,
              updated_at: el.updated_at,
              name: el.name,
              genre: el.genre,
              singlePlayer: el.singlePlayer,
              multiplayer: el.multiplayer,
              platform: el.platform,
              release: el.release,
              image_url: el.image_url,
            };
          })
        );
      });
    }
  }, [games]);

  const sortColumn = (field) => {
    setSortType(!sortType);

    const sorted = [...games].sort(function (a, b) {
      switch (field) {
        case "name":
          if (sortType) {
            return a.name.toUpperCase() > b.name.toUpperCase()
              ? 1
              : b.name.toUpperCase() > a.name.toUpperCase()
              ? -1
              : 0;
          } else {
            return a.name.toUpperCase() < b.name.toUpperCase()
              ? 1
              : b.name.toUpperCase() < a.name.toUpperCase()
              ? -1
              : 0;
          }

        case "genre":
          if (sortType) {
            return a.genre.toUpperCase() > b.genre.toUpperCase()
              ? 1
              : b.genre.toUpperCase() > a.genre.toUpperCase()
              ? -1
              : 0;
          } else {
            return a.genre.toUpperCase() < b.genre.toUpperCase()
              ? 1
              : b.genre.toUpperCase() < a.genre.toUpperCase()
              ? -1
              : 0;
          }

        case "singlePlayer":
          if (sortType) {
            return a.singlePlayer > b.singlePlayer
              ? 1
              : b.singlePlayer > a.singlePlayer
              ? -1
              : 0;
          } else {
            return a.singlePlayer < b.singlePlayer
              ? 1
              : b.singlePlayer < a.singlePlayer
              ? -1
              : 0;
          }

        case "multiplayer":
          if (sortType) {
            return a.multiplayer > b.multiplayer
              ? 1
              : b.multiplayer > a.multiplayer
              ? -1
              : 0;
          } else {
            return a.multiplayer < b.multiplayer
              ? 1
              : b.multiplayer < a.multiplayer
              ? -1
              : 0;
          }

        case "platform":
          if (sortType) {
            return a.platform.toUpperCase() > b.platform.toUpperCase()
              ? 1
              : b.platform.toUpperCase() > a.platform.toUpperCase()
              ? -1
              : 0;
          } else {
            return a.platform.toUpperCase() < b.platform.toUpperCase()
              ? 1
              : b.platform.toUpperCase() < a.platform.toUpperCase()
              ? -1
              : 0;
          }

        case "release":
          if (sortType) {
            return a.release.toUpperCase() > b.release.toUpperCase()
              ? 1
              : b.release.toUpperCase() > a.release.toUpperCase()
              ? -1
              : 0;
          } else {
            return a.release.toUpperCase() < b.release.toUpperCase()
              ? 1
              : b.release.toUpperCase() < a.release.toUpperCase()
              ? -1
              : 0;
          }

        default:
          break;
      }
    });

    setGames(sorted);
  };

  const Action = ({ gameId }) => {
    const handleDelete = () => {
      let newGames = games.filter((el) => el.id !== gameId);

      axios.delete(`${apiGame}/${gameId}`).then((res) => {
        console.log(res);
      });

      setGames([...newGames]);
    };

    const handleEdit = () => {
      let selectGame = games.find((el) => el.id === gameId);
      console.log(gameId);
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
    };

    return (
      <>
        <Button type="link" onClick={handleEdit}>
          <Link to={`/game/${gameId}/edit`}>Edit</Link>
        </Button>
        <Button type="link" onClick={handleDelete}>
          Delete
        </Button>
      </>
    );
  };

  const handleSearch = (event) => {
    let strSearch = event.target.value;

    axios.get(apiGame).then((res) => {
      let findGames = res.data.filter((o) =>
        o.name.toLowerCase().includes(strSearch.toLowerCase())
      );

      setGames(
        findGames.map((el) => {
          return {
            id: el.id,
            created_at: el.created_at,
            updated_at: el.updated_at,
            name: el.name,
            genre: el.genre,
            singlePlayer: el.singlePlayer,
            multiplayer: el.multiplayer,
            platform: el.platform,
            release: el.release,
            image_url: el.image_url,
          };
        })
      );
    });
  };

  return (
    <>
      <Row>
        <Title level={2}>Database Games </Title>
        <Button type="primary" style={{ marginLeft: "10px" }}>
          <Link to={`/game/add`}>Add game</Link>
        </Button>
      </Row>
      <br />
      <Row>
        <Col span={24}>
          <Search
            id="search"
            label="Search"
            name="search"
            onChange={handleSearch}
          />
        </Col>
      </Row>
      <table
        style={{
          border: "1px solid #000",
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "center",
        }}
      >
        <thead>
          <tr style={{ border: "1px solid #000" }}>
            <th>No</th>
            <th onClick={() => sortColumn("name")}>
              Name
              <RetweetOutlined />
            </th>
            <th onClick={() => sortColumn("genre")}>
              Genre
              <RetweetOutlined />
            </th>
            <th onClick={() => sortColumn("singlePlayer")}>
              Single Player
              <RetweetOutlined />
            </th>
            <th onClick={() => sortColumn("multiplayer")}>
              Multi Player
              <RetweetOutlined />
            </th>
            <th onClick={() => sortColumn("platform")}>
              Platform
              <RetweetOutlined />
            </th>
            <th onClick={() => sortColumn("release")}>
              Release
              <RetweetOutlined />
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {games !== null &&
            games.map((item, index) => {
              return (
                <tr key={index} style={{ border: "1px solid #000" }}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.genre}</td>
                  <td>{item.singlePlayer === 1 ? "1" : 0}</td>
                  <td>{item.multiplayer === 1 ? "1" : 0}</td>
                  <td>{item.platform}</td>
                  <td>{item.release}</td>
                  <td>
                    <Action gameId={item.id} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default GameData;
