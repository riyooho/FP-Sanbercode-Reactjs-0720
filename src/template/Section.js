import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../users/UserContext";
import { MovieProvider } from "../movies/MovieContext";
import { GamesProvider } from "../games/GamesContext";
import Login from "../users/Login";
import Register from "../users/Register";
import ChangePassword from "../users/ChangePassword";
import Games from "../games/Games";
import GameEdit from "../games/GameEdit";
import GameAdd from "../games/GameAdd";
import GameData from "../games/GameData";
import Game from "../games/Game";
import Movies from "../movies/Movies";
import MovieData from "../movies/MovieData";
import MovieAdd from "../movies/MovieAdd";
import MovieEdit from "../movies/MovieEdit";
import Movie from "../movies/Movie";

import { Layout } from "antd";
const { Content } = Layout;

const Section = ({ path }) => {
  const [, users, , ,] = useContext(UserContext);

  const PrivateRoute = ({ component: Component, users, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          users ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: `${path.path}login`,
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  };

  return (
    <>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          bottom: 0,
        }}
      >
        <GamesProvider>
          <PrivateRoute
            exact
            users={users}
            path={`${path.path}games-list`}
            component={GameData}
          />
          <Route
            exact
            path={`${path.path}games/:gamesId`}
            component={Game}
            users={users}
          />
          <PrivateRoute
            path={`${path.path}game/:gamesId/edit`}
            component={GameEdit}
            users={users}
          />
          <PrivateRoute
            path={`${path.path}game/add`}
            component={GameAdd}
            users={users}
          />
        </GamesProvider>

        <MovieProvider>
          <PrivateRoute
            users={users}
            path={`${path.path}movies-list`}
            component={MovieData}
          />
          <PrivateRoute
            users={users}
            path={`${path.path}movie/add`}
            component={MovieAdd}
          />
          <Route
            exact
            path={`${path.path}movies/:moviesId`}
            component={Movie}
            users={users}
          />
          <PrivateRoute
            users={users}
            path={`${path.path}movie/:moviesId/edit`}
            component={MovieEdit}
          />
        </MovieProvider>

        <Route
          exact
          path={`${path.path}games`}
          component={Games}
          users={users}
        />
        <Route
          exact
          path={`${path.path}movies`}
          component={Movies}
          users={users}
        />
        <Route path={`${path.path}login`} component={Login} users={users} />
        <Route
          path={`${path.path}register`}
          component={Register}
          users={users}
        />
        <PrivateRoute
          users={users}
          exact
          path={`${path.path}change-password`}
          component={ChangePassword}
        />

        <Route exact path={`${path.path}`} component={Movies} users={users} />
      </Content>
    </>
  );
};

export default Section;
