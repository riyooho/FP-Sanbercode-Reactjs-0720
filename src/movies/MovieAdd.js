import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import { MovieContext } from "./MovieContext";

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

const MovieAdd = () => {
  const [apiMovie, movies, setMovies, inputMovie, setInputMovie] = useContext(
    MovieContext
  );
  const [redirect] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (apiMovie !== null) {
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
    }
  }, [movies]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputMovie.title.replace(/\s/g, "") === "") {
      return;
    }

    axios
      .post(apiMovie, inputMovie)
      .then((res) => {
        console.log(res.data);
        setMovies([
          ...movies,
          {
            id: res.data.id,
            title: res.data.title,
            description: res.data.description,
            year: res.data.year,
            duration: res.data.duration,
            genre: res.data.genre,
            rating: res.data.rating,
            review: res.data.review,
            image_url: res.data.image_url,
          },
        ]);
        history.goBack();
      })
      .catch((error) => {
        console.log(error);
        history.goBack();
      });

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
      <Title level={2}>Add Movie</Title>
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

export default MovieAdd;
