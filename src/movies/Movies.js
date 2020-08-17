import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Space, Card, Typography } from "antd";
const { Text } = Typography;

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchNodes: "",
    };
  }

  componentDidMount() {
    this.getMovie();
  }

  getMovie() {
    axios.get(`https://backendexample.sanbersy.com/api/movies`).then((res) => {
      res.data.map((el) => {
        this.setState({
          movies: [
            ...this.state.movies,
            {
              id: el.id,
              title: el.title,
              description: el.description,
              year: el.year,
              duration: el.duration,
              genre: el.genre,
              rating: el.rating,
              review: el.review,
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
        {this.state.movies.map((el, index) => {
          return (
            <>
              <Space direction="horizontal">
                <Card title={el.title} style={{ width: 450, margin: "0 10px" }}>
                  <div align="center">
                    <img
                      src={el.image_url}
                      style={{
                        maxWidth: 400,
                        maxHeight: "300px",
                      }}
                      alt={el.title}
                    />
                  </div>
                  <br />
                  <Text>Genre: {el.genre}</Text>
                  <br />
                  <Text>Year: {el.year}</Text>
                  <br />
                  <Text type="warning">Rating: {el.rating}</Text>
                  <br />
                  <Link to={`/movies/${el.id}`}>More</Link>
                </Card>
              </Space>
            </>
          );
        })}
      </>
    );
  }
}

export default Movies;
