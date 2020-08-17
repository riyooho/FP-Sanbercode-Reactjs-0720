import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MovieContext } from "./MovieContext";
import { Redirect } from "react-router-dom";

import { Typography, Form, Input, Button, InputNumber } from "antd";
const { Title } = Typography;
const { TextArea } = Input;

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

const MovieEdit = ({ match }) => {
  const [apiMovie, movies, setMovies, inputMovie, setInputMovie] = useContext(
    MovieContext
  );
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    year: new Date().getFullYear(),
    duration: 0,
    genre: "",
    rating: 0,
    review: "",
    image_url: "",
  });
  const [selectedId, setSelectedId] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const movieId = parseInt(match.params.moviesId);

  useEffect(() => {
    console.log(movieId);
    if (movie.id === 0) {
      let selectMovie = movies.find((el) => el.id === movieId);
      console.log(movieId);
      setInputMovie({
        title: selectMovie.title !== null ? selectMovie.title : "",
        description:
          selectMovie.description !== null ? selectMovie.description : "",
        year:
          selectMovie.year !== null
            ? selectMovie.year
            : new Date().getFullYear(),
        duration: selectMovie.duration !== null ? selectMovie.duration : 120,
        genre: selectMovie.genre !== null ? selectMovie.genre : "",
        rating: selectMovie.rating !== null ? selectMovie.rating : 0,
        review: selectMovie.review !== null ? selectMovie.review : "",
        image_url: selectMovie.image_url !== null ? selectMovie.image_url : "",
      });
      setSelectedId(movieId);
    }
  }, [movie]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      inputMovie.title.replace(/\s/g, "") === "" ||
      inputMovie.description.toString().replace(/\s/g, "") !== "" ||
      inputMovie.year.toString().replace(/\s/g, "") !== "" ||
      inputMovie.duration.toString().replace(/\s/g, "") !== "" ||
      inputMovie.genre.toString().replace(/\s/g, "") !== "" ||
      inputMovie.rating.toString().replace(/\s/g, "") !== "" ||
      inputMovie.review.toString().replace(/\s/g, "") !== "" ||
      inputMovie.image_url.toString().replace(/\s/g, "") !== ""
    ) {
      axios
        .put(`${apiMovie}/${movieId}`, {
          updated_at: new Date(),
          title: inputMovie.title,
          description: inputMovie.description,
          year: parseInt(inputMovie.year),
          duration: parseInt(inputMovie.duration),
          genre: inputMovie.genre,
          rating: parseInt(inputMovie.rating),
          review: inputMovie.review,
          image_url: inputMovie.image_url,
        })
        .then((res) => {
          let selectedMovie = movies.find((el) => el.id === movieId);
          selectedMovie.title = inputMovie.title;
          selectedMovie.description = inputMovie.description;
          selectedMovie.year = inputMovie.year;
          selectedMovie.duration = inputMovie.duration;
          selectedMovie.genre = inputMovie.genre;
          selectedMovie.rating = inputMovie.rating;
          selectedMovie.review = inputMovie.review;
          selectedMovie.image_url = inputMovie.image_url;
          setMovies([...movies]);
          setRedirect(true);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setSelectedId(0);
    setInputMovie({
      title: "",
      description: "",
      year: new Date().getFullYear(),
      duration: 0,
      genre: "",
      rating: 0,
      review: "",
      image_url: "",
    });
  };

  const handleChange = (event) => {
    let typeOfInput = event.target.name;

    switch (typeOfInput) {
      case "title":
        setInputMovie({ ...inputMovie, title: event.target.value });
        break;
      case "description":
        setInputMovie({ ...inputMovie, description: event.target.value });
        break;
      case "year":
        setInputMovie({ ...inputMovie, year: event.target.value });
        break;
      case "duration":
        setInputMovie({ ...inputMovie, duration: event.target.value });
        break;
      case "genre":
        setInputMovie({ ...inputMovie, genre: event.target.value });
        break;
      case "rating":
        setInputMovie({ ...inputMovie, rating: event.target.value });
        break;
      case "review":
        setInputMovie({ ...inputMovie, review: event.target.value });
        break;
      case "image_url":
        setInputMovie({ ...inputMovie, image_url: event.target.value });
        break;

      default:
        break;
    }
  };

  return (
    <>
      {redirect ? <Redirect to="/movies-list" /> : null}
      <Title level={2}>Edit Movie</Title>
      <Form {...formLayout}>
        <form onSubmit={handleSubmit}>
          <Form.Item label="Title" rules={[{ required: true }]}>
            <Input
              name="title"
              id="title"
              label="Title"
              autoFocus
              value={inputMovie.title}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Year" rules={[{ required: true }]}>
            <InputNumber
              id="year"
              label="Year"
              type="number"
              name="year"
              value={inputMovie.year}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Duration" rules={[{ required: true }]}>
            <InputNumber
              name="duration"
              type="number"
              label="Duration"
              id="duration"
              value={inputMovie.duration}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Genre" rules={[{ required: true }]}>
            <Input
              id="genre"
              label="Genre"
              name="genre"
              value={inputMovie.genre}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Rating" rules={[{ required: true }]}>
            <InputNumber
              name="rating"
              type="number"
              label="Rating"
              id="rating"
              value={inputMovie.rating}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Description" rules={[{ required: true }]}>
            <TextArea
              variant="outlined"
              fullWidth
              id="description"
              label="Description"
              name="description"
              value={inputMovie.description}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Review" rules={[{ required: true }]}>
            <TextArea
              id="review"
              label="Review"
              name="review"
              value={inputMovie.review}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Image URL" rules={[{ required: true }]}>
            <Input
              id="image_url"
              label="Image"
              name="image_url"
              value={inputMovie.image_url}
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

export default MovieEdit;
