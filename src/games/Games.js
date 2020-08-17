import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Space, Card, Typography } from "antd";
const { Text } = Typography;

class Games extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      searchNodes: "",
    };
  }

  componentDidMount() {
    this.getGames();
  }

  getGames() {
    axios.get(`https://backendexample.sanbersy.com/api/games`).then((res) => {
      res.data.map((el) => {
        this.setState({
          games: [
            ...this.state.games,
            {
              id: el.id,
              name: el.name,
              genre: el.genre,
              singlePlayer: el.singlePlayer,
              multiplayer: el.multiplayer,
              platform: el.platform,
              release: el.release,
              image_url: el.image_url,
            },
          ],
        });
      });
    });
  }

  render() {
    return (
      <>
        {this.state.games.map((el, index) => {
          return (
            <Space direction="horizontal">
              <Card title={el.name} style={{ width: 450, margin: "0 10px" }}>
                <div align="center">
                  <img
                    src={el.image_url}
                    style={{
                      maxWidth: 400,
                      maxHeight: "300px",
                    }}
                    alt={el.name}
                  />
                </div>
                <br />
                <Text>Genre: {el.genre}</Text>
                <br />
                <Text>Platform: {el.platform}</Text>
                <br />
                <Text type="warning">Release: {el.release}</Text>
                <br />
                <Link to={`/games/${el.id}`}>More</Link>
              </Card>
            </Space>
          );
        })}
      </>
    );
  }
}

export default Games;
