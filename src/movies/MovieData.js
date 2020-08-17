import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { MovieContext } from "./MovieContext";
import { Link } from "react-router-dom";

import { RetweetOutlined } from "@ant-design/icons";
import { Row, Col, Button, Typography, Input } from "antd";
const { Title } = Typography;
const { Search } = Input;

const MovieData = ({ match }) => {
  const [apiMovie, movies, setMovies, setInputMovie] = useContext(MovieContext);
  const [setSelectedId] = useState(0);
  const [sortType, setSortType] = useState(true);

  useEffect(() => {
    if (movies === null) {
      axios.get(apiMovie).then((res) => {
        setMovies(
          res.data.map((el) => {
            return {
              id: el.id,
              created_at: el.created_at,
              updated_at: el.updated_at,
              title: el.title,
              description: el.description,
              year: el.year,
              duration: el.duration,
              genre: el.genre,
              rating: el.rating,
              review: el.review,
              image_url: el.image_url,
            };
          })
        );
      });
    }
  }, [movies]);

  const sortColumn = (field) => {
    setSortType(!sortType);

    const sorted = [...movies].sort(function (a, b) {
      switch (field) {
        case "title":
          if (sortType) {
            return a.title.toUpperCase() > b.title.toUpperCase()
              ? 1
              : b.title.toUpperCase() > a.title.toUpperCase()
              ? -1
              : 0;
          } else {
            return a.title.toUpperCase() < b.title.toUpperCase()
              ? 1
              : b.title.toUpperCase() < a.title.toUpperCase()
              ? -1
              : 0;
          }

        case "description":
          if (sortType) {
            return a.description.toUpperCase() > b.description.toUpperCase()
              ? 1
              : b.description.toUpperCase() > a.description.toUpperCase()
              ? -1
              : 0;
          } else {
            return a.description.toUpperCase() < b.description.toUpperCase()
              ? 1
              : b.description.toUpperCase() < a.description.toUpperCase()
              ? -1
              : 0;
          }

        case "year":
          if (sortType) {
            return a.year > b.year ? 1 : b.year > a.year ? -1 : 0;
          } else {
            return a.year < b.year ? 1 : b.year < a.year ? -1 : 0;
          }

        case "duration":
          if (sortType) {
            return a.duration > b.duration
              ? 1
              : b.duration > a.duration
              ? -1
              : 0;
          } else {
            return a.duration < b.duration
              ? 1
              : b.duration < a.duration
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

        case "rating":
          if (sortType) {
            return a.rating > b.rating ? 1 : b.rating > a.rating ? -1 : 0;
          } else {
            return a.rating < b.rating ? 1 : b.rating < a.rating ? -1 : 0;
          }

        default:
          break;
      }
    });

    setMovies(sorted);
  };

  const Action = ({ movieId }) => {
    const handleDelete = () => {
      let newMovies = movies.filter((el) => el.id !== movieId);

      axios.delete(`${apiMovie}/${movieId}`).then((res) => {
        console.log(res);
      });

      setMovies([...newMovies]);
    };

    const handleEdit = () => {
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
    };

    return (
      <>
        <Button type="link" onClick={handleEdit}>
          <Link to={`/movie/${movieId}/edit`}>Edit</Link>
        </Button>
        <Button type="link" onClick={handleDelete}>
          Delete
        </Button>
      </>
    );
  };

  const handleSearch = (event) => {
    let strSearch = event.target.value;
    axios.get(apiMovie).then((res) => {
      let findMovies = res.data.filter((o) =>
        o.title.toLowerCase().includes(strSearch.toLowerCase())
      );

      setMovies(
        findMovies.map((el) => {
          return {
            id: el.id,
            created_at: el.created_at,
            updated_at: el.updated_at,
            title: el.title,
            description: el.description,
            year: el.year,
            duration: el.duration,
            genre: el.genre,
            rating: el.rating,
            review: el.review,
            image_url: el.image_url,
          };
        })
      );
    });
  };
  return (
    <>
      <Row>
        <Title level={2}>Database Movies </Title>
        <Button type="primary" style={{ marginLeft: "10px" }}>
          <Link to={`/movie/add`}>Add movie</Link>
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
            <th onClick={() => sortColumn("title")}>
              Title
              <RetweetOutlined />
            </th>
            <th onClick={() => sortColumn("year")}>
              Year
              <RetweetOutlined />
            </th>
            <th onClick={() => sortColumn("duration")}>
              Duration
              <RetweetOutlined />
            </th>
            <th onClick={() => sortColumn("genre")}>
              Genre
              <RetweetOutlined />
            </th>
            <th onClick={() => sortColumn("rating")}>
              Rating
              <RetweetOutlined />
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies !== null &&
            movies.map((item, index) => {
              return (
                <tr key={index} style={{ border: "1px solid #000" }}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.year}</td>
                  <td>{parseFloat(item.duration / 60).toFixed(2)} jam</td>
                  <td>{item.genre}</td>
                  <td>{item.rating}</td>
                  <td>
                    <Action movieId={item.id} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default MovieData;
