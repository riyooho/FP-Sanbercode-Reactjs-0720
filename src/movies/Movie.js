import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MovieContext } from "./MovieContext";

import { Typography, Row, Col } from "antd";
const { Text, Title, Paragraph } = Typography;

const Movie = ({ match }) => {
  const [apiMovie] = useContext(MovieContext);
  const [movie, setMovie] = useState({
    id: 0,
    title: "",
    description: "",
    review: "",
    year: new Date().getFullYear(),
    duration: 0,
    genre: "",
    rating: 0,
    image_url: "",
  });
  const movieId = parseInt(match.params.moviesId);

  useEffect(() => {
    if (movie.id === 0) {
      axios.get(`${apiMovie}/${movieId}`).then((res) => {
        console.log(res.data);
        setMovie({
          id: res.data.id,
          created_at: res.data.created_at,
          updated_at: res.data.updated_at,
          title: res.data.title,
          description: res.data.description,
          review: res.data.review,
          year: res.data.year,
          duration: res.data.duration,
          genre: res.data.genre,
          rating: res.data.rating,
          image_url: res.data.image_url,
        });
      });
    }
  }, [movie]);

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
            src={movie.image_url}
            style={{
              maxHeight: "500px",
              maxWidth: "300px",
            }}
            alt={movie.title}
          />
        </span>
      </Col>
      <Col span={16}>
        <Title>{movie.title}</Title>
        <Title level={4}>{movie.rating}/10</Title>
        <Title level={4}>{movie.genre}</Title>
        <Title level={4}>{movie.year}</Title>
        <Text strong>Duration : {movie.duration} Minutes</Text>
        <br />
        <Text strong>Description :</Text>
        <br />
        <Paragraph>{movie.description}</Paragraph>
        <Text strong>Review</Text>
        <br />
        <Paragraph>{movie.review}</Paragraph>
      </Col>
    </Row>
  );
};

export default Movie;
